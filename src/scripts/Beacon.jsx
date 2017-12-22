import React from 'react';
import PropTypes from 'prop-types';
import { hexToRGB } from './utils';

let isTouch = false;

if (typeof window !== 'undefined') {
  isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
}

export default class JoyrideBeacon extends React.Component {
  static propTypes = {
    cssPosition: PropTypes.string.isRequired,
    eventType: PropTypes.string.isRequired,
    onTrigger: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired,
    xPos: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    yPos: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  };

  static defaultProps = {
    cssPosition: 'absolute',
    xPos: -1000,
    yPos: -1000
  };

  render() {
    const { cssPosition, eventType, onTrigger, step, xPos, yPos } = this.props;
    const styles = {
      beacon: {
        left: xPos,
        position: cssPosition === 'fixed' ? 'fixed' : 'absolute',
        top: yPos
      },
      inner: {},
      outer: {}
    };
    const stepStyles = step.style || {};
    let rgb;

    if (stepStyles.beacon) {
      if (typeof stepStyles.beacon === 'string') {
        rgb = hexToRGB(stepStyles.beacon);

        styles.inner.backgroundColor = stepStyles.beacon;
        styles.outer = {
          backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
          borderColor: stepStyles.beacon
        };
      }
      else {
        if (stepStyles.beacon.inner) {
          styles.inner.backgroundColor = stepStyles.beacon.inner;
        }

        if (stepStyles.beacon.outer) {
          rgb = hexToRGB(stepStyles.beacon.outer);

          styles.outer = {
            backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`,
            borderColor: stepStyles.beacon.outer
          };
        }
      }
    }

    return (
      <a
        href="#"
        className="joyride-beacon"
        style={styles.beacon}
        onClick={eventType === 'click' || isTouch ? onTrigger : null}
        onMouseEnter={eventType === 'hover' && !isTouch ? onTrigger : null}>
        <span className="joyride-beacon__inner" style={styles.inner} />
        <span className="joyride-beacon__outer" style={styles.outer} />
      </a>
    );
  }
}
