import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// 1. In order to wire up a react/redux app, we need react-redux.
// We need the Provider ReactComponent, to be around everything!
import { Provider } from 'react-redux';
// 2. We need to create the redux store, so that redux exists, and the provider has a store
import { createStore, applyMiddleware } from 'redux';
// 3. We need reducers to populate the store. We always start with a rootReducer 
// (we create a folder in src called reducers, with rootReducer.js (also called sometimes index.js, but rootReducer.js here to avoid confusion))
// 4. Make individual reducers to hand in the rootReducer (3)
import rootReducer from './reducers/rootReducer';
import reduxPromise from 'redux-promise';

// 5. Create the store (2) by passing it the rootReducer, which is made up of the reducers
const theStore = applyMiddleware(reduxPromise)(createStore)(rootReducer);

// Provider is the glue between react and redux. We need to give it the store
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={theStore}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
