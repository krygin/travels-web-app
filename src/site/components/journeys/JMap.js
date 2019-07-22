import React from 'react';
import Base from 'shared/components/Base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {mapActions} from 'site/components/map/redux';
import {journeyActions} from 'store/entities/journey';
import {View, ScreenSpinner, Panel, Button, FixedLayout} from '@vkontakte/vkui';
import JDetailsPanel from './JDetailsPanel';
import JListPanel from "./JListPanel";
import JMapPanel from "./JMapPanel";

const mapStateToProps = state => ({
    journey: state.entities.journey
});

const mapDispatchToProps = dispatch => ({
    journeyActions: bindActionCreators(journeyActions, dispatch)
});


class JMap extends Base {
    static MAP_PANEL = "map";
    static DETAILS_PANEL = "details";
    static LIST_PANEL = "list";

    constructor(props) {
        super(props);

        this.state = {
            activePanel: JMap.MAP_PANEL,
            journeys: [],
            currentJourneyId: null
        };
    }

    componentDidMount() {
        this.props.journeyActions.getJourneyList().then(() => {
        });
    }

    getPopout = () => {
        if (this.props.journey.isMapLoading) {
            return <ScreenSpinner/>;
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

    render() {
        console.log(this.state.currentJourneyId);
        return (
            <View popout={this.getPopout()} activePanel={this.state.activePanel}>
                <JMapPanel id={JMap.MAP_PANEL} onItemClick={this.clickMarkerCallback}
                           onListButtonClick={this.onListButtonClick} journey={{
                    journeys: [],
                    filteredJourneyIds: []
                }}/>
                <JListPanel id={JMap.LIST_PANEL} onItemClick={this.clickMarkerCallback}
                            onMapButtonClick={this.onMapButtonClick}/>
                <JDetailsPanel
                    id={JMap.DETAILS_PANEL}
                    journeyId={this.state.currentJourneyId}
                    backCallback={this.backCallback}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JMap);