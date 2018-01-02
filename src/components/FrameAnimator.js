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
			<Frame 
				filename={this.props.fileRoot}  
				zeroPadding={this.props.zeroPadding}
				frame={this.state.current}
			/>
		)
	}
}

export default FrameAnimator;
