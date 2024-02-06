import {clearHistogram, createElementWithClass, validateData} from "./utilities/utilities";
import {createBubbleSortStepFunction} from "./utilities/bubleSort";

function drawHistogram(dataArray) {
	const histogram = document.querySelector('.histogram');
	const maxWidth = (window.screen.width / 100) * dataArray.length;
	const maxElement = Math.max(...dataArray);

	dataArray.forEach((item) => {
		const bar = createElementWithClass('div', 'bar');
		const percentHeight = (item / maxElement) * 100;
		bar.style.height = `${percentHeight}%`;
		bar.style.width = `${maxWidth}%`;
		bar.textContent = item;
		histogram.appendChild(bar);
	})
}

export function init() {
	let doStepBubbleSort = function () {};
	function initHistogram() {
		const dataInput = document.getElementById('dataInput').value;
		const validInputNumbers = validateData(dataInput);

		if (validInputNumbers.length === 0) {
			alert("Введите данные!")
			return;
		}

		clearHistogram();
		drawHistogram(validInputNumbers);

		doStepBubbleSort = createBubbleSortStepFunction();
	}

	const input = document.getElementById('dataInput');
	const sortIncButton = document.getElementById('sortIncButton');
	const sortDescButton = document.getElementById('sortDescButton');

	input.addEventListener('keydown', e => {
		if (e.key === 'Enter') {
			initHistogram();
		}
	})

	const inputButton = document.getElementById('inputButton');
	inputButton.addEventListener('click', initHistogram);

	sortDescButton.addEventListener('click', () => {
		doStepBubbleSort('backward');

	})

	sortIncButton.addEventListener('click', () => {
		doStepBubbleSort('forwards')
	})
}