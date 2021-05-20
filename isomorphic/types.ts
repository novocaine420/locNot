export type Location = {
  lat: number;
  lng: number;
};

export type Place = {
  id?: string;
  name: string;
  location: Location;
  content: string[];
  date: Date;
  message: string;
  peoples: string;
};
