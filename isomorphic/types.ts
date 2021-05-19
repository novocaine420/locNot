export type Location = {
  lat: number;
  lng: number;
};

export type Place = {
  id?: string;
  name?: string;
  location: Location;
  content: [];
  date: Date;
  message: string;
  peoples: string;
};
