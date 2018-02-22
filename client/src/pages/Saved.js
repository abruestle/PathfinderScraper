import React, { Component } from "react";
import API from "../utils/API";
import Card from "../components/Card";
import Alert from "../components/Alert";

class Saved extends Component {
  state = {
    results: [],
    class: [],
    notes: [],
    error: "",
    title: "",
    description: ""
  };

  // When the component mounts, load the next dog to be displayed
  componentDidMount() {
    this.setState(results = this.getAllClasses());
  }

  loadClasses = () => {
    API.getAllClasses()
      .then(res =>
        this.setState({
          results: res.data
        })
      )
      .catch(err => console.log(err));
  };
  loadNotes = () => {
    API.getAllClasses()
      .then(res =>
        this.setState({
          results: res.data
        })
      )
      .catch(err => console.log(err));
  };
  
  loadNotes = event => {
    API.getNotes(event.target.value)
      .then(res =>
        this.setState({
          image: res.data.message
        })
      )
      .catch(err => console.log(err));
  };

  addNote = event => {
    API.submitNote(event.target.value)
      .then(res =>
        this.setState({
          image: res.data.message
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container style={{ minHeight: "80%" }}>
        <Alert
          type="danger"
          style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
        >
          {this.state.error}
        </Alert>
        <Classes results={this.state.results} />
        {this.state.results.map(result =>
          <ClassPanel name={result.name} link={result.link} category={result.category} description={result.description} actiontype="Delete" action={this.handleClassDelete} actionNotes={this.loadNotes}/>
        )}
      </Container>
    );
  }
}

export default Saved;
