import React, { Component } from 'react';
import './style/Box.css';

class Box extends Component {
	render() {
		return (
			<div className="Box-new-box" key={this.props.id}>
				<div
					style={{ width: this.props.width, height: this.props.height, backgroundColor: this.props.color }}
				/>
				<button style={{ width: this.props.width }} onClick={this.props.remove} name={this.props.id}>
					Delete this box
				</button>
			</div>
		);
	}
}

export default Box;
