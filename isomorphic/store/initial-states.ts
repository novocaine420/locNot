import moment from 'moment';

import { LocationState, PlacesState, PlaceState, RemindersState, SubscriptionState } from './types';

const currentDate = moment().format('YYYY-MM-DD[T]HH:mm:ss');

export const initialRemindersState: RemindersState = {
  list: [],
  data: {
    title: '',
    message: '',
    location: undefined,
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
    location: undefined,
    content: [],
    date: currentDate,
    message: '',
    peoples: ''
  },
  loading: false,
  error: null
};

export const initialLocationState: LocationState = {
  data: null,
  error: null
};

export const initialSubscriptionState: SubscriptionState = {
  data: null,
  error: null
};
