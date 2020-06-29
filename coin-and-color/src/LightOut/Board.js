import React, { Component } from 'react';
import Cell from './Cell';
import './style/Board.css';

class Board extends Component {
	static defaultProps = {
		nrows: 5,
		ncols: 5,
		chanceLightStartsOn: 0.44
	};
	constructor(props) {
		super(props);
		this.state = {
			hasWon: false,
			board: this.createBoard()
		};
		this.flipCellsAround = this.flipCellsAround.bind(this);
	}

	createBoard() {
		console.log('Creating');
		let board = [];
		for (let row = 0; row < this.props.nrows; row++) {
			board.push([]);
			for (let col = 0; col < this.props.ncols; col++) {
				const lightRandom = Math.random() < this.props.chanceLightStartsOn ? true : false;
				board[row].push(lightRandom);
			}
		}
		return board;
	}

	flipCellsAround(coord) {
		let { ncols, nrows } = this.props;
		let board = this.state.board;
		let [ y, x ] = coord.split('-').map(Number);
		function flipCell(y, x) {
			// if this coord is actually on board, flip it

			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				board[y][x] = !board[y][x];
			}
		}

		const neighbors = [ [ y, x ], [ y - 1, x ], [ y + 1, x ], [ y, x - 1 ], [ y, x + 1 ] ];
		for (let neighbor of neighbors) {
			flipCell(...neighbor);
		}
		const hasWon = this.checkForWin(ncols, nrows);
		this.setState({ board, hasWon });
	}
	checkForWin(y, x) {
		let win = true;
		for (let i = 0; i < y; i++) {
			for (let j = 0; j < x; j++) {
				if (this.state.board[i][j]) {
					win = false;
				}
			}
		}
		return win;
	}

	render() {
		if (!this.state.hasWon)
			return (
				<div className="Board-background">
					<div className="Board-title">
						<div className="neon-orange">Lights</div>
						<div className="neon-blue">Out</div>
					</div>
					<table className="Board">
						<tbody>
							{this.state.board.map((row, rid) => {
								return (
									<tr key={rid}>
										{row.map((col, cid) => {
											const key = '' + rid + '-' + cid;
											return (
												<Cell
													key={key}
													coord={key}
													isLit={col}
													flipCellsAroundMe={this.flipCellsAround}
												/>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			);
		return (
			<div className="Board-background">
				<div className="Board-title">
					<span className="neon-orange">You</span>
					<span className="neon-blue">Won</span>
				</div>
			</div>
		);
	}
}

export default Board;
