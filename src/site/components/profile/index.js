import React from 'react';
import {
  Avatar,
  Panel,
  PanelHeader,
  Root,
  View,
  Cell,
  Group,
  List
} from "@vkontakte/vkui";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from 'store/entities/user';
import {journeyActions} from 'store/entities/journey';
import JCell from "../journeys/JCell";
import './styles.scss';

const mapStateToProps = state => ({
  users: state.entities.user.users,
  current: state.entities.user.current,
  journeys: state.entities.journey.journeys,
  userJourneysIds: state.entities.journey.filteredJourneyIds
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(actions, dispatch),
  journeyActions: bindActionCreators(journeyActions, dispatch)
});


class Profile extends React.Component {

  componentDidMount() {
    this.props.userActions.getUserProfile(this.props.current.id);
    this.props.journeyActions.getJourneyList({userId: this.props.current.id})
  }

  render() {
    const current = this.props.users[this.props.current.id];

    return (
      <Root id={this.props.id} activeView="profileView">
        <View id="profileView" activePanel="profilePanel">
          <Panel id="profilePanel">
            <PanelHeader>Профиль</PanelHeader>
            <Group title="О путешественнике">
              <List>
                <Cell
                  photo={current.profile_image}
                  before={<Avatar src={current.profile_image} size={80}/>}
                  size="l"
                >
                  <div className="b-user__title">{current.first_name} {current.last_name}</div>
                </Cell>
                <Cell multiline>
                  Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте
                  Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте
                  Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте
                  Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте
                  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                  Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте
                  Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте
                  Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте
                  Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте Команда ВКонтакте
                </Cell>
              </List>
            </Group>
            <Group title="Путешествия">
              <List>
                { this.props.userJourneysIds &&
                  this.props.userJourneysIds.map(journeyId =>
                    <JCell journey={this.props.journeys[journeyId]} onClick={()=>{}} key={journeyId}/>)
                }
              </List>
            </Group>
          </Panel>
        </View>
      </Root>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);