import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
      const movies = yield axios.get('/api/movie');
      yield put({ type: 'SET_MOVIES', payload: movies.data });

  } catch(error) {
      console.log('get movies error, ', error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
      case 'SET_MOVIES':
          return action.payload;
      default:
          return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
      movies
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={storeInstance}>
      <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);