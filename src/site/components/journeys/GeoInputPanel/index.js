import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'shared/components/Base';

import './styles.scss'
import {
  Panel,
  PanelHeader,
  platform,
  IOS,
  ANDROID,
  HeaderButton,
  Search,
  List,
  Cell
} from "@vkontakte/vkui";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Search from '@vkontakte/icons/dist/24/search';


export default class extends BaseComponent {
  static defaultProps = {
    onCancelCallback: () => {},
    onSuggestSelectedCallback: () => {}
  };

  static propTypes = {
    onCancelCallback: PropTypes.func,
    onSuggestSelectedCallback: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      value: null,
      list: []
    };
  }

  componentWillMount() {
    if (typeof window === 'undefined') {
      return;
    }

    const googleMaps = window.google && window.google.maps;
    if (!googleMaps) {
      return;
    }

    this.googleMaps = googleMaps;
    this.autocompleteService = new googleMaps.places.AutocompleteService();
    this.sessionToken = new googleMaps.places.AutocompleteSessionToken();
    this.geocoder = new googleMaps.Geocoder();
  }

  geocode(placeId) {
    this.setState({
      isLoading: true
    });
    this.geocoder.geocode({placeId}, (results, status) => {
      if (status !== this.googleMaps.GeocoderStatus.OK) {
        this.setState({isLoading: false});
        return;
      }

      const gmaps = results[0];
      const location = gmaps.geometry.location;

      this.setState({
        isLoading: false,
        place: {
          lat: location.lat(),
          lng: location.lng(),
          address: gmaps.formatted_address
        }
      });
    });
  }

  getPlacePredictions = value => {
    this.setState({
      value
    });
    if (value.length < 3) {
      return;
    }
    const options = {
      input: value,
      sessionToken: this.sessionToken,
      types: ['(cities)']
    };

    this.autocompleteService.getPlacePredictions(options, suggests => {
      console.log(suggests);
      this.setState({
        list: suggests || []
      });
    });
  };

  onSuggestSelectedCallback = suggest => () => {
    this.props.onSuggestSelectedCallback(suggest);
  };

  render() {
    const osname = platform();

    return (
      <Panel id={this.props.id}>
        <PanelHeader
          left={
            <HeaderButton onClick={ this.props.onCancelCallback }>
              {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </HeaderButton>
          }
          right={osname === ANDROID &&
          <HeaderButton onClick={this.toggleSearch}><Icon24Search/></HeaderButton>}
        >
          Место
        </PanelHeader>
        <Search
          value={ this.state.value || '' }
          onChange={ this.getPlacePredictions }
        />
        <List>
          {this.state.list.map(item => (
            <Cell
              className="b-geo-cell"
              expandable
              key={item.id}
              onClick={this.onSuggestSelectedCallback(item)}
            >{item.description}</Cell>
          ))}
        </List>
      </Panel>
    );
  }
}
