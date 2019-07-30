import React from 'react';
import Base from 'shared/components/Base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { journeyActions } from 'store/entities/journey';

import {
  Root,
  View,
  ScreenSpinner
} from '@vkontakte/vkui';
import JDetailsPanel from './JDetailsPanel';
import JListPanel from "./JListPanel";
import JMapPanel from "./JMapPanel";
import JCreateView from './JCreateView';
import './JMap.scss';


const mapStateToProps = state => ({
  journey: state.entities.journey
});

const mapDispatchToProps = dispatch => ({
  journeyActions: bindActionCreators(journeyActions, dispatch)
});


class JMap extends Base {
  static MAP_PANEL = "JMap_map";
  static DETAILS_PANEL = "JMap_details";
  static LIST_PANEL = "JMap_list";

  static JOURNEYS_VIEW = "JMap_journeys_view";
  static CREATE_VIEW = "JMap_create_view";

  constructor(props) {
    super(props);

    this.state = {
      activeView: JMap.JOURNEYS_VIEW,
      activePanel: JMap.MAP_PANEL,
      currentJourneyId: null,
      mapCenter: null,
      mapZoom: null
    };
  }

  componentDidMount() {
    this.props.journeyActions.getJourneyList();
  }

  getPopout = () => {
    if (this.props.journey.isListLoading) {
      return <ScreenSpinner/>;
    }
  };

  onItemClick = id => {
    this.setState({
      activePanel: JMap.DETAILS_PANEL,
      currentJourneyId: id
    })
  };

  backCallback = () => {
    this.setState({
      activePanel: JMap.MAP_PANEL,
      currentJourneyId: null
    })
  };

  clickAddCallback = () => {
    this.setState({
      activeView: JMap.CREATE_VIEW
    })
  };

  showMap = journeyId => {
    const state = {
      activeView: JMap.JOURNEYS_VIEW
    };
    if (journeyId) {
      const journey = this.props.journey.journeys[journeyId];
      const routeItem = journey.route_item;
      state.mapCenter = routeItem.point;
      state.mapZoom = 6;
    }
    this.setState(state);
  };

  onListButtonClick = () => {
    this.setState({
      activePanel: JMap.LIST_PANEL,
      currentJourneyId: null
    })
  };

  onMapButtonClick = () => {
    this.setState({
      activePanel: JMap.MAP_PANEL,
      currentJourneyId: null
    })
  };

  onChangeMap = (center, zoom) => {
    this.setState({
      mapCenter: center,
      mapZoom: zoom
    });
  };

  render() {
    const journeys = this.props.journey.filteredJourneyIds.map(id => {
      return this.props.journey.journeys[id];
    });
    return (
      <Root activeView={this.state.activeView}>
        <View
          id={JMap.JOURNEYS_VIEW}
          popout={this.getPopout()}
          activePanel={this.state.activePanel}
        >
          <JMapPanel
            id={JMap.MAP_PANEL}
            journeys={journeys}
            center={this.state.mapCenter}
            zoom={this.state.mapZoom}
            onItemClick={this.onItemClick}
            onListButtonClick={this.onListButtonClick}
            onAddButtonClick={this.clickAddCallback}
            onChangeMap={this.onChangeMap}
          />
          <JDetailsPanel
            id={JMap.DETAILS_PANEL}
            journeyId={this.state.currentJourneyId}
            backCallback={this.backCallback}
          />
          <JListPanel
            id={JMap.LIST_PANEL}
            journeys={journeys}
            onItemClick={this.clickMarkerCallback}
            onMapButtonClick={this.onMapButtonClick}
          />
        </View>
        <JCreateView
          id={JMap.CREATE_VIEW}
          onFinishCallback={this.showMap}
        />
      </Root>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JMap);