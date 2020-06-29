import React, { Component } from 'react';
import { randomWord } from './words';
import './style/Hangman.css';
import img0 from './src/0.jpg';
import img1 from './src/1.jpg';
import img2 from './src/2.jpg';
import img3 from './src/3.jpg';
import img4 from './src/4.jpg';
import img5 from './src/5.jpg';
import img6 from './src/6.jpg';

class Hangman extends Component {
	/** by default, allow 6 guesses and use provided gallows images. */
	static defaultProps = {
		maxWrong: 6,
		images: [ img0, img1, img2, img3, img4, img5, img6 ]
	};

	constructor(props) {
		super(props);
		this.state = { nWrong: 0, guessed: new Set(), answer: randomWord(), winGame: false };
		this.handleGuess = this.handleGuess.bind(this);
		this.winGame = this.winGame.bind(this);
		this.restartHandler = this.restartHandler.bind(this);
	}

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord() {
		return this.state.answer.split('').map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'));
	}

	/** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	handleGuess(evt) {
		let ltr = evt.target.value;
		this.setState((st) => ({
			guessed: st.guessed.add(ltr),
			nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
		}));
	}

	/** generateButtons: return array of letter buttons to render */
	generateButtons() {
		return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
			<button value={ltr} key={ltr} onClick={this.handleGuess} disabled={this.state.guessed.has(ltr)}>
				{ltr}
			</button>
		));
	}
	loseGame() {
		return (
			<div>
				<p>
					It was: <h3>{this.state.answer}</h3>
				</p>
				<button className="Hangman-btns restart" onClick={this.restartHandler}>
					Restart...
				</button>
			</div>
		);
	}
	winGame() {
		let win = 1;
		this.state.answer.split('').map((l) => {
			if (!this.state.guessed.has(l)) win = 0;
		});
		return win;
	}
	restartHandler() {
		this.setState((st) => {
			return { nWrong: 0, guessed: new Set(), answer: randomWord(), winGame: false };
		});
	}

	/** render: render game */
	render() {
		return (
			<div className="Hangman">
				<h1>Hangman</h1>
				{this.state.nWrong < this.props.maxWrong ? (
					<img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/6`} />
				) : (
					<h1>YOU LOSE</h1>
				)}
				<p>Number wrong: {this.state.nWrong}</p>
				<p className="Hangman-word">{this.guessedWord()}</p>
				{this.state.nWrong >= 6 && this.loseGame()}
				{this.state.nWrong < 6 && !this.winGame() ? (
					<p className="Hangman-btns">{this.generateButtons()}</p>
				) : this.winGame() ? (
					<div>
						<h2>Congrats!</h2>
						<h1>YOU WIN!!!</h1>
						<button className="Hangman-btns restart" onClick={this.restartHandler}>
							Restart...
						</button>
					</div>
				) : null}
			</div>
		);
	}
}

export default Hangman;
