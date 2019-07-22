import React from 'react'
import PropTypes from 'prop-types';
import {
    Panel,
    PanelHeader,
    Search,
    FixedLayout,
    Button,
    List,
} from "@vkontakte/vkui";
import JCell from "./JCell";

const JListPanel = (props) => (
    <Panel id={props.id}>
        <PanelHeader noShadow>
            Путешествия
        </PanelHeader>
        <FixedLayout vertical="top">
            <Search/>
        </FixedLayout>
        <List style={{paddingTop: 60}}>
            {props.journeys && props.journeys.map(journey => <JCell onClick={props.onItemClick} journey={journey}
                                                                    key={journey.id}/>)}
        </List>
        <FixedLayout vertical="bottom">
            <Button onClick={props.onMapButtonClick} style={{
                display: `block`,
                marginLeft: `auto`,
                marginRight: `auto`,
                marginBottom: `12px`
            }}>Карта</Button>
        </FixedLayout>
    </Panel>
);

JListPanel.propTypes = {
    id: PropTypes.string.isRequired,
    journeys: PropTypes.array,
    onItemClick: PropTypes.func.isRequired,
    onMapButtonClick: PropTypes.func.isRequired
};

export default JListPanel