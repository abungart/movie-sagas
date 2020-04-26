import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class EditMovie extends Component {
  state = {
    title: "",
    description: "",
    id: `${this.props.reduxState.movieDataReducer.id}`,
    poster: `${this.props.reduxState.movieDataReducer.poster}`,
  };

  //Text Input Handlers
  handleNameChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  // Button Handlers
  handleGoBack = () => {
    this.props.history.goBack();
  };

  handleEditSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.dispatch({ type: "EDIT_MOVIE", payload: this.state });
    this.setState({
      title: "",
      description: "",
    });
    this.props.dispatch({
      type: "SET_MOVIE_DATA",
      payload: this.state,
    });
    this.props.history.push("/data");
  };

  render() {
    return (
      <div>
        <h1>Edit Movie</h1>
        <label>Title</label>
        <form onSubmit={this.handleEditSubmit}>
          <input
            type="text"
            placeholder="Title"
            onChange={this.handleNameChange}
          />
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            onChange={this.handleDescriptionChange}
          />
          <button type="submit">Submit Changes</button>
        </form>
        <button onClick={this.handleGoBack}>Cancel</button>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(EditMovie));
