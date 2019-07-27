import React from 'react'
import PropTypes from 'prop-types';

import Map from 'site/components/map/Map';
import {
  Panel,
  FixedLayout,
  Button,
  PanelHeader,
  HeaderButton
} from "@vkontakte/vkui";
import Icon24Add from '@vkontakte/icons/dist/24/add';


const JMapPanel = (props) => {
  const points = props.journeys.map(item => {
    const routeItem = item.route_item;
    return {
      id: item.id,
      location: routeItem.point
    }
  });

  return (
    <Panel id={props.id}>
      <PanelHeader
        noShadow
        left={
          <HeaderButton onClick={props.onAddButtonClick} key="add"><Icon24Add/></HeaderButton>
        }
      >
        Карта
      </PanelHeader>
      <div className="b-map">
        <Map
          clickMarkerCallback={props.onItemClick}
          points={points}
        />
      </div>
      <FixedLayout vertical="bottom">
        <Button onClick={props.onListButtonClick} style={{
          display: `block`,
          marginLeft: `auto`,
          marginRight: `auto`,
          marginBottom: `12px`
        }}>Список</Button>
      </FixedLayout>
    </Panel>
  );
};

JMapPanel.defaultProps = {
  onItemClick: () => {},
  onListButtonClick: () => {},
  onAddButtonClick: () => {}
};

JMapPanel.propTypes = {
  id: PropTypes.string.isRequired,
  journeys: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
  onListButtonClick: PropTypes.func,
  onAddButtonClick: PropTypes.func,
};

export default JMapPanel;