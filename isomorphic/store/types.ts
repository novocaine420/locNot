import { Place, Reminder, Location } from '../types';

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

export type LocationState = {
  data: Location | null;
  error: null;
};

export type RootState = {
  place: PlaceState;
  places: PlacesState;
  reminders: RemindersState;
  location: LocationState;
};
