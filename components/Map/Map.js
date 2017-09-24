import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import { Popover, Icon } from 'antd';
import './Map.css';

const CustomMarker = ({ text, description, cssClass }) => (
  <Popover content={description} title={text} trigger="click">
    <div className={cssClass}><Icon type="environment" /></div>
  </Popover>
);

/* eslint-disable react/forbid-prop-types */
/* global google */

class Map extends PureComponent {
  static propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    stops: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 15,
    };
  }

  componentWillReceiveProps(nextProps) {
    const bounds = new google.maps.LatLngBounds();

    nextProps.stops.forEach((p) => {
      bounds.extend(new google.maps.LatLng(p.latitude, p.longitude));
    });

    const { center, zoom } = fitBounds({
      se: { lat: bounds.f.b, lng: bounds.b.f },
      nw: { lat: bounds.f.f, lng: bounds.b.b },
    }, {
      width: this.props.width,
      height: this.props.height,
    });

    this.setState({ center, zoom });
  }

  render() {
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
        center={this.state.center}
        zoom={this.state.zoom}
        defaultZoom={15}
        options={{ fullscreenControl: false }}
        bootstrapURLKeys={{
          key: 'AIzaSyBtlm0Jupr0aEQPx2XgdU-vlM4-GD-avy8',
          language: 'en',
        }}
      >
        {GoogleMapsMarkers}
        <CustomMarker
          lat={this.props.lat}
          lng={this.props.lng}
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
