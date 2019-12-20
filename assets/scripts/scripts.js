var timeToStart = document.getElementById('countdown');
var startButton = document.getElementById('start-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var answerStatus = document.getElementById('answer-status');
var finalScoreElement = document.getElementById('submit-score');
var userScore = document.getElementById('score');
var total = document.getElementById('total');
var gameClockElement = document.getElementById('countdownGame');
var highScores = document.getElementById('high-scores');
var instructions = document.getElementById('instructions');
var quizTitle = document.getElementById('quiz-title');
var selectQuiz = document.getElementById('select-quiz');
var quizScriptLink = document.getElementById('quiz-script-link');
var answeredCorrect = document.getElementById('questions-correct');
var possibleTotal = document.getElementById('possible-total');
var submitButton = document.getElementById('submit-btn');
var highScoresList = document.getElementById('high-scores-list');
var restart = document.getElementById('restart');
var restartButton = document.getElementById('restart-btn');
var modalElement = document.querySelector('#modal-container');
var closeElement = document.getElementById('close-popup');
var firstInitial = document.getElementById('first-initial');
var secondInitial = document.getElementById('second-initial');
var thirdInitial = document.getElementById('third-initial');
var leaderTitle = document.getElementById('leader-title');
var sounds = document.getElementById('sounds');

var highScoresTable = '';
var highScoresInitials = [];
var gameClockInterval;
var currentQuestionIndex = 0;
var score = 0;
var questionsCorrect = 0;
var startTime;
var finishTime;
var answerTime;
var seconds = 0;
var maxQuestionScore = 6;
gameClockElement.textContent = commonSenseTime(seconds);
var soundsChecked = false;

startButton.addEventListener('click', function() {
  var quizChoice = selectQuiz.options[selectQuiz.selectedIndex].text;
  if (quizChoice === 'JavaScript') {
    questions = questions;
  } else if (quizChoice === 'World Capitals') {
    questions = worldCapitals;
  }
  highScoresTable = quizChoice;
  seconds = questions.length * 15 + 1;
  if (sounds.checked) {
    soundsChecked = true;
  }
  startButton.classList.add('hide');
  instructions.classList.add('hide');
  quizTitle.classList.add('hide');
  document.getElementById('controls').classList.add('hide');
  timeToStart.textContent = 'Quiz starting in 5...';
  start();
});

function start() {
  var timeLeft = 5;
  var timeInterval = setInterval(function() {
    timeToStart.textContent = 'Quiz starting in ' + (timeLeft - 1) + '...';
    --timeLeft;
    if (timeLeft === 0) {
      clearInterval(timeInterval);
      timeToStart.classList.add('hide');
      quizTime();
    }
  }, 1000);
}

function quizTime() {
  gameClockElement.classList.remove('hide');
  gameClockInterval = setInterval(function() {
    --seconds;
    gameClockElement.textContent = commonSenseTime(seconds);
    if (seconds <= 20) {
      gameClockElement.classList.add('wrong-answer');
    }
    if (seconds <= 0) {
      alert('You ran out of time!');
      clearInterval(gameClockInterval);
      finish();
      submitButton.addEventListener('click', submitScore);
    }
  }, 1000);
  questionContainerElement.classList.remove('hide');
  nextQuestion();
}

function commonSenseTime(seconds) {
  if (seconds === 0) {
    return 'Game-clock initiated...';
  } else {
    var minutesLeft = Math.floor(seconds / 60);
    minutesLeft = getPadding(minutesLeft) + minutesLeft;
    var secondsLeft = seconds % 60;
    secondsLeft = getPadding(secondsLeft) + secondsLeft;
    return 'Time left - ' + minutesLeft + ':' + secondsLeft;
  }
}

function getPadding(num) {
  return num < 10 ? '0' : '';
}

function nextQuestion() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  questionElement.innerText =
    'Question ' +
    [currentQuestionIndex + 1] +
    ' of ' +
    questions.length +
    ': ' +
    questions[currentQuestionIndex].title;
  var startTime = seconds;

  questions[currentQuestionIndex].answers.forEach(function(answer) {
    var button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', function(event) {
      finishTime = seconds;
      answerTime = startTime - finishTime;
      selectAnswer(event);
    });
    answerButtonsElement.appendChild(button);
  });
}

function correctAnswerNotification() {
  answerStatus.textContent = 'Correct!';
  answerStatus.classList.remove('hide');
  answerStatus.classList.add('correct-answer');
  if (soundsChecked) {
    playCorrectSound();
  }
  setTimeout(function() {
    answerStatus.textContent = '';
    answerStatus.classList.add('hide');
    answerStatus.classList.remove('correct-answer');
  }, 1000);
}

function wrongAnswerNotification() {
  answerStatus.textContent = 'Incorrect!';
  answerStatus.classList.remove('hide');
  answerStatus.classList.add('wrong-answer');
  if (soundsChecked) {
    playWrongSound();
  }
  setTimeout(function() {
    answerStatus.textContent = '';
    answerStatus.classList.add('hide');
    answerStatus.classList.remove('wrong-answer');
  }, 1000);
}

