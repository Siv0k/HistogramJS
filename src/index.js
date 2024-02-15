import "./styles/style.css";
import {Histogram} from "./histogram";

const histogramElement = document.querySelector('.histogram');
const input = document.getElementById('dataInput');
const inputButton = document.getElementById('inputButton');
const stepForwardButton = document.getElementById('stepForwardButton');
const stepBackwardButton = document.getElementById('stepBackwardButton');

const histogram = new Histogram(histogramElement, input, inputButton, stepForwardButton, stepBackwardButton);
histogram.init();