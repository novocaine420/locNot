import { Dispatch } from 'redux';

import { Place } from '@isomorphic/types';
import { PlaceState } from './types';
import { initialPlaceState } from './initial-states';
import { firebase } from '../../helpers/firebase-api';

export const PLACE_LOADED = 'place/loaded';
export const PLACE_START_FETCHING = 'place/startFetching';
export const SET_PLACE = 'place/setPlace';
export const PLACE_SET_ERROR = 'place/setError';

const db = firebase.database().ref('places');

interface PlacesLoadedAction {
  type: typeof PLACE_LOADED;
  payload: any;
}

interface PlacesStartFetchingAction {
  type: typeof PLACE_START_FETCHING;
}

interface SetPlaceAction {
  type: typeof SET_PLACE;
  payload: Place;
}

interface PlaceSetErrorAction {
  type: typeof PLACE_SET_ERROR;
  payload: any;
}

export type PlacesActions = PlacesLoadedAction | PlacesStartFetchingAction | SetPlaceAction | PlaceSetErrorAction;

export const fetchPlace = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: PLACE_START_FETCHING });

  db.child(id).on('value', (snapshot) => {
    dispatch({
      type: PLACE_LOADED,
      payload: {
        data: snapshot.val()
      }
    });
  });
};

export const setPlace = (data: Place) => ({
  type: SET_PLACE,
  payload: data
});

export const addPlace = (place: Place) => async (dispatch: Dispatch) => {
  dispatch({ type: PLACE_START_FETCHING });
  const newPlaceRef = db.push();
  const id = newPlaceRef?.key || '';
  const newPlace = { ...place, id };

  db.child(id)
    .set(newPlace, (error) => {
      dispatch({
        type: PLACE_SET_ERROR,
        payload: {
          error
        }
      });
    })
    .then(() => {
      dispatch({
        type: PLACE_LOADED,
        payload: {
          newPlace
        }
      });
    });
};

export const placeReducer = (state: PlaceState = initialPlaceState, action: PlacesActions) => {
  switch (action.type) {
    case PLACE_LOADED:
      return { ...state, ...action.payload, loading: false };
    case PLACE_START_FETCHING:
      return { ...state, loading: true };
    case SET_PLACE:
      return { ...state, newPlace: action.payload };
    case PLACE_SET_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
