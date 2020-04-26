import React, { Component } from "react";
import { connect } from "react-redux";
import MovieItem from "../MovieItem/MovieItem";

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
    console.log(this.props.reduxState.moviesReducer);
    return (
      <div>
        <header className="header">
          <h1>Movie Saga List</h1>
        </header>
        <form onSubmit={this.handleMovieSubmit}>
          <h3>Add New Movie</h3>
          <label>Title</label>
          <input
            type="text"
            placeholder="Movie Title"
            onChange={this.handleNameChange}
          />
          <label>Movie Poster</label>
          <input
            type="text"
            placeholder="Movie Poster"
            onChange={this.handlePosterChange}
          />
          <label>Movie Description</label>
          <input
            type="text"
            placeholder="Movie Description"
            onChange={this.handleDescriptionChange}
          />
          <button type="submit">Submit New Movie</button>
        </form>
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
