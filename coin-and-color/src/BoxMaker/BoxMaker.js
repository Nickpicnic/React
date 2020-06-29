import React, { Component } from 'react';
import BoxForm from './BoxForm';
import Box from './Box';

class BoxMaker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: '',
			width: '',
			color: '',
			boxes: [],
			idCounter: 0
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}
	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}
	handleSubmit(evt) {
		evt.preventDefault();
		const height = this.state.height + 'px',
			width = this.state.width + 'px',
			color = this.state.color;
		// const nBox = (
		// 	<Box
		// 		key={this.state.idCounter}
		// 		width={width}
		// 		height={height}
		// 		color={color}
		// 		id={this.state.isCounter}
		// 		remove={this.handleRemove}
		// 	/>
		// );
		const newBox = (
			<div className="BoxForm-new-box" key={this.state.idCounter}>
				<div style={{ width: width, height: height, backgroundColor: color }} />
				<button style={{ width: width }} onClick={this.handleRemove} name={this.state.idCounter}>
					Delete this box
				</button>
			</div>
		);
		this.setState((st) => {
			return {
				height: '',
				width: '',
				color: '',
				boxes: [ ...st.boxes, newBox ],
				idCounter: st.idCounter + 1
			};
		});
	}
	handleRemove(evt) {
		const name = evt.target.name;
		this.setState((st) => {
			return { boxes: st.boxes.filter((box) => box.key != name) };
		});
	}
	render() {
		return (
			<div>
				<h1>Box Maker Thingy</h1>
				<BoxForm
					height={this.state.height}
					width={this.state.width}
					color={this.state.color}
					change={this.handleChange}
					submit={this.handleSubmit}
				/>
				{this.state.boxes.map((box) => {
					return box;
				})}
			</div>
		);
	}
}

export default BoxMaker;
