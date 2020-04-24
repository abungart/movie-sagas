import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// COMPONENTS
import MovieList from "../MovieList/MovieList";
import MovieData from "../MovieData/MovieData";

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <div className="App">
          <div className="routes_container">
            <Route exact path="/" component={MovieList} />
            <Route exact path="/data" component={MovieData} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
