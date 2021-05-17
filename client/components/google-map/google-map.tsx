import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

type MapProps = {
  location: {
    lat: number;
    lng: number;
  };
  zoom?: number;
};

const GoogleMap = ({ location, zoom = 17 }: MapProps) => {
  return (
    <div style={{ height: '320px', width: '100%' }}>
      <GoogleMapReact bootstrapURLKeys={{ key: '' }} defaultCenter={location} defaultZoom={zoom}>
        <AnyReactComponent lat={location.lat} lng={location.lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
