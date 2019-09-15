import React from 'react'
import PropTypes from 'prop-types';
import {Avatar, Cell} from "@vkontakte/vkui";
import {dateToString} from "shared/utils/helpers";

const getNotificationText = n => {
  if (n.type === 'participation_request') {
    const user = n.producer;
    return `${user.first_name} хочет поехать с вами`;
  } else if (n.type === 'participation_decision') {
    const user = n.producer;
    const isAccepted = n.is_accepted;
    if (isAccepted) {
      return `${user.first_name} принял вашу заявку`;
    } else {
      return `${user.first_name} отклонил вашу заявку`;
    }
  }
  return '???';
};

const getNotificationDescription = n => {
  return `${dateToString(parseInt(n.created) * 1000)} - ${n.position.description}`
};

const NCell = props => {
  const notification = props.notification;
  return (
    <Cell
      onClick={props.onClick}
      before={< Avatar src={props.notification.producer.profile_image}/> }
      size={"l"}
      expandable={true}
      description={getNotificationDescription(notification)}>
      {getNotificationText(notification)}
    </Cell>
  )
};


NCell.propTypes = {
  notification: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default NCell;