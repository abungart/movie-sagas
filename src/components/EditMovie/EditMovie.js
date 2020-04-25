import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class EditMovie extends Component {
  handleGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <h1>Edit Movie</h1>
        <button>Submit Changes</button>
        <button onClick={this.handleGoBack}>Cancel</button>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(EditMovie));
