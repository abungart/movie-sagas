import React, { Component } from "react";
import { connect } from "react-redux";

class MovieData extends Component {
  // click handlers
  homeClick = () => {
    this.props.dispatch({ type: "GET_MOVIES" });
    this.props.history.push("/");
  };

  editClick = () => {
    console.log("In Edit Button");
    this.props.history.push("/edit");
  };

  deleteClick = () => {
    console.log("In Delete Button");
    this.props.dispatch({
      type: "DELETE_MOVIE",
      payload: `/movie/${this.props.reduxState.movieDataReducer.id}`,
    });
    this.props.history.push("/");
  };

  render() {
    const movieItemData = this.props.reduxState.movieDataReducer;
    return (
      <div>
        <header>
          <h1>Movie Data</h1>
        </header>
        <button onClick={this.homeClick}>Return To All Movies</button>
        <span>
          <img src={movieItemData.poster} alt={movieItemData.title} />
          <h2>{movieItemData.title}</h2>
          <p>{movieItemData.description}</p>
          <ul>
            {this.props.reduxState.genresReducer.map((genreItem) => {
              return <li key={genreItem.genres_id}>{genreItem.name}</li>;
            })}
          </ul>
        </span>
        <button onClick={this.editClick}>Edit Movie</button>
        <button onClick={this.deleteClick}>Delete Movie</button>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(MovieData);
