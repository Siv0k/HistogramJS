function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function disableTransform() {
	const bars = document.querySelectorAll('.bar');
	bars.forEach(bar => {
		bar.style.transform = 'none';
	});
}

function setButtonsState(disabled) {
	const buttons = document.querySelectorAll('.button');
	buttons.forEach(button => {
		if (disabled) {
			button.classList.add('disabled');
		} else {
			button.classList.remove('disabled');
		}
	});
}


async function animateSwap(element1, element2) {
	const translateX1 = getTranslateX(element1);
	const translateX2 = getTranslateX(element2);

	element1.classList.add('animateSwap');
	element2.classList.add('animateSwap');

	setTranslateX(element1, translateX2 - translateX1);
	setTranslateX(element2, translateX1 - translateX2);

	await sleep(800);

	element1.classList.remove('animateSwap');
	element2.classList.remove('animateSwap');
}

function getTranslateX(element) {
	const rect = element.getBoundingClientRect();
	return rect.left;
}

function setTranslateX(element, translateX) {
	const style = window.getComputedStyle(element);
	const matrix = new DOMMatrix(style.transform);
	element.style.transform = `translateX(${matrix.e + translateX}px)`;
}

async function sortArray(direction) {
	setButtonsState(true);
	disableTransform();

	const bars = Array.from(document.querySelectorAll('.bar'));

	for (let i = 0; i < bars.length; i++) {
		for (let j = 0; j < bars.length - 1; j++) {
			const current = Number(bars[j].textContent);
			const next = Number(bars[j + 1].textContent);

			const shouldSwap = (direction === 'asc' && current > next) || (direction === 'desc' && current < next);

			if (shouldSwap) {
				await animateSwap(bars[j], bars[j + 1]);
				[bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
			}
		}
	}
	setButtonsState(false);
}

export { sortArray };
