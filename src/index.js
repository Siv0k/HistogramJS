import ".//styles/style.css";
import {initHistogram} from "./histogram";

export function init() {
	const input = document.querySelector('#dataInput');
	input.addEventListener('keydown', e => {
		if (e.key === 'Enter') {
			initHistogram();
		}
	})

	const inputButton = document.querySelector('#inputButton');
	inputButton.addEventListener('click', initHistogram);
}

init()