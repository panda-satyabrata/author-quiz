import React from "react";
import "./bootstrap.min.css";
import "./AddAuthorForm.css";
import AuthorForm from "./components/AuthorForm";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function mapDispatchToProps(dispatch, props) {
  return {
    onAddAuthor: (author) => {
      dispatch({ type: "ADD_AUTHOR", author });
      props.history.push("/");
    },
  };
}

function AddAuthorForm({ onAddAuthor }) {
  return (
    <div className="AddAuthorForm">
      <h1>Add Author</h1>
      <AuthorForm onAddAuthor={onAddAuthor} />
    </div>
  );
}

export default withRouter(connect(() => {}, mapDispatchToProps)(AddAuthorForm));
