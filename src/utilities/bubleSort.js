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
		}, ANIMATION_DURATION * 2);
	}
	setTimeout(() => {
		element1.classList.remove('animateSwap');
		element2.classList.remove('animateSwap');
	}, ANIMATION_DURATION);
}

function createBubbleSort() {
	let i = 0;
	let j = 0;
	const swapHistory = [];

	return function bubbleSort(direction) {
		setButtonsState(true);
		const histogram = document.querySelector('.histogram');
		const bars = histogram.childNodes;
		const isBackward = direction === 'backward';

		if (isBackward && swapHistory.length) {
			if (j <= 0 && i > 0) {
				i--;
				j = bars.length - 1 - i;
			}
			swapAnimation(bars[j - 1], bars[j], swapHistory.pop());
			j--;
		} else if (!isBackward) {
			if (j >= bars.length - 1 - i && i < bars.length - 1) {
				i++;
				j = 0;
			}
			if (i < bars.length - 1) {
				const shouldSwap = Number(bars[j].textContent) > Number(bars[j + 1].textContent);
				swapAnimation(bars[j], bars[j + 1], shouldSwap);
				swapHistory.push(shouldSwap);
				j++;
			}
		}

		setButtonsState(false);
	}
}

export {createBubbleSort};