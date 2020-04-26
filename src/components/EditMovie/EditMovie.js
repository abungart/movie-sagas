import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class EditMovie extends Component {
  state = {
    name: "",
    description: "",
  };

  //Text Input Handlers
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  // Button Handlers
  handleGoBack = () => {
    this.props.history.goBack();
  };

  handleEditSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <h1>Edit Movie</h1>
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          onChange={this.handleNameChange}
        />
        <label>Description</label>
        <input
          type="text"
          placeholder="Description"
          onChange={this.handleDescriptionChange}
        />
        <button onClick={this.handleEditSubmit}>Submit Changes</button>
        <button onClick={this.handleGoBack}>Cancel</button>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(EditMovie));
