/*
Purpose:
This component displays 1 image.

Properties Received:
We send in the following properties:
- root filename
- the frame number

Result:
We use these properties to ascertain which image to display.


*/

import React from 'react';
import {padStart} from 'lodash';

//const FrameAnimator = ({ min, max, filename, pad, blockId, interactive }) => {
const Frame = ({ filename, pad, frame, blockId }) => {
  // Base URL
  const base = 'http://localhost:8080/';

  // Zero pad
  const framePadded = pad ? String(frame).padStart(pad, '0') : frame;
  const imgSrc = base + filename.replace('${i}', framePadded);

  return (
    <div className="frame" id={blockId}>
      <img className="img" src={imgSrc} />
    </div>
  );
};

/**
 * Define JSON schema for editing
 * @type {Object}
 */
Frame.schema = {
  title: 'Frame',
  type: 'object',
  properties: {
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

export default Frame;
