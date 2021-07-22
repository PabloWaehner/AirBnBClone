// this is the root reducer. It is the store manager for all the reducers
// to make a rootReducer: 
// 1. get a method from redux, called combineReducers
import { combineReducers } from 'redux';

// 2. get each individual reducer
import authReducer from './authReducer';
import siteModal from './siteModal';

// 3. call combineReducers and hand it an object
// each key in combineReducers will be a piece of state in the redux store
// each value, will be the value of that piece of state in the redux store
const rootReducer = combineReducers({
    auth: authReducer,
    siteModal: siteModal
})

export default rootReducer; //and from here, to index.js, to create the store using the rootReducer