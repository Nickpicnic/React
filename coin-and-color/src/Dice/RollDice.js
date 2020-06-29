import React, { Component } from 'react';
import Die from './Die';
import './style/RollDice.css';

class RollDice extends Component {
	static defaultProps = {
		numbers: [ 'one', 'two', 'three', 'four', 'five', 'six' ]
	};
	constructor(props) {
		super(props);
		this.getRandomNumber = this.getRandomNumber.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.state = { rolling: false };
	}
	getRandomNumber() {
		return this.props.numbers[Math.floor(Math.random() * 6)];
	}
	handleClick(e) {
		this.setState({ rolling: true });

		setTimeout(() => {
			this.setState({ dieOne: this.getRandomNumber(), dieTwo: this.getRandomNumber(), rolling: false });
		}, 1000);
	}
	render() {
		return (
			<div className="RollDice">
				<div className="RollDice-dice">
					<Die number={this.state.dieOne || this.getRandomNumber()} rolling={this.state.rolling} />
					<Die number={this.state.dieTwo || this.getRandomNumber()} rolling={this.state.rolling} />
				</div>
				<button className="RollDice-button" onClick={!this.state.rolling && this.handleClick}>
					{this.state.rolling ? 'Rolling...' : 'Roll Dice!'}
				</button>
			</div>
		);
	}
}

export default RollDice;
