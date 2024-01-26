import {sleep} from './utilities';

const ANIMATION_DURATION = 750;

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

	element1.classList.add('animateSwap');
	element2.classList.add('animateSwap');
	element1.classList.remove('selectedElement');
	element2.classList.remove('selectedElement');

	setElementTranslateX(element1, translateX2 - translateX1);
	setElementTranslateX(element2, translateX1 - translateX2);

	await sleep(ANIMATION_DURATION);

	element1.style.transform = '';
	element2.style.transform = '';
	element1.classList.remove('animateSwap');
	element2.classList.remove('animateSwap');
	element2.after(element1);
}

async function bubbleSort(direction) {
	setButtonsState(true);
	const histogram = document.querySelector('.histogram');
	const bars = histogram.childNodes;

	for (let i = 0; i < bars.length; i++) {
		for (let j = 0; j < bars.length - 1 - i; j++) {
			const currentElement = bars[j];
			const nextElement = bars[j + 1];

			const currentValue = Number(currentElement.textContent);
			const nextValue = Number(nextElement.textContent);

			const shouldSwap = (direction === 'asc' && currentValue > nextValue) || (direction === 'desc' && currentValue < nextValue);
			currentElement.classList.add('selectedElement');
			nextElement.classList.add('selectedElement');
			await sleep(ANIMATION_DURATION);

			if (shouldSwap) {
				await swapAnimation(currentElement, nextElement);
			}

			currentElement.classList.remove('selectedElement');
			nextElement.classList.remove('selectedElement');
		}
	}
	setButtonsState(false);
}

export {bubbleSort};