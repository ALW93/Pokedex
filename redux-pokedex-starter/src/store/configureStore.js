import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import authentication from "./authentication"
import {loadReducer} from "./pokemon"
import {pokemonDetailReducer} from "./pokemonDetail";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({authentication, pokemon: loadReducer, pokemonDetail: pokemonDetailReducer
});

const configureStore = initialState => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
};

export default configureStore;