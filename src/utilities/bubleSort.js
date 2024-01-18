let barsOrder = null;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function resetOrder() {
	barsOrder = null;
}

function getBars() {
	if (!barsOrder) {
		barsOrder = Array.from(document.querySelectorAll('.bar'));
	}
	return barsOrder;
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

	element1.classList.add('animateSwap');
	element2.classList.add('animateSwap');

	setElementTranslateX(element1, translateX2 - translateX1);
	setElementTranslateX(element2, translateX1 - translateX2);

	await sleep(800);

	element1.classList.remove('animateSwap');
	element2.classList.remove('animateSwap');
}

async function bubbleSort(direction) {
	setButtonsState(true);
	const bars = getBars();

	for (let i = 0; i < bars.length; i++) {
		for (let j = 0; j < bars.length - 1; j++) {
			const current = Number(bars[j].textContent);
			const next = Number(bars[j + 1].textContent);

			const shouldSwap = (direction === 'asc' && current > next) || (direction === 'desc' && current < next);

			if (shouldSwap) {
				await swapAnimation(bars[j], bars[j + 1]);
				[bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
			}
		}
	}
	barsOrder = bars;
	setButtonsState(false);
}

export {bubbleSort, resetOrder};