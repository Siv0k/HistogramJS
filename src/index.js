import "./styles/style.css";
import {Histogram} from "./histogram";

const input = document.getElementById('dataInput');
const inputButton = document.getElementById('inputButton');

inputButton.addEventListener('click', () => {
	const inputData = input.value;

	if (inputData.trim() === '') {
		alert('Введите данные!');
		return;
	}

	new Histogram(inputData);
	input.value = '';
});