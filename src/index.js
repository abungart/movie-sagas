import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import App from "./components/App/App.js";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("GET_MOVIES", getMovies);
  yield takeEvery("GET_GENRES", getGenres);
  yield takeEvery("POST_MOVIE", postMovie);
  yield takeEvery("DELETE_MOVIE", deleteMovie);
  yield takeEvery("EDIT_MOVIE", editMovie);
}

// SAGA FUNCTIONS
function* getMovies(action) {
  try {
    const response = yield axios.get("/movie");
    yield put({ type: "SET_MOVIES", payload: response.data });
  } catch (err) {
    console.warn("Error with getMovies:", err);
  }
}

function* getGenres(action) {
  try {
    const thisMovie = action.payload;
    // Set get parameters
    const queryText = `/movie/genre/${thisMovie.id}`;
    console.log("payload:", queryText);
    const response = yield axios.get(queryText);
    yield put({ type: "SET_GENRES", payload: response.data });
  } catch (err) {
    console.warn("Error with getGenres:", err);
  }
}

function* postMovie(action) {
  try {
    yield axios.post("/movie", action.payload);
    yield put({ type: "GET_MOVIES" });
  } catch (err) {
    console.log("ERROR IN postMovie", err);
  }
}

function* deleteMovie(action) {
  try {
    yield axios.delete(action.payload);
    yield put({ type: "GET_MOVIES" });
  } catch (err) {
    console.warn("Error with deleteMovie", err);
  }
}

function* editMovie(action) {
  try {
    yield axios.put("/movie", action.payload);
    yield put({ type: "GET_MOVIES" });
  } catch (err) {
    console.warn("Error with editMovie", err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// REDUCER STORES
// Used to store movies returned from the server
const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

const movieDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_MOVIE_DATA":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genresReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    moviesReducer,
    genresReducer,
    movieDataReducer,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
