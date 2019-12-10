//getting elements from the HTML and storing them as variables
var timeToStart = document.getElementById('countdown');
var startButton = document.getElementById('start-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var finalScoreElement = document.getElementById('submit-score');
var userScore = document.getElementById('score');
var total = document.getElementById('total');

//set variables that will increase, to start at zero
var currentQuestionIndex = 0;
var score = 0;

startButton.addEventListener('click', function () {
    timeToStart.textContent = 'This quiz will start in 5...';
    start();
});

function start() {
    //change this to 5
    var timeLeft = 1;

    var timeInterval = setInterval(function () {
        timeToStart.textContent = 'This quiz will start in ' + (timeLeft - 1) + '...';
        --timeLeft;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timeToStart.textContent = '';
            quizTime();
        }

    }, 1000);
}

function quizTime() {
    //first hide the start button
    startButton.classList.add('hide');
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
        //the score increases by one
        score++;
    }
    //if the index of the current question is less than the number of questions in the array (subtracting one to account for the last index being one less than the length)
    if (currentQuestionIndex < questions.length - 1) {
        //increase the question index
        currentQuestionIndex++;
        //run the next question function
        nextQuestion();
    } else {
        //hide the game and show the finishing div with the dynamic data
        questionContainerElement.classList.add('hide');
        userScore.innerText = score;
        total.innerText = questions.length;
        finalScoreElement.classList.remove('hide');
        //this will submit to storage
    }
}
