import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputRef = document.querySelector('#datetime-picker');

const fp = flatpickr(inputRef);
console.log(fp);
