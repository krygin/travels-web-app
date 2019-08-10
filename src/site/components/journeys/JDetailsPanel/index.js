import React from 'react';
import PropTypes from 'prop-types';
import Base from 'shared/components/Base';
import { convertDateToString } from "shared/utils/helpers";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {journeyActions} from "store/entities/journey";

import viewer from 'react-mobile-image-viewer';
import 'react-mobile-image-viewer/lib/index.css';
import {
  Panel,
  PanelHeader,
  HeaderButton,
  Group,
  Button,
  List,
  Cell,
  Avatar,
  Spinner
} from '@vkontakte/vkui';
import { platform, IOS } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import './styles.scss';


const mapStateToProps = state => ({
  journeyStore: state.entities.journey,
  userStore: state.entities.user,
});

const mapDispatchToProps = dispatch => ({
  journeyActions: bindActionCreators(journeyActions, dispatch),
});

class JDetailsPanel extends Base {
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
      isLoading: false
    };
  }

  loadParticipants = async () => {
    if (!this.props.journey) {
      return;
    }
    const participantIds = this.props.journeyStore.participants[this.props.journey.id];
    if (participantIds) {
      return;
    }
    this.setState({isLoading: true});
    await this.props.journeyActions.getParticipants(this.props.journey.id);
    this.setState({isLoading: false});
  };

  componentDidMount() {
    this.loadParticipants();
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

  join2Journey = async () => {
    this.setState({isLoading: true});
    await this.props.journeyActions.join2journey(this.props.journey.id);
    await this.props.journeyActions.getParticipants(this.props.journey.id);
    this.setState({isLoading: false});
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
            <div
              className="b-details-cell__image"
              style={{'backgroundImage': `url(${m.attachment.url})`}}
              onClick={() => viewer({urls, index})}
            />
            <div className="b-details-cell__description">{ m.description }</div>
          </Group>
        )
      });

      let participants;
      let participantIds = this.props.journeyStore.participants[this.props.journey.id];
      if (participantIds && participantIds.length > 0) {
        participants = (
          <Group title="Участники">
            <List>
              {participantIds.map(userId => {
                const user = this.props.userStore.users[userId];
                const isAuthor = this.props.journey.author_id === userId;
                return (
                  <Cell
                    key={userId}
                    before={<Avatar src="https://pp.userapi.com/c625316/v625316293/347b7/DmD1VKYbwwI.jpg?ava=1" />}
                  >
                    {user.last_name} {user.first_name}<br/>
                    { isAuthor && <span className="b-participant__author">автор</span>}
                  </Cell>
                );
              })}
            </List>
          </Group>
        )
      } else {
        participantIds = [];
      }
      const currentUserId = this.props.userStore.current.id;
      const isAuthor = this.props.journey.author_id === currentUserId;
      const isParticipant = participantIds.includes(currentUserId);
      const canJoin = !isAuthor && !isParticipant;

      content = (
        <div>
          <Group className="b-details-cell" title="О путешествии">
            <div className="b-details-cell__item">
              <Icon28Place className="b-details-cell__icon"/>
              <div className="b-details-cell__value">{routeItem.description}</div>
            </div>
            <div className="b-details-cell__item">
              <Icon24Recent className="b-details-cell__icon b-details-cell__icon_recent"/>
              <div className="b-details-cell__value b-details-cell__value_recent">{this.convertDates()}</div>
            </div>
            <div className="b-details-cell__description">{ this.props.journey.description }</div>
            <div className="b-details-cell__join">
              { this.state.isLoading && <Spinner size="large"/> }
              { (!this.state.isLoading && canJoin) && <Button size="xl" onClick={this.join2Journey}>Присоединиться</Button>}
            </div>
          </Group>
          { participants }
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

export default connect(mapStateToProps, mapDispatchToProps)(JDetailsPanel);