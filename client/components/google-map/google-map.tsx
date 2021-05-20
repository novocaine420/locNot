import React from 'react';
import GoogleMapReact from 'google-map-react';

import { Location } from '@isomorphic/types';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

type MapProps = {
  location?: Location;
  zoom?: number;
  onClick?: (location: Location) => void;
};

const defaultLocation = {
  lat: 49.84444811135912,
  lng: 24.026233897782312
};

const GoogleMap = ({ location = defaultLocation, zoom = 17, onClick }: MapProps) => {
  return (
    <div style={{ height: '320px', width: '100%' }}>
      <GoogleMapReact bootstrapURLKeys={{ key: '' }} defaultCenter={location} defaultZoom={zoom} onClick={onClick}>
        <AnyReactComponent lat={location.lat} lng={location.lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
