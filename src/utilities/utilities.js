function validateData(input) {
	return input
		.split(' ')
		.filter(item => !isNaN(Number(item)) && item !== '')
}

function createElementWithClass(element, classes) {
	const newElement = document.createElement(element);
	Array.isArray(classes) ? newElement.classList.add(...classes) : newElement.classList.add(classes);
	return newElement;
}

function clearHistogram() {
	const histogram = document.querySelector('.histogram');
	histogram.innerHTML = '';
}

export {createElementWithClass, validateData, clearHistogram};