import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { placesReducer } from '@isomorphic/store/places';
import { placeReducer } from '@isomorphic/store/place';
import { RootState } from '@isomorphic/store/types';

const rootReducer = combineReducers<RootState>({
  places: placesReducer,
  place: placeReducer
});

export default function configureStore(preloadedState: RootState) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
