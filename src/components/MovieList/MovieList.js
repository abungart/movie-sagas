import React, { Component } from "react";
import { connect } from "react-redux";
import MovieItem from "../MovieItem/MovieItem";

class MovieList extends Component {
  componentDidMount() {
    console.log("Component Mounted!");
    this.props.dispatch({ type: "GET_MOVIES" });
  }

  render() {
    console.log(this.props.reduxState.moviesReducer);
    return (
      <div>
        <header className="header">
          <h1>Movie Saga List</h1>
        </header>
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