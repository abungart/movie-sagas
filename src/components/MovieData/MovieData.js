import React, { Component } from "react";
import { connect } from "react-redux";
import "./MovieData.css";
import Button from "@material-ui/core/Button";

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
          <Button variant="contained" color="primary" onClick={this.homeClick}>
            Return To All Movies
          </Button>
        </header>
        <h1>{movieItemData.title}</h1>
        <span>
          <img src={movieItemData.poster} alt={movieItemData.title} />
          <p>{movieItemData.description}</p>
          <div className="genre_box">
            <h4 className="genres">Genres</h4>
            <ul>
              {this.props.reduxState.genresReducer.map((genreItem) => {
                return <li key={genreItem.genres_id}>{genreItem.name}</li>;
              })}
            </ul>
          </div>
        </span>
        <div className="bottom_buttons">
          <Button variant="outlined" color="primary" onClick={this.editClick}>
            Edit Movie
          </Button>
          <span> </span>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.deleteClick}
          >
            Delete Movie
          </Button>
        </div>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(MovieData);
