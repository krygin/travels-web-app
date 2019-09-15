import React from 'react';
import {
  Panel,
  PanelHeader,
  Root,
  View,
  Group,
  List, Spinner
} from "@vkontakte/vkui";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from 'store/entities/notification';
import {
  actions as stateActions,
  NOTIFICATIONS_PANEL,
  // DETAILS_PANEL
} from './redux';
import NCell from './NCell';
import './styles.scss';


const mapStateToProps = state => ({
  n: state.entities.notification,
  state: state.site.notifications,
});

const mapDispatchToProps = dispatch => ({
  nActions: bindActionCreators(actions, dispatch),
  stateActions: bindActionCreators(stateActions, dispatch),
});


class Notifications extends React.Component {
  componentDidMount() {
    this.props.nActions.getNotificationList(false);
  }

  render() {
    let content;
    if (this.props.n.isLoading) {
      content = <Spinner size="regular"/>;
    } else if (this.props.n.notificationIds.length !== 0) {
      const notifications = this.props.n.notificationIds.map(
        id => this.props.n.notifications[id]
      );
      const newNotifications = notifications.filter(item => item.is_viewed === 0);
      const viewedNotifications = notifications.filter(item => item.is_viewed !== 0);
      content = (
        <div>
          {newNotifications.length !== 0 &&
          <Group title="Новые">
            <List>
              {newNotifications.map(item =>
                <NCell key={item.id} notification={item} onClick={() => {
                }}/>)
              }
            </List>
          </Group>
          }
          {viewedNotifications.length !== 0 &&
          <Group title="Просмотренные">
            <List>
              {viewedNotifications.map(item =>
                <NCell key={item.id} notification={item} onClick={() => {
                }}/>)
              }
            </List>
          </Group>
          }
        </div>
      )
    } else {
      content = (
        <div className="b-notification__absent">Нет новых уведомлений</div>
      )
    }
    return (
      <Root id={this.props.id} activeView="notificationsView">
        <View id="notificationsView" activePanel={this.props.state.activePanel}>
          <Panel id={NOTIFICATIONS_PANEL}>
            <PanelHeader>Уведомления</PanelHeader>
            {content}
          </Panel>
        </View>
      </Root>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);