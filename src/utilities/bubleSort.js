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

async function animateAndSwap(currentElement, nextElement, shouldSwap) {
	currentElement.classList.add('animateSwap');
	nextElement.classList.add('animateSwap');
	await sleep(ANIMATION_DURATION);

	if (shouldSwap) {
		await swapAnimation(currentElement, nextElement);
	}

	requestAnimationFrame(() => {
		currentElement.classList.remove('animateSwap');
		nextElement.classList.remove('animateSwap');
	});

	await sleep(ANIMATION_DURATION);
}

function createBubbleSort() {
	let i = 0;
	let j = 0;
	const swapHistory = [];

	return async function bubbleSort(direction) {
		setButtonsState(true);
		const histogram = document.querySelector('.histogram');
		const bars = histogram.childNodes;

		if (direction === 'backward' && j <= 0 && i > 0) {
			i--;
			j = bars.length - 1 - i;
		}

		if (swapHistory.length && j > 0 && direction === 'backward') {
			await animateAndSwap(bars[j - 1], bars[j], swapHistory[swapHistory.length-1]);
			swapHistory.pop();
			j--;
		} else if (direction === 'forwards' && i < bars.length - 1) {
			const shouldSwap = Number(bars[j].textContent) > Number(bars[j + 1].textContent);
			await animateAndSwap(bars[j], bars[j + 1], shouldSwap);
			swapHistory.push(shouldSwap);
			j++;
		}

		if (j >= bars.length - 1 - i && i < bars.length - 1 && direction === 'forwards') {
			i++;
			j = 0;
		}

		setButtonsState(false);
		console.log(swapHistory)
	}
}

export {createBubbleSort};