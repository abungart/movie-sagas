import React, { Component } from "react";
import { connect } from "react-redux";

class MovieData extends Component {
  render() {
    const movieItemData = this.props.reduxState.moviesReducer;

    return (
      <div>
        <header>
          <h1>Movie Data</h1>
        </header>
        <span>
          <img src={movieItemData.poster} alt={movieItemData.title} />
          <h2>{movieItemData.title}</h2>
          <p>{movieItemData.description}</p>
        </span>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(MovieData);
