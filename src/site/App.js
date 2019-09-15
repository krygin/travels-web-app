import React from 'react';
import BaseComponent from 'shared/components/Base';
import '@vkontakte/vkui/dist/vkui.css';
import 'shared/styles/Base.scss';

import {ConfigProvider, Epic, Tabbar, TabbarItem} from '@vkontakte/vkui';

import AuthWrapper from "./AuthWrapper";
import Journeys from "./components/journeys";
import Profile from "./components/profile";
import Notification from "./components/notifications";
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon28Notification from '@vkontakte/icons/dist/28/notification';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from "store/entities/notification";


const JOURNEYS = 'App_JOURNEYS';
const PROFILE = 'App_PROFILE';
const NOTIFICATIONS = 'App_NOTIFICATIONS';

const mapStateToProps = state => ({
  n: state.entities.notification,
});

const mapDispatchToProps = dispatch => ({
  nActions: bindActionCreators(actions, dispatch),
});


class App extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeStory: JOURNEYS,
    };
  }

  componentDidMount() {
    this.props.nActions.getNotificationList();
  }

  onStoryChange = e => {
    this.setState({activeStory: e.currentTarget.dataset.story})
  };

  render() {
    const notifications = this.props.n.notificationIds.map(
      id => this.props.n.notifications[id]
    );
    const newNotifications = notifications.filter(item => item.is_viewed === 0);

    return (
      <AuthWrapper>
        <ConfigProvider>
          <Epic activeStory={this.state.activeStory} tabbar={
            <Tabbar>
              <TabbarItem
                onClick={this.onStoryChange}
                selected={this.state.activeStory === JOURNEYS}
                data-story={JOURNEYS}
                text="Путешествия"
              >
                <Icon28Place/>
              </TabbarItem>
              <TabbarItem
                onClick={this.onStoryChange}
                selected={this.state.activeStory === PROFILE}
                data-story={PROFILE}
                text="Профиль"
              >
                <Icon28User/>
              </TabbarItem>
              <TabbarItem
                onClick={this.onStoryChange}
                selected={this.state.activeStory === NOTIFICATIONS}
                data-story={NOTIFICATIONS}
                text="Уведомления"
                label={newNotifications.length !== 0 ? newNotifications.length : null}
              >
                <Icon28Notification/>
              </TabbarItem>
            </Tabbar>
          }>
            <Journeys id={JOURNEYS}/>
            <Profile id={PROFILE}/>
            <Notification id={NOTIFICATIONS}/>
          </Epic>
        </ConfigProvider>
      </AuthWrapper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);