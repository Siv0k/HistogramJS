const ANIMATION_DURATION = 700;
export class BubbleSort {
	#outerIndex = 0;
	#innerIndex = 0;
	#stepForwardButton = null;
	#stepBackwardButton = null;
	#swapHistory = [];
	#histogram = null;
	#bars = null;
	#lastBarIndex = null;

	constructor(stepForwardButton, stepBackwardButton, histogram) {
		this.#stepForwardButton = stepForwardButton;
		this.#stepBackwardButton = stepBackwardButton;
		this.#histogram = histogram;
		this.#bars = histogram.childNodes;
		this.#lastBarIndex = this.#bars.length - 1;
	}

	#getElementTranslateX(element) {
		const rect = element.getBoundingClientRect();
		return rect.left;
	}

	#setElementTranslateX(element, translateX) {
		const style = window.getComputedStyle(element);
		const matrix = new DOMMatrix(style.transform);
		element.style.transform = `translateX(${matrix.e + translateX}px)`;
	}

	#swapAnimation(currentElement, nextElement, shouldSwap, isBackward) {
		const transitionElement = isBackward ? nextElement : currentElement;
		currentElement.classList.add('animateSwap');
		nextElement.classList.add('animateSwap');

		if (shouldSwap) {
			const translateX1 = this.#getElementTranslateX(currentElement);
			const translateX2 = this.#getElementTranslateX(nextElement);

			this.#setElementTranslateX(currentElement, translateX2 - translateX1);
			this.#setElementTranslateX(nextElement, translateX1 - translateX2);
		}

		this.#histogram.addEventListener('transitionend', () => {
			currentElement.classList.remove('animateSwap');
			nextElement.classList.remove('animateSwap');

			if (shouldSwap) {
				transitionElement.addEventListener('transitionend', () => {
					currentElement.style.transform = '';
					nextElement.style.transform = '';
					nextElement.after(currentElement);
				}, {once: true});
			}
		}, {once: true});
	}

	swapStep(direction) {
		const isBackward = direction === 'backward';

		if (this.#innerIndex <= 0 && this.#outerIndex > 0) {
			this.#outerIndex--;
			this.#innerIndex = this.#lastBarIndex - this.#outerIndex;
		} else if (this.#innerIndex >= this.#lastBarIndex - this.#outerIndex && !isBackward) {
			this.#outerIndex++;
			this.#innerIndex = 0;
		}

		const currentElement = isBackward && this.#innerIndex > 0 ? this.#bars[this.#innerIndex - 1] : this.#bars[this.#innerIndex];
		const nextElement = isBackward ? this.#bars[this.#innerIndex] : this.#bars[this.#innerIndex + 1];
		const currentValue = Number(currentElement.textContent);
		const nextValue = Number(nextElement.textContent);
		const shouldSwap = isBackward ? this.#swapHistory.pop() : currentValue > nextValue;

		if (isBackward) {
			this.#innerIndex--;
		} else {
			this.#swapHistory.push(shouldSwap);
			this.#innerIndex++;
		}

		this.#stepForwardButton.disabled = true;
		this.#stepBackwardButton.disabled = true;

		this.#swapAnimation(currentElement, nextElement, shouldSwap, isBackward);

		setTimeout(() => {
			this.#stepForwardButton.disabled = false;
			this.#stepBackwardButton.disabled = false;
			if (this.#outerIndex === 0 && this.#innerIndex === 0 && isBackward) {
				this.#stepBackwardButton.disabled = true;
			} else if (this.#outerIndex === this.#lastBarIndex) {
				this.#stepForwardButton.disabled = true;
			}
		}, ANIMATION_DURATION);
	}
}