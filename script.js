const title = document.getElementById('title');
const alert = document.getElementById('alert');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const status = document.getElementById('status');
const reset = document.getElementById('reset');
const pause = document.getElementById('pause');
const play = document.getElementById('play');
const stop = document.getElementById('stop');

const Timer = (minutes, seconds, status, paused) =>({
  minutes,
  seconds,
  status,
  paused,
});

const setSessionMode = () => Timer(25, 0, 'Session', false);
const setBreakMode = () => Timer(5, 0, 'Break', false);

var clock = setSessionMode();
var interval;

// Events

play.addEventListener('click', () => {
  interval = runTimer();
  toggle(play);
  toggle(pause);
});

pause.addEventListener('click', () => { 
  toggle(pause);
  toggle(play);
  clearInterval(interval);
});

reset.addEventListener('click', () => {
  clock = (clock.status == 'Session') ? setSessionMode() : setBreakMode();
  printTimer()
});

stop.addEventListener('click', () =>{ 
  clearInterval(interval);
  clock = setSessionMode();
  play.classList.remove('hide');
  pause.classList.add('hide');
  printTimer()
});

// Funtions

const format = n => ('0'+n).substr(('0'+n).length-2);
const runTimer = () => setInterval(getTime, 1000);
const toggle = element => { element.classList.toggle('hide'); };


function getTime(){
  clock.seconds = (clock.seconds == 0) ? 59 : clock.seconds-1;
  clock.minutes = (clock.seconds == 59) ? clock.minutes-1 : clock.minutes;
  printTimer();
  if( clock.minutes == 0 && clock.seconds == 0 ) toggleStatus();
}

// Toggle status
function toggleStatus(){
  alert.play();
  clock = (clock.status == 'Session') ? setBreakMode() : setSessionMode();
  status.innerHTML = clock.status;
  console.log(clock);
  printTimer();
}

const printTimer = () =>{ 
  minutes.innerHTML = format(clock.minutes);
  seconds.innerHTML = format(clock.seconds);
  title.innerHTML = `${format(clock.minutes)}:${format(clock.seconds)} | ${clock.status}`;
}
