import {BubbleSort} from "./utilities/bubleSort";

export class Histogram {
	#histogram = null;
	#input = null;
	#bubbleSort = null;
	#stepForwardButton = null;
	#stepBackwardButton = null;

	constructor(input) {
		this.#input = input;
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
		const dataInput = this.#input.value;
		const validInputNumbers = this.#validateData(dataInput);

		if (validInputNumbers.length === 0) {
			alert("Введите данные!")
			return;
		}

		this.#drawHistogram(validInputNumbers);

		this.#bubbleSort = new BubbleSort(this.#stepForwardButton, this.#stepBackwardButton, this.#histogram);
		this.#stepForwardButton.disabled = false;
		this.#stepBackwardButton.disabled = true;
	}

	init() {
		this.#stepForwardButton = this.#createButton('Step Forward');
		this.#stepBackwardButton = this.#createButton('Step Backward');
		this.#initHistogram();

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