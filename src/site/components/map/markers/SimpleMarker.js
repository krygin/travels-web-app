import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'shared/components/Base';
import { Motion, spring } from 'react-motion';
import './Markers.scss';


export default class extends BaseComponent {
  static propTypes = {
    id: PropTypes.string,
    clickMarkerCallback: PropTypes.func
  };

  static defaultProps = {
    clickMarkerCallback: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      prevScale: 0.75,
      scale: 0.8
    };
  }

  render() {
    const stiffness = 320;
    const damping = 7;
    const precision = 0.001;
    const motion = { stiffness, damping, precision };

    return (
      <Motion
        defaultStyle={ { scale: this.state.prevScale } }
        style={ { scale: spring(this.state.scale, motion) } }
      >
        {
          ({ scale }) =>
            <div
              className="simple-marker"
              style={ { transform: `translate3D(0,0,0) scale(${scale}, ${scale})` } }
              onClick={ () => this.props.clickMarkerCallback(this.props.id) }
            />
        }
      </Motion>
    );
  }
}
