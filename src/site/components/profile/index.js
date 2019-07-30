import React from 'react';
import BaseComponent from 'shared/components/Base';
import {
  Panel,
  PanelHeader,
  Root,
  View
} from "@vkontakte/vkui";


class Profile extends BaseComponent {
  render() {
    return (
      <Root id={this.props.id} activeView="profileView">
        <View id="profileView" activePanel="profilePanel">
          <Panel id="profilePanel">
            <PanelHeader>Профиль</PanelHeader>
            profile
          </Panel>
        </View>
      </Root>
    );
  }
}

export default Profile;