function initHistogram() {
	const dataInput = document.getElementById('dataInput').value;
	const inputDataArray = dataInput.split(' ').filter(Number);

	if (inputDataArray.length === 0) {
		alert("Введите данные!")
		return;
	}

	drawHistogram(inputDataArray);
}

function drawHistogram(dataArray) {
	const histogram = document.createElement('div');
	const maxWidth = (window.screen.width / 100) * dataArray.length;
	const maxElement = Math.max(...dataArray);
	histogram.classList.add('histogram');
	document.body.appendChild(histogram);

	dataArray.forEach((item) => {
		const bar = document.createElement('div');
		const percentHeight = (item / maxElement) * 100;
		bar.classList.add('bar');
		bar.style.height = `${percentHeight}%`;
		bar.style.width = `${maxWidth}%`;
		bar.innerText = item;
		histogram.appendChild(bar);
	})
}

const inputButton = document.getElementById('inputButton');
inputButton.addEventListener('click', initHistogram);