import { Place } from '../types';

export type PlacesState = {
  data: any;
  loading: boolean;
  error: null;
};

export type PlaceState = {
  data: any;
  newPlace: Place;
  loading: boolean;
  error: null;
};

export type RootState = {
  place: PlaceState;
  places: PlacesState;
};
