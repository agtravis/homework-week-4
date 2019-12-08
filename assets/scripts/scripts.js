



var mainContent = document.getElementById('main');
// var readEl = document.getElementById('read');
var timeToStart = document.getElementById('countdown');
var bodyEl = document.createElement('div');

document.getElementById('begin').addEventListener('click', function() {
    timeToStart.textContent = 'This quiz will start in 5...'
    start();
});

var question = 0;


function start() {
    var timeLeft = 5;
  
    var timeInterval = setInterval(function () {
      timeToStart.textContent = 'This quiz will start in ' + (timeLeft -1) + '...';
      --timeLeft;
  
      if (timeLeft === -1) {
        clearInterval(timeInterval);
        timeToStart.textContent = '';
        questionTime();
      }
  
    }, 1000);
  }

  function questionTime() {
      alert('go!');
  }