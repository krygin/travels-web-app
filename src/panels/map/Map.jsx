import React from 'react'
import PropTypes from 'prop-types';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import { Polyline } from "react-google-maps";


const pathCoordinates = [
    { lat: 55.45, lng: 37.37 },
    { lat: 48.50, lng: 2.20 }
];

const Map = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={props.zoom}
        defaultCenter={props.center}>
        <Marker position={{lat: 55.45, lng: 37.37}}/>
        <Marker position={{lat: 48.50, lng: 2.20}}/>
        <Polyline
            path={pathCoordinates}
            geodesic={true}
            options={{
                strokeColor: "#ff2527",
                strokeOpacity: 0.75,
                strokeWeight: 2
            }}/>
    </GoogleMap>
));

Map.propTypes = {
    center: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired
        }
    ),
    zoom: PropTypes.number.isRequired
};

Map.defaultProps = {
    center: {lat: 55.45, lng: 37.37},
    zoom: 4,
};

export default Map