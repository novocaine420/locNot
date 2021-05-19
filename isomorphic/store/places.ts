import { Dispatch } from 'redux';

import { PlacesState } from './types';
import { initialPlacesState } from './initial-states';
import { Place } from '@isomorphic/types';
import { findInStorage, saveToStorage } from '../../helpers/storageHelpers';

export const PLACES_LOADED = 'places/loaded';
export const PLACES_START_FETCHING = 'places/startFetching';
export const ADD_PLACE = 'places/addPlace';

interface PlacesLoadedAction {
  type: typeof PLACES_LOADED;
  payload: any;
}

interface PlacesStartFetchingAction {
  type: typeof PLACES_START_FETCHING;
}

interface AddPlaceAction {
  type: typeof ADD_PLACE;
  payload: Place;
}

export type PlacesActions = PlacesLoadedAction | PlacesStartFetchingAction | AddPlaceAction;

export const fetchPlaces = () => (dispatch: Dispatch) => {
  dispatch({
    type: PLACES_LOADED,
    payload: {
      data: []
    }
  });
};

export const addPlace = (place: Place) => {
  const places = findInStorage('places') ?? [];
  saveToStorage('places', [...places, place]);

  return {
    type: ADD_PLACE,
    payload: place
  };
};

export const placesReducer = (state: PlacesState = initialPlacesState, action: PlacesActions) => {
  switch (action.type) {
    case PLACES_LOADED:
      return { ...action.payload, loading: false };
    case PLACES_START_FETCHING:
      return { ...state, loading: true };
    case ADD_PLACE:
      return { ...state, data: [...state.data, action.payload] };
    default:
      return state;
  }
};
