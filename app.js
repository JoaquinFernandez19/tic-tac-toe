//html elements
const newGameBtn = document.querySelector('.game-btns__new-gameBtn');

let gameBoard = (function() {
	'use strict';
	//private elements
	const container = document.querySelector('.game-container');
	const boxes = document.querySelectorAll('.game-container__box');
	let currentSimbol = 0;

	container.addEventListener('click', printer);
	function printer(e) {
		if (currentSimbol % 2 === 0) {
			e.target.textContent = 'X';
			currentSimbol++;
		} else {
			e.target.textContent = '0';
			currentSimbol++;
		}
	}

	//public return
	return {
		printer: printer,
	};
})();
