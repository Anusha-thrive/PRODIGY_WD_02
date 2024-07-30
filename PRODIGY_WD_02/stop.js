let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapNumber = 0;

const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

function startStop() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    startStopBtn.innerHTML = "Stop";
    lapBtn.disabled = false;
    running = true;
  } else {
    clearInterval(tInterval);
    startStopBtn.innerHTML = "Start";
    lapBtn.disabled = true;
    running = false;
  }
}

function reset() {
  clearInterval(tInterval);
  display.innerHTML = "00:00:00.000";
  startStopBtn.innerHTML = "Start";
  lapBtn.disabled = true;
  running = false;
  lapNumber = 0;
  laps.innerHTML = '';
}

function lap() {
  lapNumber++;
  const lapTime = display.innerHTML;
  const lapElement = document.createElement('div');
  lapElement.className = 'lap';
  lapElement.innerHTML = `Lap ${lapNumber}: ${lapTime}`;
  laps.appendChild(lapElement);
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = difference % 1000;
  
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  
  display.innerHTML = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);
