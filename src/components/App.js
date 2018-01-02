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
animationTime = ms or infinite
filename
startFrame
endFrame

Animator
starts a timer and every interval sends in a new frame number
to the Frame component which will then display a new frame.
*/