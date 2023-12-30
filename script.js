function initHistogram() {
	const dataInput = document.querySelector('#dataInput').value;
	const validInputNumbers = validateInput(dataInput);

	if (validInputNumbers.length === 0) {
		alert("Введите данные!")
		return;
	}

	drawHistogram(validInputNumbers);
}

function validateInput(input) {
	return input
		.split(' ')
		.filter(item => !isNaN(Number(item)) && item !== '')
}

function createBarElement() {
	const bar = document.createElement('div');
	bar.classList.add('bar');
	return bar;
}

function drawHistogram(dataArray) {
	const maxWidth = (window.screen.width / 100) * dataArray.length;
	const maxElement = Math.max(...dataArray);
	const histogram = document.querySelector('.histogram');
	histogram.innerHTML = '';

	dataArray.forEach((item) => {
		const bar = createBarElement();
		const percentHeight = (item / maxElement) * 100;
		bar.style.height = `${percentHeight}%`;
		bar.style.width = `${maxWidth}%`;
		bar.textContent = item;
		histogram.appendChild(bar);
	})
}

const inputButton = document.querySelector('#inputButton');
inputButton.addEventListener('click', initHistogram);