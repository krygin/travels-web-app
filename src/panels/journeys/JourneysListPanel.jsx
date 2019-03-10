import React from 'react'
import PropTypes from 'prop-types';
import {Panel, PanelHeader} from "@vkontakte/vkui";
import {List} from "@vkontakte/vkui";
import JourneyCell from "./JourneyCell";

const JourneysListPanel = (props) => (
    <Panel id={props.id}>
        <PanelHeader>
            Путешествия
        </PanelHeader>
        <List>
            <JourneyCell/>
            <JourneyCell/>
            <JourneyCell/>
        </List>
    </Panel>
);

JourneysListPanel.propTypes = {
    id: PropTypes.string.isRequired,
};

export default JourneysListPanel