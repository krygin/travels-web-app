import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {
    Panel,
    PanelHeader,
    Search,
    FixedLayout,
    Button,
    List,
} from "@vkontakte/vkui";
import JourneyCell from "./JourneyCell";

const JourneysListPanel = (props) => (
    <Panel id={props.id}>
        <PanelHeader>
            Путешествия
        </PanelHeader>
        <FixedLayout vertical="top">
            <Search/>
        </FixedLayout>
        <List style={{paddingTop: 60}}>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
            <JourneyCell onClick={props.onItemClick}/>
        </List>
        <FixedLayout vertical="bottom">
            <Button style={{
                display: `block`,
                marginLeft: `auto`,
                marginRight: `auto`,
                marginBottom: `12px`
            }}>Фильтры</Button>
        </FixedLayout>
    </Panel>
);

JourneysListPanel.propTypes = {
    id: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired
};

export default JourneysListPanel