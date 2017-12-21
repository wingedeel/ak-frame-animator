import React from 'react';
import './styles.scss';

const FrameAnimator = ({ min, max, filename, pad, blockId, interactive }) => {
  // Base URL
  const base = window.location.port === 3010 ?
    'http://localhost:3000/' : '';

  const range = max - min;

  // Get current frame number
  const frame = Math.round(min + (interactive.state.positionX * range)) || min;

  // Zero pad
  const framePadded = pad ? String(frame).padStart(pad, '0') : frame;
  const imgSrc = base + filename.replace('${i}', framePadded);

  return (<div className="frame-animator" id={blockId}>
    <img src={imgSrc} className="frame-animator__image" />
  </div>);
};


/**
 * Define JSON schema for editing
 * @type {Object}
 */
FrameAnimator.schema = {
  title: 'FrameAnimator',
  type: 'object',
  properties: {
    min: {
      type: 'number',
    },
    max: {
      type: 'number',
    },
    filename: {
      type: 'string',
    },
    pad: {
      title: 'Zero Padding',
      type: 'number',
    },
  },
  required: [],
};

export default FrameAnimator;
