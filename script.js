import {createElementWithClass, validateData} from "/utilities/utilities.js";

function initHistogram() {
	const dataInput = document.querySelector('#dataInput').value;
	const validInputNumbers = validateData(dataInput);

	if (validInputNumbers.length === 0) {
		alert("Введите данные!")
		return;
	}

	drawHistogram(validInputNumbers);
}

function drawHistogram(dataArray) {
	const histogram = document.querySelector('.histogram');
	histogram.innerHTML = '';
	const maxWidth = (window.screen.width / 100) * dataArray.length;
	const maxElement = Math.max(...dataArray);

	dataArray.forEach((item) => {
		const bar = createElementWithClass('div',  ['bar']);
		const percentHeight = (item / maxElement) * 100;
		bar.style.height = `${percentHeight}%`;
		bar.style.width = `${maxWidth}%`;
		bar.textContent = item;
		histogram.appendChild(bar);
	})
}

const input = document.querySelector('#dataInput');
input.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		initHistogram();
	}
})

const inputButton = document.querySelector('#inputButton');
inputButton.addEventListener('click', initHistogram);