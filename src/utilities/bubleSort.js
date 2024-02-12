const ANIMATION_DURATION = 800;

function getElementTranslateX(element) {
	const rect = element.getBoundingClientRect();
	return rect.left;
}

function setElementTranslateX(element, translateX) {
	const style = window.getComputedStyle(element);
	const matrix = new DOMMatrix(style.transform);
	element.style.transform = `translateX(${matrix.e + translateX}px)`;
}

function swapAnimation(currentElement, nextElement, shouldSwap) {
	currentElement.classList.add('animateSwap');
	nextElement.classList.add('animateSwap');

	if (shouldSwap) {
		const translateX1 = getElementTranslateX(currentElement);
		const translateX2 = getElementTranslateX(nextElement);

		setElementTranslateX(currentElement, translateX2 - translateX1);
		setElementTranslateX(nextElement, translateX1 - translateX2);
	}

	currentElement.addEventListener('transitionend', () => {
		currentElement.classList.remove('animateSwap');
		nextElement.classList.remove('animateSwap');

		if (shouldSwap) {
			setTimeout(() => {
				currentElement.style.transform = '';
				nextElement.style.transform = '';
				nextElement.after(currentElement);
			}, ANIMATION_DURATION / 2);
		}

	}, {once: true});
}

function createBubbleSortStep() {
	let outerIndex = 0;
	let innerIndex = 0;
	const stepForwardButton = document.getElementById('stepForwardButton');
	const stepBackwardButton = document.getElementById('stepBackwardButton');
	const swapHistory = [];
	const histogram = document.querySelector('.histogram');
	const bars = histogram.childNodes;
	const lastBarIndex = bars.length - 1;

	return direction => {
		const isBackward = direction === 'backward';

		if (innerIndex <= 0 && outerIndex > 0) {
			outerIndex--;
			innerIndex = lastBarIndex - outerIndex;
		} else if (innerIndex >= lastBarIndex - outerIndex && !isBackward) {
			outerIndex++;
			innerIndex = 0;
		}

		const currentElement = isBackward && innerIndex > 0 ? bars[innerIndex - 1] : bars[innerIndex];
		const nextElement = isBackward ? bars[innerIndex] : bars[innerIndex + 1];
		const currentValue = Number(currentElement.textContent);
		const nextValue = Number(nextElement.textContent);

		const shouldSwap = isBackward ? swapHistory.pop() : currentValue > nextValue;

		if (isBackward) {
			innerIndex--;
		} else {
			swapHistory.push(shouldSwap);
			innerIndex++;
		}

		stepForwardButton.disabled = true;
		stepBackwardButton.disabled = true;

		swapAnimation(currentElement, nextElement, shouldSwap)

		setTimeout(() => {
			stepForwardButton.disabled = false;
			stepBackwardButton.disabled = false;
			if (outerIndex === 0 && innerIndex === 0 && isBackward) {
				stepBackwardButton.disabled = true;
			} else if (outerIndex === lastBarIndex) {
				stepForwardButton.disabled = true;
			}
		}, ANIMATION_DURATION);
	}
}

export {createBubbleSortStep};