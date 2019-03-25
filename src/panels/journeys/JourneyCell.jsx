import React from 'react'
import PropTypes from 'prop-types';
import {Cell} from "@vkontakte/vkui";


const JourneyCell = props => (
    <Cell
        onClick={props.onClick}
        before={<img alt={""}
            style={{height: `48px`, width: `64px`, marginTop: `12px`, marginRight: `12px`, borderRadius: `4px`}}
            src="https://cdn.civitatis.com/italia/verona/galeria/verona-vista-aerea.jpg"/>}
        size={"l"}
        expandable={true}
        description={"(28 апреля - 5 мая)"}
        bottomContent={<div>
            40 000 ₽, 8 человек
        </div>
        }>Франция, Нормандия</Cell>
);

JourneyCell.propTypes = {
    journey: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default JourneyCell;