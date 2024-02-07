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

function setButtonsState() {
	const buttons = document.querySelectorAll('.button');
	buttons.forEach(button => {
		button.disabled = true;
	});
	setTimeout(() => {
		buttons.forEach(button => {
			button.disabled = false;
		});
	}, 1000);
}

export {createElementWithClass, validateData, clearHistogram, setButtonsState};