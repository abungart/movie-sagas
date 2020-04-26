import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class MovieItem extends Component {
  // Call to item details page
  itemDetails = () => {
    console.log(this.props.movieItem);
    this.props.dispatch({
      type: "SET_MOVIE_DATA",
      payload: this.props.movieItem,
    });

    this.props.dispatch({
      type: "GET_GENRES",
      payload: this.props.movieItem,
    });

    this.props.history.push("/data");
  };

  render() {
    return (
      <div onClick={this.itemDetails}>
        <span>
          <img
            src={this.props.movieItem.poster}
            alt={this.props.movieItem.title}
          />
          <h2>{this.props.movieItem.title}</h2>
          <p>{this.props.movieItem.description}</p>
        </span>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(MovieItem));
