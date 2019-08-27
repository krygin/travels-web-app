import React from 'react';
import BaseComponent from 'shared/components/Base';
import '@vkontakte/vkui/dist/vkui.css';
import 'shared/styles/Base.scss';

import {ConfigProvider, Epic, Tabbar, TabbarItem} from '@vkontakte/vkui';

import AuthWrapper from "./AuthWrapper";
import Journeys from "./components/journeys";
import Profile from "./components/profile";
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon28User from '@vkontakte/icons/dist/28/user';

const JOURNEYS = 'App_JOURNEYS';
const PROFILE = 'App_PROFILE';


export default class extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeStory: JOURNEYS,
    };
  }

  componentDidMount() {

  }

  onStoryChange = e => {
    this.setState({activeStory: e.currentTarget.dataset.story})
  };

  render() {
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
            </Tabbar>
          }>
            <Journeys id={JOURNEYS}/>
            <Profile id={PROFILE}/>
          </Epic>
        </ConfigProvider>
      </AuthWrapper>
    );
  }
}