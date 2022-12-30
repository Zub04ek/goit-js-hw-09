import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

startBtnRef.addEventListener('click', onStartTimer);

startBtnRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > options.defaultDate) {
      startBtnRef.disabled = false;
    }
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtnRef.disabled = true;
    }
  },
};

const fp = flatpickr(inputRef, options);

let timerId = null;

function onStartTimer() {
  timerId = setInterval(() => {
    const currentDayInMs = Date.now();
    const futureDayInMs = new Date(inputRef.value).getTime();
    const ms = futureDayInMs - currentDayInMs;
    if (ms < 0) {
      clearInterval(timerId);
      return;
    }
    const dataObj = convertMs(ms);

    daysRef.textContent = addLeadingZero(dataObj.days);
    hoursRef.textContent = addLeadingZero(dataObj.hours);
    minutesRef.textContent = addLeadingZero(dataObj.minutes);
    secondsRef.textContent = addLeadingZero(dataObj.seconds);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
