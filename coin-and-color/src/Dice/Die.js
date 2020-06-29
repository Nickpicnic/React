import React, { Component } from 'react';
import './style/Die.css';

class Die extends Component {
	render() {
		return <i className={`Die fas fa-dice-${this.props.number} ${this.props.rolling && 'shaking'}`} />;
	}
}

export default Die;