function playCorrectSound() {
  document.getElementById('correctAudio').play();
}

function playWrongSound() {
  document.getElementById('wrongAudio').play();
}

function selectAnswer(event) {
  var selectedButton = event.target;
  var correct = selectedButton.dataset.correct;
  if (correct) {
    var multiplier;
    if (answerTime < 5) {
      multiplier = maxQuestionScore;
    } else if (answerTime >= 5 || answerTime < 10) {
      multiplier = 4;
    } else if (answerTime >= 10 || answerTime < 15) {
      multiplier = 2;
    } else {
      multiplier = 1;
    }
    score += multiplier;
    ++questionsCorrect;
    correctAnswerNotification();
  } else {
    seconds = seconds - 15;
    wrongAnswerNotification();
  }
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    nextQuestion();
  } else {
    finish();
    clearInterval(gameClockInterval);
    submitButton.addEventListener('click', submitScore);
  }
}

function finish() {
  questionContainerElement.classList.add('hide');
  userScore.innerText = score;
  answeredCorrect.innerText = questionsCorrect;
  possibleTotal.innerText = questions.length * maxQuestionScore;
  total.innerText = questions.length;
  finalScoreElement.classList.remove('hide');
  gameClockElement.classList.add('hide');
}

function init() {
  var storedHighScoresInitials = '';
  if (highScoresTable === 'JavaScript') {
    storedHighScoresInitials = JSON.parse(
      localStorage.getItem('storedHighScoresInitials')
    );
  }
  if (highScoresTable === 'World Capitals') {
    storedHighScoresInitials = JSON.parse(
      localStorage.getItem('storedHighScoresInitialsWorldCapitals')
    );
  }
  if (storedHighScoresInitials !== null) {
    highScoresInitials = storedHighScoresInitials;
  }
  highScoresInitials.sort(compare);
}

function submitScore(event) {
  event.preventDefault();
  modalElement.classList.remove('hide');
  firstInitial.focus();
}

firstInitial.addEventListener('keyup', function() {
  secondInitial.focus();
});

secondInitial.addEventListener('keyup', function() {
  thirdInitial.focus();
});

thirdInitial.addEventListener('keyup', sendScoreToStorage);

function sendScoreToStorage(event) {
  event.preventDefault();
  modalElement.classList.add('hide');
  var yourName = firstInitial.value + secondInitial.value + thirdInitial.value;
  yourName = yourName.toUpperCase();
  if (yourName === '') {
    return;
  }
  init();
  var yourObj = {
    name: yourName,
    score: score,
    maxScore: possibleTotal.innerText,
    percent: Math.floor((score / parseInt(possibleTotal.innerText)) * 100)
  };
  highScoresInitials.push(yourObj);
  highScoresInitials.sort(compare);
  finalScoreElement.classList.add('hide');
  restart.classList.remove('hide');
  highScores.classList.remove('hide');
  storeHighScoresInitials();
  renderHighScoresInitials();
}

function compare(a, b) {
  var scorerA = a.percent;
  var scorerB = b.percent;

  var comparison = 0;
  if (scorerA < scorerB) {
    comparison = 1;
  } else if (scorerA > scorerB) {
    comparison = -1;
  }
  return comparison;
}

function storeHighScoresInitials() {
  if (highScoresTable === 'JavaScript') {
    localStorage.setItem(
      'storedHighScoresInitials',
      JSON.stringify(highScoresInitials)
    );
  }
  if (highScoresTable === 'World Capitals') {
    localStorage.setItem(
      'storedHighScoresInitialsWorldCapitals',
      JSON.stringify(highScoresInitials)
    );
  }
}

function renderHighScoresInitials() {
  highScoresList.innerHTML = '';
  for (var i = 0; i < highScoresInitials.length; i++) {
    var highScorer = highScoresInitials[i];
    var li = document.createElement('li');
    li.textContent =
      i +
      1 +
      '. ' +
      highScorer.name +
      ': ' +
      highScorer.score +
      ' out of ' +
      highScorer.maxScore +
      ' at ' +
      highScorer.percent +
      '%';
    li.setAttribute('data-index', i);
    var button = document.createElement('button');
    button.textContent = 'Remove';
    li.appendChild(button);
    highScoresList.appendChild(li);
  }
  leaderTitle.textContent = highScoresTable + ' Leader Board';
}

highScoresList.addEventListener('click', function(event) {
  var element = event.target;
  if (element.matches('button')) {
    var index = element.parentElement.getAttribute('data-index');
    highScoresInitials.splice(index, 1);
    storeHighScoresInitials();
    renderHighScoresInitials();
  }
});

restartButton.addEventListener('click', function() {
  location.reload();
});

closeElement.addEventListener('click', function() {
  modalElement.classList.add('hide');
});
