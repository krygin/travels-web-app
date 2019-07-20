import React from 'react';
import Base from 'shared/components/Base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Map from 'site/components/map/Map';
import { mapActions } from 'site/components/map/redux';
import { journeyActions } from 'store/entities/journey';
import { View, ScreenSpinner, Panel } from '@vkontakte/vkui';
import JDetails from './JDetails';


const mapStateToProps = state => ({
  journey: state.entities.journey
});

const mapDispatchToProps = dispatch => ({
  mapActions: bindActionCreators(mapActions, dispatch),
  journeyActions: bindActionCreators(journeyActions, dispatch)
});

class JMap extends Base {
  static MAP_PANEL = "map";
  static DETAILS_PANEL = "details";

  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    console.log(this.state.currentJourneyId);
    return (
      <View popout={ this.getPopout() } activePanel={ this.state.activePanel }>
        <Panel id={ JMap.MAP_PANEL }>
          <Map clickMarkerCallback={ this.clickMarkerCallback }/>
        </Panel>
        <JDetails
          id={ JMap.DETAILS_PANEL }
          journeyId={ this.state.currentJourneyId }
          backCallback={ this.backCallback }
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JMap);