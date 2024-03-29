import logo from './logo.svg';
import './App.css';
import React, { Suspense } from 'react';
import Router from './router/index.js';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
