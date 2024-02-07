import {clearHistogram, createElementWithClass, validateData, setButtonsState} from "./utilities/utilities";
import {createBubbleSortStep} from "./utilities/bubleSort";

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

		doStepBubbleSort = createBubbleSortStep();
	}

	const input = document.getElementById('dataInput');
	const stepForwardButton = document.getElementById('stepForwardButton');
	const stepBackwardButton = document.getElementById('stepBackwardButton');

	input.addEventListener('keydown', e => {
		if (e.key === 'Enter') {
			initHistogram();
		}
	})

	const inputButton = document.getElementById('inputButton');
	inputButton.addEventListener('click', initHistogram);

	stepForwardButton.addEventListener('click', () => {
		setButtonsState();
		doStepBubbleSort('forward');
	})

	stepBackwardButton.addEventListener('click', () => {
		setButtonsState()
		doStepBubbleSort('backward');
	})
}