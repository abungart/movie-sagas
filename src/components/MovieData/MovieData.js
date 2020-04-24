import React, { Component } from "react";
import { connect } from "react-redux";

class MovieData extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Movie Data</h1>
        </header>
      </div>
    );
  }
}

export default connect()(MovieData);
