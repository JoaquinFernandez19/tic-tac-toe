//Game board
const gameBoard = (function() {
	'use strict';
	//Factory function
	const dataFactory = (position, value) => {
		return { position, value };
	};
	//html elements
	const container = document.querySelector('.game-container');
	const boxes = document.querySelectorAll('.game-container__box');
	const newGame = document.querySelector('.game-btns__new-gameBtn');
	let message = document.querySelector('h2');
	let objectsArray = [];
	let turn = 'X';
	//Event listeners
	newGame.addEventListener('click', clear);
	container.addEventListener('click', printer);
	//functions
	function clear() {
		location.reload();
	}
	function printer(e) {
		let target = e.target;
		let value = e.target.getAttribute('value');
		if ((turn === 'X' || turn === 'X') && target.textContent === '') {
			target.textContent = 'X';
			let boxObjectX = dataFactory(value, target.textContent);
			objectsArray.push(boxObjectX);
			turn = 'O';
			gameEngine.winnerCheckerX();
			gameEngine.winnerCheckerO();
		} else if (turn === 'O' && target.textContent === '') {
			target.textContent = 'O';
			let boxObjectO = dataFactory(value, target.textContent);
			objectsArray.push(boxObjectO);
			turn = 'X';
			gameEngine.winnerCheckerX();
			gameEngine.winnerCheckerO();
		}
		message.textContent = `It's ${turn}'s turn!`;
	}
	//public return
	return {
		objectsArray,
		boxes,
	};
})();

const gameEngine = (function() {
	'use strict';
	let winnerAlertExt = document.querySelector('.winner-alert-ext');
	let winnerText = document.querySelector('.winner-text');
	let restartBtn1 = document.getElementById('restart-1');
	let restartBtn2 = document.querySelector('.restart-btn');
	let importedBoxes = gameBoard.boxes;
	let pX = [];
	let pO = [];
	let playing = true;
	let winner;
	window.addEventListener('click', () => {
		if (!playing) {
			winnerAlertExt.style.display = 'flex';
			winnerText.textContent = `${winner}`;
		}
	});
	restartBtn1.addEventListener('click', () => {
		location.reload();
	});
	restartBtn2.addEventListener('click', () => {
		location.reload();
	});

	importedBoxes.forEach((box) => {
		box.addEventListener('click', () => {
			winnerCheckerO();
			winnerCheckerX();
		});
	});
	function winnerCheckerX() {
		if (playing) {
			let pXfilter = gameBoard.objectsArray.filter(function(obj) {
				if (obj.value === 'X') {
					return `${obj.position}`;
				}
			});
			let pXmap = pXfilter.map(function(obj) {
				return `${obj.position}`;
			});
			pX = pXmap.sort(function(a, b) {
				if (a > b) {
					return 1;
				} else {
					return -1;
				}
			});
			switch (true) {
				//horizontals
				case pX.includes('0') && pX.includes('1') && pX.includes('2'):
					winner = 'X has won';
					playing = false;
					break;
				case pX.includes('3') && pX.includes('4') && pX.includes('5'):
					winner = 'X has won';
					playing = false;
					break;
				case pX.includes('6') && pX.includes('7') && pX.includes('8'):
					winner = 'X has won';
					playing = false;
					break;
				//verticals
				case pX.includes('0') && pX.includes('3') && pX.includes('6'):
					winner = 'X has won';
					playing = false;
					break;
				case pX.includes('1') && pX.includes('4') && pX.includes('7'):
					winner = 'X has won';
					playing = false;
					break;
				case pX.includes('2') && pX.includes('5') && pX.includes('8'):
					winner = 'X has won';
					playing = false;
					break;
				//diagonals
				case pX.includes('0') && pX.includes('4') && pX.includes('8'):
					winner = 'X has won';
					playing = false;
					break;
				case pX.includes('2') && pX.includes('4') && pX.includes('6'):
					winner = 'X has won';
					playing = false;
					break;
				default:
					if (pX.length === 5) {
						playing = false;
						winner = 'Draw!';
					}
					break;
			}
		}
	}
	function winnerCheckerO() {
		if (playing) {
			let positionOfilter = gameBoard.objectsArray.filter(function(obj) {
				if (obj.value === 'O') {
					return `${obj.position}`;
				}
			});
			let positionOmap = positionOfilter.map(function(obj) {
				return `${obj.position}`;
			});
			pO = positionOmap.sort(function(a, b) {
				if (a > b) {
					return 1;
				} else {
					return -1;
				}
			});
			switch (true) {
				//horizontals
				case pO.includes('0') && pO.includes('1') && pO.includes('2'):
					winner = 'O has won';
					playing = false;
					break;
				case pO.includes('3') && pO.includes('4') && pO.includes('5'):
					winner = 'O has won';
					playing = false;
					break;
				case pO.includes('6') && pO.includes('7') && pO.includes('8'):
					winner = 'O has won';
					playing = false;
					break;
				//verticals
				case pO.includes('0') && pO.includes('3') && pO.includes('6'):
					winner = 'O has won';
					playing = false;
					break;
				case pO.includes('1') && pO.includes('4') && pO.includes('7'):
					winner = 'O has won';
					playing = false;
					break;
				case pO.includes('2') && pO.includes('5') && pO.includes('8'):
					winner = 'O has won';
					playing = false;
					break;
				//diagonals
				case pO.includes('0') && pO.includes('4') && pO.includes('8'):
					winner = 'O has won';
					playing = false;
					break;
				case pO.includes('2') && pO.includes('4') && pO.includes('6'):
					winner = 'O has won';
					playing = false;
					break;
				default:
					if (pX.length === 5) {
						playing = false;
						winner = 'Draw!';
					}
					break;
			}
		}
	}

	return {
		pO,
		pX,
		playing,
		winnerCheckerX: winnerCheckerX,
		winnerCheckerO: winnerCheckerO,
	};
})();
