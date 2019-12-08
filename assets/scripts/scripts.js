



var mainEl = document.getElementById('main');
var readEl = document.getElementById('read');
var timerEl = document.getElementById('countdown');
var bodyEl = document.createElement('div');

document.getElementById('begin').addEventListener('click', function() {
    timerEl.textContent = 'This quiz will start in 5...'
    start();
});

var question = 0;


function start() {
    var timeLeft = 5;
  
    var timeInterval = setInterval(function () {
      timerEl.textContent = 'This quiz will start in ' + (timeLeft -1) + '...';
      --timeLeft;
  
      if (timeLeft === -1) {
        clearInterval(timeInterval);
        timerEl.textContent = '';
        questionTime();
      }
  
    }, 1000);
  }

  function questionTime() {
      alert('go!');
  }