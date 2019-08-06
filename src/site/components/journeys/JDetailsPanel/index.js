import React from 'react';
import PropTypes from 'prop-types';
import Base from 'shared/components/Base';
import { convertDateToString } from "shared/utils/helpers";

import viewer from 'react-mobile-image-viewer';
import 'react-mobile-image-viewer/lib/index.css';
import { Panel, PanelHeader, HeaderButton, Group } from '@vkontakte/vkui';
import { platform, IOS } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import './styles.scss';


export default class extends Base {
  static defaultProps = {
    backCallback: () => {}
  };

  static propTypes = {
    journey: PropTypes.object,
    backCallback: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      isViewerOpen: false,
      index: 0
    };
  }

  convertDates = () => {
    let begin = parseInt(this.props.journey.begin_date);
    begin = begin ? new Date(begin * 1000) : null;
    let end = parseInt(this.props.journey.end_date);
    end = end ? new Date(end * 1000) : null;

    if (begin && end) {
      begin = convertDateToString(begin);
      end = convertDateToString(end);
      return `${begin} - ${end}`;
    }
    if (begin) {
      return convertDateToString(begin);
    }
    if (end) {
      return convertDateToString(end);
    }

    return '';
  };

  render() {
    const osname = platform();
    let content;
    if (this.props.journey) {
      const routeItem = this.props.journey.route_item;
      const urls = this.props.journey.milestones.map(m => m.attachment.url);
      const milestones = this.props.journey.milestones.map((m, index) => {
        return (
          <Group key={m.id} className="b-details-cell">
            <div className="b-details-cell__description">{ m.description }</div>
            <div
              className="b-details-cell__image"
              style={{'backgroundImage': `url(${m.attachment.url})`}}
              onClick={() => viewer({urls, index})}
            />
          </Group>
        )
      });
      content = (
        <div>
          <Group className="b-details-cell">
            <div className="b-details-cell__item">
              <Icon28Place className="b-details-cell__icon"/>
              <div className="b-details-cell__value">{routeItem.description}</div>
            </div>
            <div className="b-details-cell__item">
              <Icon24Recent className="b-details-cell__icon b-details-cell__icon_recent"/>
              <div className="b-details-cell__value b-details-cell__value_recent">{this.convertDates()}</div>
            </div>
            <div className="b-details-cell__description">{ this.props.journey.description }</div>
          </Group>
          { milestones }
        </div>
      )
    }

    return (
      <Panel id={ this.props.id }>
        <PanelHeader
          left={
            <HeaderButton onClick={ this.props.backCallback }>
              {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </HeaderButton>
          }
          addon={
            <HeaderButton onClick={ this.props.backCallback }>Назад</HeaderButton>}
        >
          Путешествие
        </PanelHeader>
        { content }
      </Panel>
    );
  }
}