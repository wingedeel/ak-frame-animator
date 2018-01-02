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

const Frame = ({ filename, frame, zeroPadding }) => {
  // Base URL
  const base = 'http://localhost:8080/';

  // Zero pad
  const framePadded = zeroPadding ? String(frame).padStart(zeroPadding, '0') : frame;
  const imgSrc = base + filename.replace('${i}', framePadded);

  return (
    <div>
      <img src={imgSrc} />
    </div>
  );
};



export default Frame;
