import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { Location } from '@isomorphic/types';
import styles from './styles.module.scss';

type MapProps = {
  location?: Location;
  zoom?: number;
  onClick?: (location: Location) => void;
};

const defaultLocation = {
  lat: 49.84444811135912,
  lng: 24.026233897782312
};

const GoogleMap = ({ location, zoom = 17, onClick }: MapProps) => (
  <div style={{ height: '320px', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: '' }}
      defaultCenter={defaultLocation}
      center={location}
      defaultZoom={zoom}
      onClick={onClick}
    >
      <LocationOnIcon className={styles.locationMarker} />
    </GoogleMapReact>
  </div>
);

export default GoogleMap;
