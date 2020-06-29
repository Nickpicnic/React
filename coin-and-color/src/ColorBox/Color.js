import React, { Component } from 'react';
import './style/Color.css';

class Color extends Component {
	render() {
		const { r, g, b } = this.props.rgb;
		return <div className="Color" style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }} />;
	}
}

export default Color;
