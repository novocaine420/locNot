import moment from 'moment';

import { PlacesState, PlaceState, RemindersState } from './types';

const currentDate = moment().format('YYYY-MM-DD[T]HH:mm:ss');

export const initialRemindersState: RemindersState = {
  list: [],
  data: {
    title: '',
    message: '',
    location: {
      lat: 49.84444811135912,
      lng: 24.026233897782312
    },
    date: currentDate,
    picture: ''
  },
  loading: false,
  error: null
};

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
    date: currentDate,
    message: '',
    peoples: ''
  },
  loading: false,
  error: null
};
