import React, { Component, cloneElement, Children } from 'react';
import Frame from './Frame';

class Animator extends React.Component {
	constructor(props) {
	    super(props);

	    this.state = {
	        isActive: true,
	        rafId: 0,
	        lastInvocationMs: 0,
	        current: 10,
	        total: 80,
	        fps : 24
	    };

	    this.loop = this.loop.bind(this);
	    this.endAnimation = this.endAnimation.bind(this);
	    this.getNext = this.getNext.bind(this);
  }

           
	componentDidMount() {
       this.setState({
            rafId: requestAnimationFrame(this.loop)
        });
     }

     componentWillUnmount() {
     	cancelAnimationFrame(this.state.rafId);
     }

     loop(time) {
     	//console.log('loop ', this.state.current);
     	// Call requestAnimationFrame and store the id
     	// Needed for when we want to cancel requestAnimationFrame
     	//this.setState({ lastInvocationMs: time });
        //this.props.children.onAnimationFrame(time);
        this.setState({ current: this.getNext()})
           
        //this.setState({
        //    rafId: requestAnimationFrame(this.loop)
        //});

        window.setTimeout(this.loop, Math.round(1000 / this.state.fps));
     }

     getNext() {
  		let next = this.state.current;
		if(this.state.current < this.state.total-2) {
			next++;
		}
		 else {
			next = 10;
		}
		return next;
	}

     endAnimation() {
     	// Cancels an animation frame request previously scheduled 
     	// through a call to window.requestAnimationFrame().
        cancelAnimationFrame(this.state.rafId);
        this.setState({
        	isActive: false
        });
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
		return (
			<Frame filename="CD38" frame={this.state.current} />
		)
	}
}

export default Animator;
