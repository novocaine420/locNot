import { Place, Reminder } from '../types';

export type RemindersState = {
  list: Reminder[];
  data: Reminder;
  loading: boolean;
  error: null;
};

export type PlaceState = {
  data: any;
  newPlace: Place;
  loading: boolean;
  error: null;
};

export type PlacesState = {
  data: Place[];
  loading: boolean;
  error: null;
};

export type RootState = {
  place: PlaceState;
  places: PlacesState;
  reminders: RemindersState;
};
