import React from 'react'
import PropTypes from 'prop-types';
import {
    Panel,
    FixedLayout,
    Button
} from "@vkontakte/vkui";
import Map from 'site/components/map/Map';

const JMapPanel = (props) => (
    <Panel id={props.id}>
        <Map clickMarkerCallback={props.onItemClick} points={props.journey.filteredJourneyIds.map(id => {
            const item = this.props.journey.journeys[id];
            const routeItem = item.route_item;
            return {
                id: id,
                location: routeItem.point
            }
        })
        }/>
        <FixedLayout vertical="bottom">
            <Button onClick={props.onListButtonClick} style={{
                display: `block`,
                marginLeft: `auto`,
                marginRight: `auto`,
                marginBottom: `12px`
            }}>Список</Button>
        </FixedLayout>
    </Panel>
);

JMapPanel.propTypes = {
    id: PropTypes.string.isRequired,
    journeys: PropTypes.array,
    onItemClick: PropTypes.func.isRequired,
    onListButtonClick: PropTypes.func.isRequired
};

export default JMapPanel