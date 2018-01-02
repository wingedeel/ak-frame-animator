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
  //const base = window.location.port === 3010 ?
  //  'http://localhost:3000/' : '';
  const base = 'http://localhost:8080/';

  //const base = 'http://localhost:8080/src/images/';
  const file = filename + '-000' + frame + '.jpg';
  const imgSrc = base + file;

  
 
  // Zero pad
  const framePadded = zeroPadding ? String(frame).padStart(zeroPadding, '0') : frame;
  //const imgSrc = base + filename.replace('${i}', framePadded);

  if (frame === 20) {
    console.log('base',  base);
    console.log('filename', filename);
    console.log('frame', frame);
    console.log('framePadded ', framePadded);
     console.log('imgSrc', imgSrc);
  }

  return (
    <div>
      <img src={imgSrc} />
    </div>
  );
};



export default Frame;
