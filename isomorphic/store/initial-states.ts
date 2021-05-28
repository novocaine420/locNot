import { PlacesState, PlaceState } from './types';

export const initialPlacesState: PlacesState = {
  data: [],
  loading: false,
  error: null
};

export const initialPlaceState: PlaceState = {
  data: {},
  newPlace: {
    name: '',
    location: {
      lat: 49.84444811135912,
      lng: 24.026233897782312
    },
    content: [],
    date: new Date(),
    message: '',
    peoples: ''
  },
  loading: false,
  error: null
};
