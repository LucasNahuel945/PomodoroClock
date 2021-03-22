const html = {
  title: document.getElementById('title'),
  alertSound: document.getElementById('alert'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
  reset: document.getElementById('reset'),
  pause: document.getElementById('pause'),
  play: document.getElementById('play'),
  stop: document.getElementById('stop'),
  status: document.getElementById('status-label'),
  counter: document.getElementById('status-counter'),
};

class Timer {
  constructor() {
    let minutes = 25;
    let seconds = 0;
    let status = 'Session';
    let counter = { sessions: 0, breaks: 0 };
    let interval = undefined;
    
    this.getStatus = () => status;
    this.getMinutes = () => minutes;
    this.getSeconds = () => seconds;
    this.getFullCounter = () => counter;
    
    this.printTime = () => {
      html.minutes.innerHTML = format(minutes);
      html.seconds.innerHTML = format(seconds);
      html.title.innerHTML = `${format(minutes)}:${format(seconds)} | ${status} (${this.getCounter()})`;
    };

    this.printStatus = () => {
      html.status.innerHTML = status;
      html.counter.innerHTML = this.getCounter();
    };

    this.run = () => {
      interval = setInterval(this.getTime, 1000);
    };

    this.getTime = () => {
      seconds = (seconds == 0) ? 59 : seconds - 1;
      minutes = (seconds == 59) ? minutes - 1 : minutes;
      this.printTime();
      if (minutes == 0 && seconds == 0)
        this.toggleStatus();
    };

    this.getCounter = () => {
      return (status == 'Session') ? counter.sessions : counter.breaks;
    };

    this.resetCounter = () => {
      counter = { sessions: 0, breaks: 0 };
    }

    this.pause = () => {
      clearInterval(interval);
      interval = undefined;
    };
    
    this.reset = () => {
      this.setSessionMode();
      this.resetCounter();
      this.printStatus();
      this.printTime();
    }

    this.stop = () => {
      this.pause();
      this.setSessionMode();
      this.resetCounter();
      this.printStatus();
      this.printTime();
    }

    this.setBreakMode = () => {
      minutes = 0;
      seconds = 5;
      status = 'Break';
    };

    this.setSessionMode = () => {
      minutes = 0;
      seconds = 5;
      status = 'Session';
    };

    this.toggleStatus = () => {
      html.alertSound.play();
      this.updateCounter();
      if (status === 'Session') {
        this.setBreakMode();
      } else {
        this.setSessionMode();
      }
      this.printStatus();
      this.printTime();
    };

    this.updateCounter = () => {
      if (status == 'Session') {
        counter.sessions++;
      } else {
        counter.breaks++;
      }
    };
  }
}

const format = n => ('0'+n).substr(('0'+n).length-2);
const toggle = element => { element.classList.toggle('hide'); };
let Pomodoro = new Timer();

html.play.addEventListener('click', () => {
  Pomodoro.run();
  toggle(html.play);
  toggle(html.pause);
});

html.pause.addEventListener('click', () => {
  Pomodoro.pause();
  toggle(html.pause);
  toggle(html.play);
});

html.reset.addEventListener('click', () => {
  Pomodoro.reset();
});

html.stop.addEventListener('click', () => {
  html.play.classList.remove('hide');
  html.pause.classList.add('hide');
  Pomodoro.stop();
});
