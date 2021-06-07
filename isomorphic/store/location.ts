import { Dispatch } from 'redux';

import { Location } from '@isomorphic/types';
import { LocationState } from './types';
import { initialLocationState } from './initial-states';

export const GET_LOCATION = 'location/getCurrentLocation';
export const LOCATION_SET_ERROR = 'location/setError';

interface GetLocationAction {
  type: typeof GET_LOCATION;
  payload: Location;
}

interface LocationSetErrorAction {
  type: typeof LOCATION_SET_ERROR;
  payload: any;
}

export type LocationActions = GetLocationAction | LocationSetErrorAction;

export const getLocation = () => (dispatch: Dispatch) => {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      dispatch({ type: GET_LOCATION, payload: { lat: coords.latitude, lng: coords.longitude } });
    },
    (err) => {
      dispatch({ type: LOCATION_SET_ERROR, payload: err });
    }
  );
};

export const locationReducer = (state: LocationState = initialLocationState, action: LocationActions) => {
  switch (action.type) {
    case GET_LOCATION:
      return { ...state, data: action.payload };
    case LOCATION_SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
