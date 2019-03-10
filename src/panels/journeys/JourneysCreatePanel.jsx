import React from 'react'
import PropTypes from 'prop-types';
import {Panel, PanelHeader} from "@vkontakte/vkui";
import Icon24DoneOutline from '@vkontakte/icons/dist/24/done_outline';

const JourneysCreatePanel = (props) => (
    <Panel id={props.id}>
        <PanelHeader right={<Icon24DoneOutline/>}>
            Создать новое путешествие
        </PanelHeader>
    </Panel>
);

JourneysCreatePanel.propTypes = {
    id: PropTypes.string.isRequired,
};

export default JourneysCreatePanel