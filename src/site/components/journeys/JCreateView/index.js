import React from 'react';
import PropTypes from "prop-types";
import Base from 'shared/components/Base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {dateToString} from 'shared/utils/helpers';
import './styles.scss';
import config from 'shared/config';

import {actions as geoActions} from 'store/entities/geo';
import {
  actions as jCreateActions,
  defaultState as jCreateDefaultState
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
  HeaderButton,
  Spinner,
  FormStatus
} from "@vkontakte/vkui";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import GeoInputPanel from 'site/components/journeys/GeoInputPanel';
import Calendar from 'react-calendar';
import MilestonesPanel from 'site/components/journeys/MilestonesPanel';


const mapStateToProps = state => ({
  journey: state.entities.journey,
  jCreate: state.site.jCreate
});

const mapDispatchToProps = dispatch => ({
  journeyActions: bindActionCreators(journeyActions, dispatch),
  jCreateActions: bindActionCreators(jCreateActions, dispatch),
  geoActions: bindActionCreators(geoActions, dispatch)
});

class JCreateView extends Base {
  static MAIN_PANEL = 'JCreate_main';
  static GEOINPUT_PANEL = 'JCreate_geoinput';
  static CALENDAR_PANEL = 'JCreate_calendar';
  static MILESTONES_PANEL = 'JCreate_milestones';

  static defaultProps = {
    onFinishCallback: () => {}
  };

  static propTypes = {
    onFinishCallback: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null,
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
      this.props.jCreateActions.updateBody({point: selectedValue});
    }
  };

  getPointDescription = () => {
    if (!this.props.jCreate.point) {
      return '';
    }
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
      this.props.jCreateActions.updateBody({dates: selectedValue});
    }
  };

  convertDates = () => {
    const dates = this.props.jCreate.dates;
    if (!dates) {
      return '';
    }
    return `${dateToString(dates[0].getTime())} - ${dateToString(dates[1].getTime())}`;
  };

  changeDescription = e => {
    this.props.jCreateActions.updateBody({description: e.target.value});
  };

  validateForm = () => {
    let error = null;
    if (!this.props.jCreate.point) {
      error = 'Выберете, пожалуйста, куда собираетесь ехать';
    } else if (!this.props.jCreate.dates) {
      error = 'Выберете, пожалуйста, дату, в которую планируете поездку';
    }
    if (error) {
      this.setState({error});
    }
    return error === null;
  };

  create = async () => {
    if (!this.validateForm()) {
      return;
    }
    this.setState({
      isLoading: true,
      error: null
    });

    const point = this.props.jCreate.point;
    let res = await this.props.geoActions.createPosition(
      point.location, point.place_id, point.description
    );
    if (!res.payload) {
      this.setState({
        isLoading: false,
        error: config.fatalError
      });
      return;
    }

    const dates = this.props.jCreate.dates;
    const begin = dateToString(dates[0].getTime(), true);
    const end = dateToString(dates[1].getTime(), true);
    const description = this.props.jCreate.description;
    res = await this.props.journeyActions.createJourney(
      res.payload.id, begin, end, description
    );
    if (!res.payload) {
      this.setState({
        isLoading: false,
        error: config.fatalError
      });
    }

    this.props.jCreateActions.updateBody({id: res.payload.id});
    this.setState({
      isLoading: false,
      activePanel: JCreateView.MILESTONES_PANEL
    });
  };

  finish = () => {
    const journeyId = this.props.jCreate.id;
    this.props.jCreateActions.updateBody(jCreateDefaultState);
    this.props.onFinishCallback(journeyId)
  };

  render() {
    const osname = platform();

    return (
      <View id={this.props.id} activePanel={this.state.activePanel}>
        <Panel id={JCreateView.MAIN_PANEL}>
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.props.onFinishCallback()}>
                {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
              </HeaderButton>
            }
            addon={
              <HeaderButton
                onClick={() => this.props.onFinishCallback()}>Назад</HeaderButton>}
          >
            Новое путешествие
          </PanelHeader>
          <FormLayout>
            { this.state.error &&
              <FormStatus title="Ошибка" state="error">{ this.state.error }</FormStatus>
            }
            <Input
              readOnly
              placeholder="Выберите место"
              value={this.getPointDescription()}
              onClick={this.openGeoInputPanel}
            />
            <Input
              readOnly
              placeholder="Укажите дату"
              value={this.convertDates()}
              onClick={this.openCalendarPanel}
            />
            <Textarea
              placeholder="Описание"
              value={this.props.jCreate.description || ''}
              onChange={this.changeDescription}
            />
            <Button size="xl" onClick={this.create}>Создать</Button>
            {this.state.isLoading && <Spinner size="regular"/>}
          </FormLayout>
        </Panel>
        <GeoInputPanel
          id={JCreateView.GEOINPUT_PANEL}
          onSuggestSelectedCallback={this.closeGeoInputPanel}
          onCancelCallback={this.closeGeoInputPanel}
        />
        <Panel id={JCreateView.CALENDAR_PANEL}>
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.closeCalendarPanel()}>
                {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
              </HeaderButton>
            }
            addon={
              <HeaderButton
                onClick={() => this.closeCalendarPanel()}>Назад</HeaderButton>}
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
            onChange={this.closeCalendarPanel}
            value={this.props.jCreate.dates}
          />
        </Panel>
        <MilestonesPanel
          id={JCreateView.MILESTONES_PANEL}
          journeyId={ this.props.jCreate.id }
          onSkipCallback={ this.finish }
          onFinishCallback={ this.finish }
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JCreateView);