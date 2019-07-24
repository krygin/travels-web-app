import React from 'react';
import Base from 'shared/components/Base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Map from 'site/components/map/Map';
import { mapActions } from 'site/components/map/redux';
import { journeyActions } from 'store/entities/journey';
import {
  Root,
  View,
  ScreenSpinner,
  Panel,
  PanelHeader,
  HeaderButton
} from '@vkontakte/vkui';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import JDetails from './JDetails';
import JCreateView from './JCreateView';
import './JMap.scss';


const mapStateToProps = state => ({
  journey: state.entities.journey
});

const mapDispatchToProps = dispatch => ({
  mapActions: bindActionCreators(mapActions, dispatch),
  journeyActions: bindActionCreators(journeyActions, dispatch)
});

class JMap extends Base {
  static MAP_PANEL = "JMap_map";
  static DETAILS_PANEL = "JMap_details";

  static JOURNEYS_VIEW = "JMap_journeys_view";
  static CREATE_VIEW = "JMap_create_view";

  constructor(props) {
    super(props);

    this.state = {
      activeView: JMap.JOURNEYS_VIEW,
      activePanel: JMap.MAP_PANEL,
      currentJourneyId: null
    };
  }

  componentDidMount() {
    this.props.journeyActions.getJourneyList().then(() => {
      const points = this.props.journey.mapJourneyIds.map(id => {
        const item = this.props.journey.journeys[id];
        const routeItem = item.route_item;
        return {
          id: id,
          location: routeItem.point
        }
      });
      this.props.mapActions.setPointList(points);
    });
  }

  getPopout = () => {
    if (this.props.journey.isMapLoading) {
      return <ScreenSpinner />;
    }
  };

  clickMarkerCallback = id => {
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

  render() {
    return (
      <Root activeView={ this.state.activeView }>
        <View
          id={ JMap.JOURNEYS_VIEW }
          popout={ this.getPopout() }
          activePanel={ this.state.activePanel }
        >
          <Panel id={ JMap.MAP_PANEL }>
            <div className="b-map">
              <PanelHeader
                noShadow
                left={ <HeaderButton onClick={this.clickAddCallback} key="add"><Icon24Add/></HeaderButton> }
              >Карта</PanelHeader>
              <Map clickMarkerCallback={ this.clickMarkerCallback }/>
            </div>
          </Panel>
          <JDetails
            id={ JMap.DETAILS_PANEL }
            journeyId={ this.state.currentJourneyId }
            backCallback={ this.backCallback }
          />
        </View>
        <JCreateView id={ JMap.CREATE_VIEW }/>
      </Root>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JMap);