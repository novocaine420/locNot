export type Location = {
  lat: number;
  lng: number;
};

export type Reminder = {
  id?: string;
  title: string;
  location: Location;
  picture: string;
  date: string;
  message: string;
};

export type Place = {
  id?: string;
  name: string;
  location: Location;
  content: string[];
  date: string;
  message: string;
  peoples: string;
};
