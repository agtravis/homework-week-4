//getting elements from the HTML and storing them as variables
var timeToStart = document.getElementById('countdown');
var startButton = document.getElementById('start-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var answerStatus = document.getElementById('answer-status');
var finalScoreElement = document.getElementById('submit-score');
var userScore = document.getElementById('score');
var total = document.getElementById('total');
var gameClockElement = document.getElementById("countdownGame");
// var toHighScores = document.getElementById('to-high-scores');
var highScores = document.getElementById('high-scores');
var instructions = document.getElementById('instructions');
var quizTitle = document.getElementById('quiz-title');
var answeredCorrect = document.getElementById('questions-correct');
var possibleTotal = document.getElementById('possible-total');
var submitButton = document.getElementById('submit-btn');
var highScoresList = document.getElementById('high-scores-list');
var restart = document.getElementById('restart');
var restartButton = document.getElementById('restart-btn');
// var highScoresButton = document.getElementById('high-scores-btn');

var modalElement = document.querySelector('#modal-container');
var modalNameElement = document.querySelector('#modal-name');
var descriptionElement = document.querySelector('#description');
var closeElement = document.getElementById('close-popup');
var saveButton = document.getElementById('save');

var firstInitial = document.getElementById('first-initial');
var secondInitial = document.getElementById('second-initial');
var thirdInitial = document.getElementById('third-initial');

var highScoresInitials = [];

//declare outside of function so clear interval can be called at any point with scope
var gameClockInterval;

//set variables that will increase to start at zero
var currentQuestionIndex = 0;
var score = 0;
var questionsCorrect = 0;

//multiplied scoring variables
var startTime;
var finishTime;
var answerTime;


//15 seconds per question
var seconds = questions.length * 15;
var maxQuestionScore = 6;

//prime the gameclock
gameClockElement.textContent = commonSenseTime(seconds);

//when the user clicks start
startButton.addEventListener('click', function () {
    //the start button disappears
    startButton.classList.add('hide');
    instructions.classList.add('hide');
    quizTitle.classList.add('hide');
    //the countdown to start sentence is primed
    timeToStart.textContent = 'The quiz will start in 5...';
    //start the countdown
    start();
});

function start() {
    //5 seconds til the quiz starts
    var timeLeft = 1;//change!
    //trigger the timer, for each iteration
    var timeInterval = setInterval(function () {
        //the countdown text reads
        timeToStart.textContent = 'The quiz will start in ' + (timeLeft - 1) + '...';
        //the timer decrements one
        timeLeft--;
        //when the timer increments to zero
        if (timeLeft === 0) {
            //the interval is cleared and the timer stops iterating
            clearInterval(timeInterval);
            //the countdown div is hidden
            timeToStart.classList.add('hide');
            //the game clock div is visible
            gameClockElement.classList.remove('hide');
            //the quiz starts
            quizTime();
        }
        //1000 milliseconds means this loop occurs once per second
    }, 1000);
}

function quizTime() {
    //this variable has global scope, timer started
    gameClockInterval = setInterval(function () {
        //seconds decrement
        seconds--;
        //clock text displays
        gameClockElement.textContent = commonSenseTime(seconds);
        //if the timer runs out - has to be set to <= due to penalty seconds deductions meaning it could skip zero
        if (seconds <= 0) {
            //alert
            alert('You ran out of time!');
            clearInterval(gameClockInterval);
            //hide the question div
            finish();
            submitButton.addEventListener('click', submitScore);
        }
    }, 1000);
    //get the hidden question container div and show it
    questionContainerElement.classList.remove('hide');
    //run the function to set the question
    nextQuestion();
}

function commonSenseTime(seconds) {
    var minutesLeft = Math.floor(seconds / 60);
    minutesLeft = getPadding(minutesLeft) + minutesLeft;
    var secondsLeft = seconds % 60;
    secondsLeft = getPadding(secondsLeft) + secondsLeft;
    return 'Time left - ' + minutesLeft + ':' + secondsLeft;
}

function getPadding(num) {
    return num < 10 ? '0' : '';
}

function nextQuestion() {
    //as long as the answer buttons div has a first child, i.e. any contents
    while (answerButtonsElement.firstChild) {
        //remove that first child
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    //set the question to the property 'title' for the current iteration index of the questions array
    questionElement.innerText = 'Question ' + [currentQuestionIndex + 1] + ' of ' + questions.length + ': ' + questions[currentQuestionIndex].title;
    var startTime = seconds;

    //get the array of answer objects currently iterator on, and run a forEach loop on it. 'answer' is the parameter name I have given to each item in the aray
    questions[currentQuestionIndex].answers.forEach(function (answer) {
        //create a button
        var button = document.createElement('button');
        //assign the 'text' property value of the array object to the inner text of the button
        button.innerText = answer.text;
        //add the 'btn' class to the button
        button.classList.add('btn');
        //if answer.correct has a value of true (since only one of the four answers is assigned true)
        if (answer.correct) {
            //create a data attribute for the button that has the value of 'answer.correct'. Note the false answers do not get assigned a data attribute
            button.dataset.correct = answer.correct;
        }
        //add a listener for a click on a button, and if there is one pass the event to the function selectAnswer, which in turn passes the event
        button.addEventListener('click', function (event) {
            finishTime = seconds;
            answerTime = startTime - finishTime;
            selectAnswer(event);
        });
        //append the button to the div
        answerButtonsElement.appendChild(button);
    });
}

function correctAnswerNotification() {
    answerStatus.textContent = 'Correct!';
    answerStatus.classList.remove('hide');
    answerStatus.classList.add('correct-answer');
    setTimeout(function () {
        answerStatus.textContent = '';
        answerStatus.classList.add('hide');
        answerStatus.classList.remove('correct-answer');
    }, 1000);
}

function wrongAnswerNotification() {
    answerStatus.textContent = 'Incorrect!';
    answerStatus.classList.remove('hide');
    answerStatus.classList.add('wrong-answer');
    setTimeout(function () {
        answerStatus.textContent = '';
        answerStatus.classList.add('hide');
        answerStatus.classList.remove('wrong-answer');
    }, 1000);
}

//handling the answer. The event type is passed
function selectAnswer(event) {
    //store the event (click) target (button) to a variable
    var selectedButton = event.target;
    // set a new variable to hold whether or not the data attribute exists - remember if it was false it does NOT have this attribute, and returns false
    var correct = selectedButton.dataset.correct;
    // if the answer is the correct one
    if (correct) {
        //the score increases
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
        questionsCorrect++;
        correctAnswerNotification();
    } else {
        seconds = seconds - 15;
        wrongAnswerNotification();
    }
    //if the index of the current question is less than the number of questions in the array (subtracting one to account for the last index being one less than the length)
    if (currentQuestionIndex < questions.length - 1) {
        //increase the question index
        currentQuestionIndex++;
        //run the next question function
        nextQuestion();
    } else {
        //hide the game and show the finishing div with the dynamic data

        finish();
        //gameClockInterval variable accessible because of scope
        clearInterval(gameClockInterval);


        //this will submit to storage
        submitButton.addEventListener('click', submitScore);
    }
}

function finish() {
    //hide the question div
    questionContainerElement.classList.add('hide');
    //set user score text to the score
    userScore.innerText = score;
    answeredCorrect.innerText = questionsCorrect;
    possibleTotal.innerText = questions.length * maxQuestionScore; // max multiplier hard coded
    //set total to length of array of questions
    total.innerText = questions.length;
    //show final score div
    finalScoreElement.classList.remove('hide');
    //hide clock
    gameClockElement.classList.add('hide');
    //show button for final scores
    // toHighScores.classList.remove('hide');
}

// highScoresButton.addEventListener('click', function () {
//     highScores.classList.remove('hide');
//     toHighScores.classList.add('hide');
//     init();
//     renderHighScoresInitials();
// });



function init() {
    var storedHighScoresInitials = JSON.parse(localStorage.getItem('storedHighScoresInitials'));

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

firstInitial.addEventListener('keyup', function () {
    secondInitial.focus();
});

secondInitial.addEventListener('keyup', function () {
    thirdInitial.focus();
});

thirdInitial.addEventListener('keyup', sendScoreToStorage);

// saveButton.addEventListener('click', sendScoreToStorage);

function sendScoreToStorage(event) {
    event.preventDefault();
    // var yourName = prompt('Enter your initials');
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
    }
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
    localStorage.setItem('storedHighScoresInitials', JSON.stringify(highScoresInitials));
}

function renderHighScoresInitials() {
    highScoresList.innerHTML = '';

    for (var i = 0; i < highScoresInitials.length; i++) {
        var highScorer = highScoresInitials[i];

        var li = document.createElement('li');
        li.textContent = (i + 1) + '. ' + highScorer.name + ': ' + highScorer.score + ' out of ' + highScorer.maxScore + ' at ' + highScorer.percent + '%';
        li.setAttribute('data-index', i);

        var button = document.createElement('button');
        button.textContent = 'Remove';

        li.appendChild(button);
        highScoresList.appendChild(li);
    }
}

highScoresList.addEventListener('click', function (event) {
    var element = event.target;
    if (element.matches('button')) {
        var index = element.parentElement.getAttribute('data-index');
        highScoresInitials.splice(index, 1);
        storeHighScoresInitials();
        renderHighScoresInitials();
    }
});

restartButton.addEventListener('click', function () {
    location.reload();
});


closeElement.addEventListener('click', function () {
    modalElement.classList.add('hide');
});


// function handleClick(event) {
//     if (event.target.matches('button')) {
//       event.preventDefault();
//       modalElement.style.display = 'block';
//       currentId = parseInt(event.target.parentElement.id);
//       var name = people[currentId].name;
//       var description = people[currentId].description;
//       modalNameElement.textContent = name;
//       descriptionElement.value = description ? description : '';
//     }
//   }

//   closeElement.addEventListener('click', close);
//   saveButton.addEventListener('click', function (event) {
//     event.preventDefault();
//     people[currentId].description = descriptionElement.value;
//     close();
//   });

//   addButton.addEventListener('click', addPersonToList);
//   peopleListElement.addEventListener('click', handleClick);
//   document.addEventListener('click', function (event) {
//     if (event.target === modalElement) {
//       close();
//     }
//   });

