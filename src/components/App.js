import React, { Component } from 'react';
import Frame from './Frame';
import FrameAnimator from './FrameAnimator';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
      return (
	      <FrameAnimator 
          total={80}
          fps={24} 
          fileRoot="src/images/CD38" 
          zeroPadding={3}
        >
	      	<Frame/>,
	      </FrameAnimator>
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