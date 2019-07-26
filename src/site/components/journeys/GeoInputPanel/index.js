import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'shared/components/Base';

import './styles.scss'
import {
  Cell,
  HeaderButton,
  IOS,
  List,
  Panel,
  PanelHeader,
  platform,
  Search,
  Spinner
} from "@vkontakte/vkui";
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';


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
      isLoadingItem: null,
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

    const timeout = setTimeout(() => {
      this.setState({isLoading: true});
    }, 200);
    this.autocompleteService.getPlacePredictions(options, suggests => {
      clearTimeout(timeout);
      this.setState({
        isLoading: false,
        list: suggests || []
      });
    });
  };

  onSuggestSelectedCallback = suggest => () => {
    const placeId = suggest.place_id;
    this.setState({isLoadingItem: placeId});
    this.geocoder.geocode({placeId}, (results, status) => {
      this.setState({isLoadingItem: null});
      if (status !== this.googleMaps.GeocoderStatus.OK) {
        return;
      }
      const gmaps = results[0];
      const location = gmaps.geometry.location;
      suggest.location = {lat: location.lat(), lng: location.lng()};
      this.props.onSuggestSelectedCallback(suggest);
    });
  };

  render() {
    const osname = platform();

    return (
      <Panel id={this.props.id}>
        <PanelHeader
          left={
            <HeaderButton onClick={ () => this.props.onCancelCallback() }>
              {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </HeaderButton>
          }
          addon={
            <HeaderButton onClick={ () => this.props.onCancelCallback() }>Назад</HeaderButton>
          }
        >
          Место
        </PanelHeader>
        <Search
          value={ this.state.value || '' }
          onChange={ this.getPlacePredictions }
        />
        { this.state.isLoading && <Spinner className="b-geo-spinner" size="regular"/> }
        <List>
          {this.state.list.map(item => (
            <Cell
              className="b-geo-cell"
              expandable
              asideContent={
                item.place_id === this.state.isLoadingItem ?
                <Spinner size="regular"/> : null
              }
              key={item.id}
              onClick={this.onSuggestSelectedCallback(item)}
            >{item.description}</Cell>
          ))}
        </List>
      </Panel>
    );
  }
}
