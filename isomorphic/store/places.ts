import { Dispatch } from 'redux';

import { PlacesState } from './types';
import { initialPlacesState } from './initial-states';
import { firebase } from '../../helpers/firebase-api';

const db = firebase.database().ref('places');

export const PLACES_LOADED = 'places/loaded';
export const PLACES_START_FETCHING = 'places/startFetching';
export const PLACES_SET_ERROR = 'places/setError';

interface PlacesLoadedAction {
  type: typeof PLACES_LOADED;
  payload: any;
}

interface PlacesStartFetchingAction {
  type: typeof PLACES_START_FETCHING;
}

interface PlacesSetErrorAction {
  type: typeof PLACES_SET_ERROR;
  payload: any;
}

export type PlacesActions = PlacesLoadedAction | PlacesStartFetchingAction | PlacesSetErrorAction;

export const fetchPlaces = () => async (dispatch: Dispatch) => {
  dispatch({ type: PLACES_START_FETCHING });

  db.on('value', (snapshot) => {
    const places = Object.entries(snapshot.val()).map((obj) => obj[1]);
    dispatch({
      type: PLACES_LOADED,
      payload: {
        data: places
      }
    });
  });
};

export const deletePlace = (id: string) => async (dispatch: Dispatch) => {
  db.child(id)
    .remove()
    .catch((err) => {
      dispatch({
        type: PLACES_SET_ERROR,
        payload: {
          err
        }
      });
    });
};

export const placesReducer = (state: PlacesState = initialPlacesState, action: PlacesActions) => {
  switch (action.type) {
    case PLACES_LOADED:
      return { ...state, ...action.payload, loading: false };
    case PLACES_START_FETCHING:
      return { ...state, loading: true };
    case PLACES_SET_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
