import React, { Component } from "react";
import "./App.css";
import MovieList from "../MovieList/MovieList";

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>Movie Saga List</h1>
        </header>
        <MovieList />
      </div>
    );
  }
}

export default App;
