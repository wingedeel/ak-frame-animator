/*
FrameAnimator component

Purpose:


Properties Received:
- Total number of frames

Result:
*/


import React, { Component, cloneElement, Children } from 'react';
import Frame from './Frame';

class FrameAnimator extends React.Component {
	constructor(props) {
	    super(props);

	    this.state = {
	        current: 10,
	        total: this.props.total,
	        fps : this.props.fps,
	        fileRoot: this.props.fileRoot
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
        window.setTimeout(this.loop, Math.round(1000 / this.state.fps));
     }

     getNextNum() {
  		let next = this.state.current;
		if(this.state.current < this.state.total-2) {
			next++;
		}
		 else {
			next = 10;
		}
		return next;
	}

	render() {
		// const animProps = Object.assign( {}, this.props);
		// animProps.filename = this.props.filename,
		// animProps.frame = this.state.current
		// const childrenWithExtraProp = React.Children.map(this.props.children, child => {
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
			<Frame filename={this.state.fileRoot} frame={this.state.current} />
		)
	}
}

export default FrameAnimator;
