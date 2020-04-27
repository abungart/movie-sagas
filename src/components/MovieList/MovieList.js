import React, { Component } from "react";
import { connect } from "react-redux";
import MovieItem from "../MovieItem/MovieItem";
import Button from "@material-ui/core/Button";

import "./MovieList.css";

class MovieList extends Component {
  state = {
    title: "",
    poster: "",
    description: "",
  };

  componentDidMount() {
    console.log("Component Mounted!");
    this.props.dispatch({ type: "GET_MOVIES" });
  }

  //Text Input Handlers
  handleNameChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handlePosterChange = (event) => {
    this.setState({
      poster: event.target.value,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  // Button Handlers
  handleMovieSubmit = (event) => {
    event.preventDefault();
    console.log("In movie submit");
    this.props.dispatch({ type: "POST_MOVIE", payload: this.state });
    this.setState({
      title: "",
      poster: "",
      description: "",
    });
  };

  render() {
    return (
      <div>
        <div className="top_content">
          <header className="header">
            <h1>Movie Saga List</h1>
          </header>
          <h3>Add New Movie</h3>
          <form onSubmit={this.handleMovieSubmit}>
            <label className="input_form">Title</label>
            <input
              type="text"
              placeholder="Movie Title"
              className="input_form"
              onChange={this.handleNameChange}
            />
            <label className="input_form">Movie Poster</label>
            <input
              type="text"
              placeholder="Movie Poster"
              className="input_form"
              onChange={this.handlePosterChange}
            />
            <label className="input_form">Movie Description</label>
            <textarea
              placeholder="Movie Description"
              className="input_form"
              onChange={this.handleDescriptionChange}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className="input_form"
            >
              Submit New Movie
            </Button>
          </form>
        </div>
        <h2>The List Begins Here!</h2>
        <div>
          {this.props.reduxState.moviesReducer.map((movieItem) => {
            return <MovieItem key={movieItem.id} movieItem={movieItem} />;
          })}
        </div>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(MovieList);
