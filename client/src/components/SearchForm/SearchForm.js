import React from "react";
import "./SearchForm.css";

// Using the datalist element we can create autofill suggestions based on the props.groups array
const SearchForm = props =>
  <form className="search">
    <div className="form-group">
      <label htmlFor="group">Group Name:</label>
      <input
        value={props.search}
        onChange={props.handleInputChange}
        name="group"
        list="groups"
        type="text"
        className="form-control"
        placeholder="Type in a class group to begin"
        id="group"
      />
      <datalist id="groups">
        sourceCategory: "Core-Classes",
        {props.groups.map(group => <option value={group.name} key={group.name} data-fullLink={group.fullLink} data-reference={group.reference}/>)}
      </datalist>
      <button
        type="submit"
        onClick={props.handleFormSubmit}
        className="btn btn-success"
      >
        Search
      </button>
    </div>
  </form>;

export default SearchForm;
