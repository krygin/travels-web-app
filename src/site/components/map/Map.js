import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'shared/components/Base';
import GoogleMap from 'google-map-react';
import SimpleMarker from './markers/SimpleMarker';
import config from 'shared/config';


class Map extends BaseComponent {
  static defaultProps = {
    points: [],
    defaultCenter: { lat: 33.4317826, lng: 18.0429884 },
    defaultZoom: 1,
    onChange: () => {},
    clickMarkerCallback: () => {}
  };

  static propTypes = {
    points: PropTypes.array,
    defaultCenter: PropTypes.object,
    defaultZoom: PropTypes.number,
    center: PropTypes.object,
    zoom: PropTypes.number,
    onChange: PropTypes.func,
    clickMarkerCallback: PropTypes.func
  };

  render() {
    const defaultOptions = () => ({
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false
    });

    const markers = this.props.points.map((item, index) =>
      <SimpleMarker
        key={ index }
        id={ `${item.id}` }
        lat={ item.location.lat }
        lng={ item.location.lng }
        clickMarkerCallback={ this.props.clickMarkerCallback }
      />
    );

    return (
      <GoogleMap
        defaultCenter={this.props.defaultCenter}
        defaultZoom={this.props.defaultZoom}
        options={defaultOptions}
        center={this.props.center}
        zoom={this.props.zoom}
        onChange={data => this.props.onChange(data.center, data.zoom)}
        bootstrapURLKeys={{key: config.googleKey, libraries: 'places'}}
      >
        {markers}
      </GoogleMap>
    );
  }
}

export default Map;