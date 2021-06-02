import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { RootState } from '@isomorphic/store/types';
import { placesReducer } from '@isomorphic/store/places';
import { placeReducer } from '@isomorphic/store/place';
import { remindersReducer } from '@isomorphic/store/reminders';

const rootReducer = combineReducers<RootState>({
  places: placesReducer,
  place: placeReducer,
  reminders: remindersReducer
});

export default function configureStore(preloadedState: RootState) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
