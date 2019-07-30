import React from 'react';
import Base from 'shared/components/Base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { journeyActions } from 'store/entities/journey';
import {
  actions as stateActions,
  DETAILS_PANEL,
  MAP_PANEL,
  CREATE_VIEW,
  JOURNEYS_VIEW,
  LIST_PANEL
} from './redux';

import {
  Root,
  View,
  ScreenSpinner
} from '@vkontakte/vkui';
import JDetailsPanel from './JDetailsPanel';
import JListPanel from "./JListPanel";
import JMapPanel from "./JMapPanel";
import JCreateView from './JCreateView';
import './styles.scss';


const mapStateToProps = state => ({
  journey: state.entities.journey,
  state: state.site.journeys,
});

const mapDispatchToProps = dispatch => ({
  journeyActions: bindActionCreators(journeyActions, dispatch),
  stateActions: bindActionCreators(stateActions, dispatch),
});


class Journeys extends Base {
  componentDidMount() {
    if (!this.props.state.isListLoaded) {
      this.props.journeyActions.getJourneyList().then(() => {
        this.props.stateActions.update({
          isListLoaded: true
        })
      });
    }
  }

  getPopout = () => {
    if (this.props.journey.isListLoading) {
      return <ScreenSpinner/>;
    }
  };

  onItemClick = id => {
    this.props.stateActions.update({
      activePanel: DETAILS_PANEL,
      currentJourneyId: id
    })
  };

  backCallback = () => {
    this.props.stateActions.update({
      activePanel: MAP_PANEL,
      currentJourneyId: null
    })
  };

  clickAddCallback = () => {
    this.props.stateActions.update({
      activeView: CREATE_VIEW
    })
  };

  showMap = journeyId => {
    const state = {
      activeView: JOURNEYS_VIEW
    };
    if (journeyId) {
      const journey = this.props.journey.journeys[journeyId];
      const routeItem = journey.route_item;
      state.mapCenter = routeItem.point;
      state.mapZoom = 6;
    }
    this.props.stateActions.update(state);
  };

  onListButtonClick = () => {
    this.props.stateActions.update({
      activePanel: LIST_PANEL,
      currentJourneyId: null
    })
  };

  onMapButtonClick = () => {
    this.props.stateActions.update({
      activePanel: MAP_PANEL,
      currentJourneyId: null
    })
  };

  onChangeMap = (center, zoom) => {
    this.props.stateActions.update({
      mapCenter: center,
      mapZoom: zoom
    });
  };

  render() {
    const journeys = this.props.journey.filteredJourneyIds.map(id => {
      return this.props.journey.journeys[id];
    });
    const state = this.props.state;

    return (
      <Root activeView={state.activeView}>
        <View
          id={JOURNEYS_VIEW}
          popout={this.getPopout()}
          activePanel={state.activePanel}
        >
          <JMapPanel
            id={MAP_PANEL}
            journeys={journeys}
            center={state.mapCenter}
            zoom={state.mapZoom}
            onItemClick={this.onItemClick}
            onListButtonClick={this.onListButtonClick}
            onAddButtonClick={this.clickAddCallback}
            onChangeMap={this.onChangeMap}
          />
          <JDetailsPanel
            id={DETAILS_PANEL}
            journeyId={state.currentJourneyId}
            backCallback={this.backCallback}
          />
          <JListPanel
            id={LIST_PANEL}
            journeys={journeys}
            onItemClick={this.clickMarkerCallback}
            onMapButtonClick={this.onMapButtonClick}
          />
        </View>
        <JCreateView
          id={CREATE_VIEW}
          onFinishCallback={this.showMap}
        />
      </Root>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Journeys);