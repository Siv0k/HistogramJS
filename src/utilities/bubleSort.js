const ANIMATION_DURATION = 1000;

function getElementTranslateX(element) {
	const rect = element.getBoundingClientRect();
	return rect.left;
}

function setElementTranslateX(element, translateX) {
	const style = window.getComputedStyle(element);
	const matrix = new DOMMatrix(style.transform);
	element.style.transform = `translateX(${matrix.e + translateX}px)`;
}

function swapAnimation(element1, element2, shouldSwap) {
	element1.classList.add('animateSwap');
	element2.classList.add('animateSwap');

	if (shouldSwap) {
		const translateX1 = getElementTranslateX(element1);
		const translateX2 = getElementTranslateX(element2);

		setElementTranslateX(element1, translateX2 - translateX1);
		setElementTranslateX(element2, translateX1 - translateX2);

		setTimeout(() => {
			element1.style.transform = '';
			element2.style.transform = '';
			element2.after(element1);
		}, ANIMATION_DURATION);
	}
	setTimeout(() => {
		element1.classList.remove('animateSwap');
		element2.classList.remove('animateSwap');
	}, ANIMATION_DURATION / 2);
}

function createBubbleSortStep() {
	let i = 0;
	let j = 0;
	const swapHistory = [];
	const histogram = document.querySelector('.histogram');
	const bars = histogram.childNodes;

	return function doStepBubbleSort(direction) {

		const lastBarIndex = bars.length - 1;
		const isBackward = direction === 'backward';

		if (j >= lastBarIndex - i && i < lastBarIndex && !isBackward) {
			i++;
			j = 0;
		} else if (j <= 0 && i > 0 && isBackward) {
			i--;
			j = lastBarIndex - i;
		}

		const currentElement = isBackward && j > 0 ? bars[j - 1] : bars[j];
		const nextElement = isBackward ? bars[j] : bars[j + 1];
		const currentValue = Number(currentElement.textContent);
		const nextValue = Number(nextElement.textContent);

		const shouldSwap = isBackward ? swapHistory[swapHistory.length - 1] : currentValue > nextValue;

		if (isBackward && swapHistory.length) {
			swapHistory.pop();
			j--;
		} else if (!isBackward && i < lastBarIndex) {
			swapHistory.push(shouldSwap);
			j++;
		}
		swapAnimation(currentElement, nextElement, shouldSwap);
	}
}

export {createBubbleSortStep};