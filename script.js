function initHistogram() {
	const startInput = document.getElementById('startInput');
	const inputDataArray = startInput.value.split(' ').filter(Number);

	if (inputDataArray.length === 0) {
		alert("Введите данные!")
		return;
	}

	drawHistogram(inputDataArray);
}

function drawHistogram(dataArray) {
	const histogram = document.createElement('div');
	const maxWidth = (window.screen.width / 100) * dataArray.length;
	histogram.classList.add('histogram');
	document.body.appendChild(histogram);

	dataArray.forEach((item) => {
		const bar = document.createElement('div');
		bar.classList.add('bar');
		bar.style.height = `${item * 30}px`;
		bar.style.width = `${maxWidth}%`;
		bar.innerText = item;
		histogram.appendChild(bar);
	})
	console.log(dataArray.length)
}

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', initHistogram);



