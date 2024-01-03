function validateData(input) {
	return input
		.split(' ')
		.filter(item => !isNaN(Number(item)) && item !== '')
}

function createElementWithClass(element, classesArray) {
	const newElement = document.createElement(element);
	newElement.classList.add(...classesArray);
	return newElement;
}

export {createElementWithClass, validateData};