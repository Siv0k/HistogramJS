import {sleep} from './utilities';

const ANIMATION_DURATION = 600;

function getElementTranslateX(element) {
	const rect = element.getBoundingClientRect();
	return rect.left;
}

function setElementTranslateX(element, translateX) {
	const style = window.getComputedStyle(element);
	const matrix = new DOMMatrix(style.transform);
	element.style.transform = `translateX(${matrix.e + translateX}px)`;
}

function setButtonsState(disabled) {
	const buttons = document.querySelectorAll('.button');
	buttons.forEach(button => {
		button.disabled = disabled;
	});
}

async function swapAnimation(element1, element2) {
	const translateX1 = getElementTranslateX(element1);
	const translateX2 = getElementTranslateX(element2);

	setElementTranslateX(element1, translateX2 - translateX1);
	setElementTranslateX(element2, translateX1 - translateX2);

	await sleep(ANIMATION_DURATION);

	element1.style.transform = '';
	element2.style.transform = '';
	element2.after(element1);
}

function createBubbleSort() {
	let i = 0;
	let j = 0;

	return async function bubbleSort(direction) {
		setButtonsState(true);
		const histogram = document.querySelector('.histogram');
		const bars = histogram.childNodes;

		if (i >= bars.length) {
			i = 0;
			j = 0;
		}

		if (j >= bars.length - 1) {
			i++;
			j = 0;
		}

		const currentElement = bars[j];
		const nextElement = bars[j + 1];

		const currentValue = Number(currentElement.textContent);
		const nextValue = Number(nextElement.textContent);

		const shouldSwap = (direction === 'forwards' && currentValue > nextValue) || (direction === 'backward' && currentValue < nextValue);
		currentElement.classList.add('animateSwap');
		nextElement.classList.add('animateSwap');
		await sleep(ANIMATION_DURATION);

		if (shouldSwap) {
			await swapAnimation(currentElement, nextElement);
		}

		requestAnimationFrame(() => {
			currentElement.classList.remove('animateSwap');
			nextElement.classList.remove('animateSwap');
			j++;
		})
		setButtonsState(false);
	}
}

export {createBubbleSort};