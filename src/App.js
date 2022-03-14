import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
}, []);

  return (
    <div className="App">
      <h1>Welcome To Your Project Template!</h1>
    </div>
  );
}

export default App;
