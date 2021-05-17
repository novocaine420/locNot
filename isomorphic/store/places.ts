import { Dispatch } from 'redux';

import { PlacesState } from './types';
import { initialPlacesState } from './initial-states';

export const PLACES_LOADED = 'places/loaded';
export const PLACES_START_FETCHING = 'places/startFetching';

interface PlacesLoadedAction {
  type: typeof PLACES_LOADED;
  payload: any;
}

interface PlacesStartFetchingAction {
  type: typeof PLACES_START_FETCHING;
}

export type PlacesActions = PlacesLoadedAction | PlacesStartFetchingAction;

export const fetchPlaces = () => (dispatch: Dispatch) => {
  dispatch({
    type: PLACES_LOADED,
    payload: {
      data: []
    }
  });
};

export const placesReducer = (state: PlacesState = initialPlacesState, action: PlacesActions) => {
  switch (action.type) {
    case PLACES_LOADED:
      return { ...action.payload, loading: false };
    case PLACES_START_FETCHING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
