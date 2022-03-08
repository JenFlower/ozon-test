import {
  progressBar,
  animateSwitch,
  hideSwitch,
  inputValue,
  delay,
  minValue,
  maxValue,
  regexp
} from './constants.js';

let progressValue = minValue;
let isAnimate = false;
let idIntervalAnimate = '';
let idIntervalInput = '';

inputValue.value = minValue;
progressSettings(minValue);

function progressSettings(endValue) {
  progressValue = endValue;
  // заменить тут на серый
  progressBar.style.background = `conic-gradient(
    blue ${endValue * 3.6}deg,
    #eff3f6 ${endValue * 3.6}deg 
  )`;
}

function animateHandler() {
  idIntervalAnimate = setInterval(() => {
    if (!isAnimate) return false;
    progressSettings(progressValue);

    inputValue.value = progressValue;
    if (progressValue >= maxValue) {
      clearInterval(idIntervalAnimate);
      progressValue = minValue;
      animateHandler();
    }
    progressValue++;
  }, delay);
}

function inputHandler() {
  progressValue = minValue;

  idIntervalInput = setInterval(() => {
    progressValue++;

    progressSettings(progressValue);

    if (progressValue === Number(inputValue.value)) {
      clearInterval(idIntervalInput);
    }
  }, delay);
}

function checkAnimate() {
  if (animateSwitch.classList.contains('block-action__input_on')) {
    inputValue.disabled = true;
    isAnimate = true;
    animateHandler();
  } else {
    inputValue.disabled = false;
    isAnimate = false;
    progressValue = inputValue.value;
  }
}

function checkHide() {
  if (hideSwitch.classList.contains('block-action__input_on')) {
    progressBar.style.display = 'none';
  } else {
    progressBar.style.display = 'grid';
  }
}

animateSwitch.addEventListener('click', (e) => {
  e.target.classList.toggle('block-action__input_on');
  clearInterval(idIntervalAnimate);
  clearInterval(idIntervalInput);
  checkAnimate();
});

hideSwitch.addEventListener('click', () => {
  hideSwitch.classList.toggle('block-action__input_on');
  checkHide();
});

inputValue.addEventListener('input', () => {
  inputValue.value = inputValue.value.replace(regexp, '');
  if (Number(inputValue.value) > maxValue) {
    inputValue.value = maxValue;
  }
  clearInterval(idIntervalInput);
  clearInterval(idIntervalAnimate);

  if (inputValue.value === '' || Number(inputValue.value) === minValue) {
    progressSettings(minValue);
    return false;
  }
  inputHandler();
});
