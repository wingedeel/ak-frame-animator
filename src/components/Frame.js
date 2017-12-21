import React from 'react';

const Frame = ({ filename, frame }) => {
  // Base URL
  const base = 'http://localhost:8080/src/images/';
  const file = filename + '-000' + frame + '.jpg';
  const imgSrc = base + file;

  console.log('imgSrc', imgSrc);
  
  return (
    <div>
      <img src={imgSrc} />
    </div>
  );
};



export default Frame;
