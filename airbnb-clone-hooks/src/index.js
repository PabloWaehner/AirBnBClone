import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import Spinner from './utility/Spinner/Spinner';

//Redux setup
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

// Redux Persist Setup
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2, //State reconcilers define how incoming state is merged in with initial state (https://github.com/rt2zz/redux-persist)
  blacklist: ['siteModal',] //now siteModal is no longer in the local storage (we don't care about having it there)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
// 5. Create the store (2) by passing it the rootReducer, which is made up of the reducers
const theStore = applyMiddleware(reduxPromise)(createStore)(persistedReducer);
const persistor = persistStore(theStore)

// Provider is the glue between react and redux. We need to give it the store
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={theStore}>
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
