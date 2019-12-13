//getting elements from the HTML and storing them as variables
var timeToStart = document.getElementById('countdown');
var startButton = document.getElementById('start-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var finalScoreElement = document.getElementById('submit-score');
var userScore = document.getElementById('score');
var total = document.getElementById('total');
var gameClockElement = document.getElementById("countdownGame");
var toHighScores = document.getElementById('to-high-scores');
var highScores = document.getElementById('high-scores');
var instructions = document.getElementById('instructions');
var quizTitle = document.getElementById('quiz-title');
var answeredCorrect = document.getElementById('questions-correct');
var possibleTotal = document.getElementById('possible-total');

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

//prime the gameclock
gameClockElement.textContent = 'Seconds left: ' + seconds;

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
    var timeLeft = 5;
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
        gameClockElement.textContent = 'Seconds left: ' + seconds;
        //if the timer runs out - has to be set to <= due to penalty seconds deductions meaning it could skip zero
        if (seconds <= 0) {
            //alert
            alert('You ran out of time!');
            //hide the question div
            finish();
            clearInterval(gameClockInterval);
        }
    }, 1000);
    //get the hidden question container div and show it
    questionContainerElement.classList.remove('hide');
    //run the function to set the question
    nextQuestion();
}

function nextQuestion() {
    //as long as the answer buttons div has a first child, i.e. any contents
    while (answerButtonsElement.firstChild) {
        //remove that first child
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    //set the question to the property 'title' for the current iteration index of the questions array
    questionElement.innerText = questions[currentQuestionIndex].title;
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
        button.addEventListener('click', function (e) {
            finishTime = seconds;
            answerTime = startTime - finishTime;
            selectAnswer(e);
        });
        //append the button to the div
        answerButtonsElement.appendChild(button);
    });
}

//handling the answer. The event type is passed
function selectAnswer(e) {
    //store the event (click) target (button) to a variable
    var selectedButton = e.target;
    // set a new variable to hold whether or not the data attribute exists - remember if it was false it does NOT have this attribute, and returns false
    var correct = selectedButton.dataset.correct;
    // if the answer is the correct one
    if (correct) {
        //the score increases
        var multiplier;
        if (answerTime < 5) {
            multiplier = 6;
        } else if (answerTime >= 5 || answerTime < 10) {
            multiplier = 4;
        } else if (answerTime >= 10 || answerTime < 15) {
            multiplier = 2;
        } else {
            multiplier = 1;
        }
        score += multiplier;
        questionsCorrect++;
    } else {
        seconds = seconds - 15;
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
    }
}

function finish() {
    //hide the question div
    questionContainerElement.classList.add('hide');
    //set user score text to the score
    userScore.innerText = score;
    answeredCorrect.innerText = questionsCorrect;
    possibleTotal.innerText = questions.length * 6; // max multiplier hard coded
    //set total to length of array of questions
    total.innerText = questions.length;
    //show final score div
    finalScoreElement.classList.remove('hide');
    //hide clock
    gameClockElement.classList.add('hide');
    //show button for final scores
    toHighScores.classList.remove('hide');
}

toHighScores.addEventListener('click', function () {
    highScores.classList.remove('hide');
    toHighScores.classList.add('hide');
});