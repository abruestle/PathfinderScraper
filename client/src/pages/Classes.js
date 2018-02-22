import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";
// import SearchResults from "../components/SearchResults";
import Alert from "../components/Alert";
import ClassPanel from "../components/ClassPanel";

class Classes extends Component {
  state = {
    search: "",
    groups: [
      {
        name: "Core-Classes",
        fullLink: "http://www.d20pfsrd.com/classes/core-classes/",
        reference: "ul.ogn-childpages li"
      },
      {
        name: "Base-Classes",
        fullLink: "https://www.d20pfsrd.com/classes/base-classes/",
        reference: "ul.ogn-childpages li"
      }
    ],
    results: [],
    error: ""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    this.setState({
      search: "Core-Classes"
    });
    var selected = this.state.groups.filter(function( group ) {
      return group.name === this.state.search;
    });
    this.getClasses(selected);
  }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleClassSave = event => {
    event.preventDefault();
    API.postClass(event.target.value)
    .then(res => {
      if (res.data.status === "error") {
        throw new Error(res.data.message);
      }
      this.setState({ error: "" });
    })
    .catch(err => this.setState({ error: err.message }));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    var selected = this.state.groups.filter(function( group ) {
      return group.name === this.state.search;
    });
    this.getClasses(selected.name, selected.fullLink, selected.reference);
  };

  getClasses = (name, fullLink, reference) => {
    API.scrapeClasses(name, fullLink, reference)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  }

  render() {
    return (
      <Container style={{ minHeight: "80%" }}>
        <h1 className="text-center">Search By Category!</h1>
        <Alert
          type="danger"
          style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
        >
          {this.state.error}
        </Alert>
        <SearchForm
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          groups={this.state.groups}
        />
        <Classes results={this.state.results} />
        {this.state.results.map(result =>
          <ClassPanel name={result.name} link={result.link} category={result.category} description={result.description} actiontype="Save" action={this.handleClassSave} actionNotes={this.loadNotes}/>
        )}
      </Container>
    );
  }
}

export default Classes;
