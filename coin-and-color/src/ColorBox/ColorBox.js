import React, { Component } from 'react';
import Color from './Color';
import { pickRGB } from './helpers';
import './style/ColorBox.css';

class ColorBox extends Component {
	static defaultProps = {
		nColors: 16
	};
	constructor(props) {
		super(props);
		this.state = {
			colors: Array.from({ length: 16 }, () => pickRGB())
		};
		this.handleClick = this.handleClick.bind(this);
	}
	updateColors(id) {
		this.setState((curSt) => {
			const newColors = { colors: [] };
			newColors.colors = curSt.colors.map((col, i) => {
				if (i == id) col = pickRGB();
				return col;
			});
			return newColors;
		});
	}
	handleClick(id) {
		this.updateColors(id);
	}
	render() {
		return (
			<div className="ColorBox">
				{this.state.colors.map((color, idx) => {
					return (
						<div className="ColorBox-color" key={idx} onClick={() => this.handleClick(idx)}>
							<Color rgb={{ r: color.r, g: color.g, b: color.b }} />
						</div>
					);
				})}
			</div>
		);
	}
}

export default ColorBox;
