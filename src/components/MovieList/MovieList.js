import React, { Component } from "react";
import { connect } from "react-redux";

class MovieList extends Component {
  componentDidMount() {
    console.log("Component Mounted!");
  }

  render() {
    return <div>The List Begins Here!</div>;
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(MovieList);
