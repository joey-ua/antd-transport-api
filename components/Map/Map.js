import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { Popover, Icon } from 'antd';
import './Map.css';

const CustomMarker = ({ text, description, cssClass }) => (
  <Popover content={description} title={text} trigger="click">
    <div className={cssClass}><Icon type="environment" /></div>
  </Popover>
);

/* eslint-disable react/forbid-prop-types */

class Map extends PureComponent {
  static propTypes = {
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
    stops: PropTypes.object.isRequired,
  };
  render() {
    const centerLat = this.props.lat;
    const centerLng = this.props.lng;
    const Center = { lat: centerLat, lng: centerLng };
    const GoogleMapsMarkers = this.props.stops.map(marker => (
      <CustomMarker
        key={`marker_${marker.atcocode}`}
        lat={marker.latitude}
        lng={marker.longitude}
        text={marker.name}
        description={`Distance: ${marker.distance} meters`}
        cssClass="Map__marker"
      />
    ));

    return (
      <GoogleMapReact
        center={Center}
        defaultZoom={15}
        options={{ fullscreenControl: false }}
        bootstrapURLKeys={{
          key: 'AIzaSyBtlm0Jupr0aEQPx2XgdU-vlM4-GD-avy8',
          language: 'en',
        }}
      >
        {GoogleMapsMarkers}
        <CustomMarker
          lat={centerLat}
          lng={centerLng}
          text="Location center"
          description="Defined by the search"
          cssClass="Map__marker Map__marker--center"
        />
      </GoogleMapReact>
    );
  }
}

CustomMarker.propTypes = {
  text: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cssClass: PropTypes.string.isRequired,
};

export default Map;
