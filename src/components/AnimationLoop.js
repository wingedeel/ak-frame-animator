/*
FrameAnimator component

Purpose:


Properties Received:
- Total number of frames

Result:
*/


import React, { Component, cloneElement, Children } from 'react';
import Frame from './Frame';

class AnimationLoop extends React.Component {
	constructor(props) {
	    super(props);

	    this.state = {
	    	isActive:true,
	        current: this.props.min
	    };

	    this.loop = this.loop.bind(this);
	    this.getNextNum = this.getNextNum.bind(this);
  }

           
	componentDidMount() {
       this.loop();
     }

     componentWillUnmount() {
     }

     loop(time) {
        this.setState({ current: this.getNextNum()})
        window.setTimeout(this.loop, Math.round(1000 / this.props.fps));
     }

     getNextNum() {
  		let next = this.state.current;
		if(this.state.current < this.props.max) {
			next++;
		}
		 else {
			next = this.props.min;
		}
		return next;
	}

	render() {
		// const animProps = Object.assign( {}, this.props);
		// animProps.filename = this.props.filename,
		// animProps.frame = this.state.current
		//const childrenWithExtraProp = React.Children.map(this.props.children, child => {
	 //      return React.cloneElement(child, {
	 //        frame: this.state.current
	 //      });
	 //    });

		// return (
		// 	<div>{childrenWithExtraProp}</div>
		// );
		// return (
		// 	<div>{this.props.children}</div>
		// )
		// return (
		// 	 {this.props.children.map((menuItem, index) => {
  //          		return <Frame frame={this.state.current} />
  //       	})}
		// )
		// Display the image for the current frame
		return (
			<Frame 
				filename={this.props.fileRoot}  
				pad={this.props.pad}
				frame={this.state.current}
			/>
		)
	}
}


/**
 * Define JSON schema for editing
 * @type {Object}
 */
AnimationLoop.schema = {
  title: 'AnimationLoop',
  type: 'object',
  properties: {
    min: {
      type: 'number',
    },
    max: {
      type: 'number',
    },
  },
  required: [],
};

export default AnimationLoop;


//--------------------------------------------
// import React from 'react';


// const InteractiveContainer = props => <div id={props.blockId}>{props.children}</div> || null;

// InteractiveContainer.config = {
//   interactive: true,
// };

// InteractiveContainer.schema = {
//   title: 'Interactive Container',
//   type: 'object',
//   properties: {

//   },
// };

// export default InteractiveContainer;

