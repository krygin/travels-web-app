import React from 'react';
import BaseComponent from 'shared/components/Base';
import {
  Avatar,
  Panel,
  PanelHeader,
  Root,
  View,
  Cell
} from "@vkontakte/vkui";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { actions } from 'store/entities/user';

const mapStateToProps = state => ({
  user: state.entities.user
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(actions, dispatch),
});


class Profile extends BaseComponent {
  render() {
    console.log(this.props);
    return (
      <Root id={this.props.id} activeView="profileView">
        <View id="profileView" activePanel="profilePanel">
          <Panel id="profilePanel">
            <PanelHeader>Профиль</PanelHeader>
            <Cell
              photo={this.props.user.current.profile_image}
              before={<Avatar src={this.props.user.current.profile_image} size={80}/>}
              size="l"
            >
              {this.props.user.current.first_name} {this.props.user.current.last_name}
            </Cell>
          </Panel>
        </View>
      </Root>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);