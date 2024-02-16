import "./styles/style.css";
import {Histogram} from "./histogram";

const histogramElement = document.querySelector('.histogram');
const input = document.getElementById('dataInput');
const inputButton = document.getElementById('inputButton');

const histogram = new Histogram(histogramElement, input, inputButton);
histogram.init();

