import { Dispatch } from 'redux';

import { Place } from '@isomorphic/types';
import { PlaceState } from './types';
import { initialPlaceState } from './initial-states';

export const PLACE_LOADED = 'place/loaded';
export const PLACE_START_FETCHING = 'place/startFetching';
export const SET_PLACE = 'place/setPlace';

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

export type PlacesActions = PlacesLoadedAction | PlacesStartFetchingAction | SetPlaceAction;

export const fetchPlaces = () => (dispatch: Dispatch) => {
  dispatch({
    type: PLACE_LOADED,
    payload: {
      data: []
    }
  });
};

export const setPlace = (data: Place) => ({
  type: SET_PLACE,
  payload: data
});

export const placeReducer = (state: PlaceState = initialPlaceState, action: PlacesActions) => {
  switch (action.type) {
    case PLACE_LOADED:
      return { ...action.payload, loading: false };
    case PLACE_START_FETCHING:
      return { ...state, loading: true };
    case SET_PLACE:
      return { ...state, newPlace: action.payload };
    default:
      return state;
  }
};
