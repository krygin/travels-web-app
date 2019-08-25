import React from 'react'
import PropTypes from 'prop-types';
import {Cell} from "@vkontakte/vkui";
import {dateToString} from "shared/utils/helpers";


const JCell = props => (
  <Cell
    onClick={props.onClick}
    before={<img alt={""}
                 style={{height: `48px`, width: `64px`, marginTop: `12px`, marginRight: `12px`, borderRadius: `4px`}}
                 src={props.journey && journeysThumbnailUrl(props.journey)}/>}
    size={"l"}
    expandable={true}
    description={`${dateToString(props.journey.begin_date * 1000)} - ${dateToString(props.journey.end_date * 1000)}`}>
    {props.journey.route_item.description}
  </Cell>
);


function journeysThumbnailUrl(journey) {
  if (journey.milestones.length > 0) {
    return journey.milestones[0].attachment.url
  } else {
    return null
  }
}


JCell.propTypes = {
  journey: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default JCell;