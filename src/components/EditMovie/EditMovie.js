import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./EditMovie.css";
import Button from "@material-ui/core/Button";

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
  handleGoBack = (event) => {
    event.preventDefault();
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
    const movieItemData = this.props.reduxState.movieDataReducer;
    return (
      <div>
        <div className="top_elements">
          <h1>Edit Movie</h1>
          <form onSubmit={this.handleEditSubmit}>
            <label>Title: </label>
            <input
              type="text"
              placeholder="Title"
              onChange={this.handleNameChange}
            />
            <label>Description: </label>
            <textarea
              type="text"
              placeholder="Description"
              onChange={this.handleDescriptionChange}
            />
            <Button variant="outlined" color="primary" type="submit">
              Submit Changes
            </Button>
            <span> </span>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.handleGoBack}
            >
              Cancel
            </Button>
          </form>
        </div>
        <span>
          <h3>{movieItemData.title}</h3>
          <img src={movieItemData.poster} alt={movieItemData.title} />
          <p>{movieItemData.description}</p>
        </span>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(EditMovie));
