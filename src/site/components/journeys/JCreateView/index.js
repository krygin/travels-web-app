import React from 'react';
import Base from 'shared/components/Base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {mapActions} from 'site/components/map/redux';
import {
  actions as jCreateActions
} from 'site/components/journeys/JCreateView/redux';
import {journeyActions} from 'store/entities/journey';
import {
  View,
  Panel,
  PanelHeader,
  FormLayout,
  Input,
  Textarea,
  Button,
  platform,
  IOS,
  HeaderButton
} from "@vkontakte/vkui";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import GeoInputPanel from 'site/components/journeys/GeoInputPanel';


const mapStateToProps = state => ({
  journey: state.entities.journey,
  jCreate: state.site.jCreate
});

const mapDispatchToProps = dispatch => ({
  mapActions: bindActionCreators(mapActions, dispatch),
  journeyActions: bindActionCreators(journeyActions, dispatch),
  jCreateActions: bindActionCreators(jCreateActions, dispatch)
});

class JCreateView extends Base {
  static MAIN_PANEL = 'JCreate_main';
  static GEOINPUT_PANEL = 'JCreate_geoinput';

  constructor(props) {
    super(props);

    this.state = {
      activePanel: JCreateView.MAIN_PANEL,
    };
  }

  openGeoInputPanel = () => {
    this.setState({
      activePanel: JCreateView.GEOINPUT_PANEL,
    })
  };

  closeGeoInputPanel = selectedValue => {
    this.setState({
      activePanel: JCreateView.MAIN_PANEL,
    });
    if (selectedValue) {
      this.props.jCreateActions.updateBody({ point: selectedValue });
    }
  };

  getPointDescription = () => {
    if (!this.props.jCreate.point) { return ''; }
    return this.props.jCreate.point.description;
  };

  render() {
    const osname = platform();

    return (
      <View id={this.props.id} activePanel={ this.state.activePanel }>
        <Panel id={ JCreateView.MAIN_PANEL }>
          <PanelHeader
            left={
              <HeaderButton onClick={this.props.backCallback}>
                {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
              </HeaderButton>
            }
            addon={
              <HeaderButton onClick={this.props.backCallback}>Назад</HeaderButton>}
          >
            Новое путешествие
          </PanelHeader>
          <FormLayout>
            <Input
              readOnly
              selected
              placeholder="Выберите место"
              value={ this.getPointDescription() }
              onClick={ this.openGeoInputPanel }
            />
            <Textarea placeholder="Описание"/>
            <Button size="xl">Создать</Button>
          </FormLayout>
        </Panel>
        <GeoInputPanel
          id={ JCreateView.GEOINPUT_PANEL }
          onSuggestSelectedCallback={ this.closeGeoInputPanel }
          onCancelCallback={ this.closeGeoInputPanel }
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JCreateView);