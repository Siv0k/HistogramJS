function sortArray(direction) {
	const histogram = document.querySelector('.histogram');
	const bars = histogram.childNodes;

	for (let i = 0; i < bars.length; i++) {
		for (let j = 0; j < bars.length - 1; j++) {
			const current = Number(bars[j].textContent);
			const next = Number(bars[j + 1].textContent);

			const shouldSwap = (direction  === 'asc' && current > next) || (direction  === 'desc' && current < next);

			if (shouldSwap) {
				bars[j + 1].after(bars[j]);
			}
		}
	}
}

export { sortArray };
