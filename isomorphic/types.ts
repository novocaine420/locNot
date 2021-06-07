export type Location = {
  lat: number;
  lng: number;
};

export type Reminder = {
  id?: string;
  title: string;
  location: Location | undefined;
  picture: string;
  date: string;
  message: string;
};

export type Place = {
  id?: string;
  name: string;
  location: Location | undefined;
  content: string[];
  date: string;
  message: string;
  peoples: string;
};
