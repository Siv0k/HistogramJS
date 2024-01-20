const ANIMATION_DURATION = 400;
// let barsOrder = null;


// function resetOrder() {
// 	barsOrder = null;
// }

// function getBars() {
// 	if (!barsOrder) {
// 		barsOrder = Array.from(document.querySelectorAll('.bar'));
// 	}
// 	return barsOrder;
// }

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

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
		disabled ? button.classList.add('disabled') : button.classList.remove('disabled');
	});
}

async function swapAnimation(element1, element2) {
	const translateX1 = getElementTranslateX(element1);
	const translateX2 = getElementTranslateX(element2);

	setElementTranslateX(element1, translateX2 - translateX1);
	setElementTranslateX(element2, translateX1 - translateX2);

	await sleep(ANIMATION_DURATION);
}

async function bubbleSort(direction) {
	setButtonsState(true);
	const histogram = document.querySelector('.histogram');
	const bars = histogram.childNodes;

	for (let i = 0; i < bars.length; i++) {
		for (let j = 0; j < bars.length - 1 - i; j++) {
			const current = Number(bars[j].textContent);
			const next = Number(bars[j + 1].textContent);

			const shouldSwap = (direction === 'asc' && current > next) || (direction === 'desc' && current < next);
			bars[j].classList.add('animateSwap');
			bars[j + 1].classList.add('animateSwap');
			await sleep(ANIMATION_DURATION);

			if (shouldSwap) {
				await swapAnimation(bars[j], bars[j + 1]);
				bars[j].classList.remove('animateSwap');
				bars[j + 1].classList.remove('animateSwap');
				bars[j].style.transform = '';
				bars[j + 1].style.transform = '';
				bars[j + 1].after(bars[j]);
			} else {
				await sleep(ANIMATION_DURATION);
				bars[j].classList.remove('animateSwap');
				bars[j + 1].classList.remove('animateSwap');
			}
		}
	}
	setButtonsState(false);
}

export {bubbleSort};