//File config redux store
import { createStore, applyMiddleware } from 'redux';

//Redux Thunk
import thunk from 'redux-thunk'

import rootReducer from './reducers/rootReducer';

//cai react dev tool
import { composeWithDevTools } from 'redux-devtools-extension';
//composeWithDevTools

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;