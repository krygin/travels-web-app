import React from 'react'
import {Panel, PanelHeader} from '@vkontakte/vkui';
import PropTypes from "prop-types";
import Map from "./Map";


const MapPanel = props => (
    <Panel id={props.id}>
        <PanelHeader>
            Поиск путешествия
        </PanelHeader>

        <Map   googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKfYKyZhTA3jkN3Htv23OPmuh93PgY8mM&v=3.exp&libraries=geometry,drawing,places"
               loadingElement={<div style={{ height: `100%` }} />}
               containerElement={<div style={{ height: `400px` }} />}
               mapElement={<div style={{ height: `100%` }} />} />
    </Panel>
);

MapPanel.propTypes = {
    id: PropTypes.string.isRequired,
};

export default MapPanel