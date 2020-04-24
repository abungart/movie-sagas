import React, { Component } from "react";
import { connect } from "react-redux";

class MovieItem extends Component {
  render() {
    return <li>{this.props.movieItem.title}</li>;
  }
}

export default connect()(MovieItem);
