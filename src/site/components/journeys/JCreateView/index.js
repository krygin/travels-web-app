import React from 'react';
import Base from 'shared/components/Base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {convertDateToString} from 'shared/utils/helpers';
import './styles.scss';

import {mapActions} from 'site/components/map/redux';
import {actions as geoActions} from 'store/entities/geo';
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
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import GeoInputPanel from 'site/components/journeys/GeoInputPanel';
import Calendar from 'react-calendar'


const mapStateToProps = state => ({
  journey: state.entities.journey,
  jCreate: state.site.jCreate
});

const mapDispatchToProps = dispatch => ({
  mapActions: bindActionCreators(mapActions, dispatch),
  journeyActions: bindActionCreators(journeyActions, dispatch),
  jCreateActions: bindActionCreators(jCreateActions, dispatch),
  geoActions: bindActionCreators(geoActions, dispatch)
});

class JCreateView extends Base {
  static MAIN_PANEL = 'JCreate_main';
  static GEOINPUT_PANEL = 'JCreate_geoinput';
  static CALENDAR_PANEL = 'JCreate_calendar';

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

  openCalendarPanel = () => {
    this.setState({
      activePanel: JCreateView.CALENDAR_PANEL,
    })
  };

  closeCalendarPanel = selectedValue => {
    this.setState({
      activePanel: JCreateView.MAIN_PANEL,
    });
    if (selectedValue) {
      this.props.jCreateActions.updateBody({ dates: selectedValue });
    }
  };

  convertDates = () => {
    const dates = this.props.jCreate.dates;
    if (!dates) { return ''; }
    const begin = convertDateToString(dates[0]);
    const end = convertDateToString(dates[1]);
    return `${begin} - ${end}`;
  };

  changeDescription = e => {
    this.props.jCreateActions.updateBody({ description: e.target.value });
  };

  create = async () => {
    const point = this.props.jCreate.point;
    let res = await this.props.geoActions.createPosition(
      point.location, point.place_id, point.description
    );
    const dates = this.props.jCreate.dates;
    const begin = convertDateToString(dates[0], true);
    const end = convertDateToString(dates[1], true);
    const description = this.props.jCreate.description;
    await this.props.journeyActions.createJourney(
      res.payload.id, begin, end, description
    );
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
              placeholder="Выберите место"
              value={ this.getPointDescription() }
              onClick={ this.openGeoInputPanel }
            />
            <Input
              readOnly
              placeholder="Укажите дату"
              value={ this.convertDates() }
              onClick={ this.openCalendarPanel }
            />
            <Textarea
              placeholder="Описание"
              value={ this.props.jCreate.description || '' }
              onChange={ this.changeDescription }
            />
            <Button size="xl" onClick={ this.create }>Создать</Button>
          </FormLayout>
        </Panel>
        <GeoInputPanel
          id={ JCreateView.GEOINPUT_PANEL }
          onSuggestSelectedCallback={ this.closeGeoInputPanel }
          onCancelCallback={ this.closeGeoInputPanel }
        />
        <Panel id={ JCreateView.CALENDAR_PANEL }>
          <PanelHeader
            left={
              <HeaderButton onClick={ () => this.closeCalendarPanel() }>
                {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
              </HeaderButton>
            }
            addon={
              <HeaderButton onClick={ () => this.closeCalendarPanel() }>Назад</HeaderButton>}
          >
            Даты (от - до)
          </PanelHeader>
          <Calendar
            className="b-calendar"
            selectRange={true}
            prev2Label={null}
            next2Label={null}
            prevLabel={<Icon24BrowserBack/>}
            nextLabel={<Icon24BrowserForward/>}
            onChange={ this.closeCalendarPanel }
            value={ this.props.jCreate.dates }
          />
        </Panel>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JCreateView);