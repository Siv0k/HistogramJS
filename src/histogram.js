import {BubbleSort} from "./utilities/bubleSort";

export class Histogram {
	#histogram = null;
	#input = null;
	#inputButton = null;
	#bubbleSort = null;
	#stepForwardButton = null;
	#stepBackwardButton = null;

	constructor(histogram, input, inputButton) {
		this.#histogram = histogram;
		this.#input = input;
		this.#inputButton = inputButton
	}

	#drawHistogram(dataArray) {
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
		const dataInput = this.#input.value;
		const validInputNumbers = this.#validateData(dataInput);

		if (validInputNumbers.length === 0) {
			alert("Введите данные!")
			return;
		}

		this.#clearHistogram()
		this.#drawHistogram(validInputNumbers);

		this.#bubbleSort = new BubbleSort(this.#stepForwardButton, this.#stepBackwardButton, this.#histogram);
		this.#stepForwardButton.disabled = false;
		this.#stepBackwardButton.disabled = true;
	}

	init() {
		this.#stepForwardButton = this.#createButton('Step Forward');
		this.#stepBackwardButton = this.#createButton('Step Backward');

		this.#stepForwardButton.disabled = true;
		this.#stepBackwardButton.disabled = true;

		this.#input.addEventListener('keydown', e => {
			if (e.key === 'Enter') {
				this.#initHistogram();
			}
		})

		this.#inputButton.addEventListener('click', () => this.#initHistogram());

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

	#clearHistogram() {
		this.#histogram.innerHTML = '';
	}
}