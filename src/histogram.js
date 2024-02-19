import {BubbleSort} from "./utilities/bubleSort";

export class Histogram {
	#histogram = null;
	#dataInput = null;
	#bubbleSort = null;
	#stepForwardButton = null;
	#stepBackwardButton = null;

	constructor(dataInput) {
		this.#dataInput = dataInput;
		this.#initHistogram()
	}

	#drawHistogram(dataArray) {
		this.#histogram = this.#createElementWithClass('div', 'histogram');
		document.body.appendChild(this.#histogram);

		const maxWidth = (window.screen.width / 100) * dataArray.length;
		const maxElement = Math.max(...dataArray);

		dataArray.forEach((item) => {
			const bar = this.#createElementWithClass('div', 'bar');
			const percentHeight = (item / maxElement) * 100;
			bar.style.height = `${percentHeight}%`;
			bar.style.width = `${maxWidth}%`;
			bar.textContent = item;
			this.#histogram.appendChild(bar);
		})
	}

	#initHistogram() {
		const validInputNumbers = this.#validateData(this.#dataInput);

		if (validInputNumbers.length === 0) {
			alert("Введите данные!")
			return;
		}

		this.#drawHistogram(validInputNumbers);

		this.#stepForwardButton = this.#createButton('Step Forward');
		this.#stepBackwardButton = this.#createButton('Step Backward');

		this.#bubbleSort = new BubbleSort(this.#stepForwardButton, this.#stepBackwardButton, this.#histogram);
		this.#stepForwardButton.disabled = false;
		this.#stepBackwardButton.disabled = true;

		this.#stepForwardButton.addEventListener('click', () => {
			this.#bubbleSort.swapStep('forward');
		})

		this.#stepBackwardButton.addEventListener('click', () => {
			this.#bubbleSort.swapStep('backward');
		})
	}

	#createButton(textContent) {
		const button = document.createElement('button');
		button.textContent = textContent;
		button.classList.add('button');
		document.body.appendChild(button);
		return button;
	}

	#validateData(input) {
		return input
			.split(' ')
			.filter(item => !isNaN(Number(item)) && item !== '')
	}

	#createElementWithClass(element, classes) {
		const newElement = document.createElement(element);
		Array.isArray(classes) ? newElement.classList.add(...classes) : newElement.classList.add(classes);
		return newElement;
	}
}