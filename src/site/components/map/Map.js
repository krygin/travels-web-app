import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'shared/components/Base';
import GoogleMap from 'google-map-react';
import { connect } from 'react-redux';
import SimpleMarker from './markers/SimpleMarker';
import './Map.scss';
import config from 'shared/config';


const mapStateToProps = state => ({
    ...state.site.map
});


class Map extends BaseComponent {
  static defaultProps = {
    points: [],
    clickMarkerCallback: () => {}
  };

  static propTypes = {
    points: PropTypes.array,
    clickMarkerCallback: PropTypes.func
  };

  render() {
    const defaultProps = {
      center: { lat: 33.4317826, lng: 18.0429884 },
      zoom: 1
    };
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
      <div className="b-map">
        <GoogleMap
            defaultCenter={ defaultProps.center }
            defaultZoom={ defaultProps.zoom }
            options={ defaultOptions }
            center={ this.props.center }
            bootstrapURLKeys={{ key: config.googleKey }}
        >
          { markers }
        </GoogleMap>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Map);