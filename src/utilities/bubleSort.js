function sortArrayInc() {
	const histogram = document.querySelector('.histogram');
	const bars = histogram.childNodes;
	for (let i = 0; i < bars.length; i++) {
		for (let j = 0; j < bars.length - 1; j++) {
			if (Number(bars[j].textContent) > Number(bars[j+1].textContent)) {
				bars[j+1].after(bars[j]);
			}
		}
	}
}

function sortArrayDesc() {
	const histogram = document.querySelector('.histogram');
	const bars = histogram.childNodes;
	for (let i = bars.length - 1; i > 0; i--) {
		for (let j = bars.length - 1; j > 0; j--) {
			if (Number(bars[j].textContent) > Number(bars[j - 1].textContent)) {
				bars[j - 1].before(bars[j]);
			}
		}
	}
}

export {sortArrayInc, sortArrayDesc}