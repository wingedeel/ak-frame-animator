import React, { Component } from 'react';
import Frame from './Frame';
import AnimationLoop from './AnimationLoop';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
      return (
	      <AnimationLoop
          min={1} 
          max={80}
          fileRoot="src/assets/img/page4-1-3/CD38/CD38-${i}.jpg" 
          pad={5}
          fps={24} 
        >
	      	<Frame/>,
	      </AnimationLoop>
      )
  }
}

export default App;


/*
Component behaviour:
starts a timer and every interval sends in a new frame number
to the Frame component which will then display a new frame.

Properties:
min={1}   // number of first frame
max={80}  // number of last frame 
fileRoot="src/assets/img/page4-1-3/CD38/CD38-${i}.jpg" // 'root'filename/url
pad={5}   // how many numbers will be in filename, including numbers
fps={24}  // frames per second. how fast to play animation. 

*/