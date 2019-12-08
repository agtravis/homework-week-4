



var mainContent = document.getElementById('main');
// var readEl = document.getElementById('read');
var timeToStart = document.getElementById('countdown');
// var bodyEl = document.createElement('div');

document.getElementById('begin').addEventListener('click', function () {
    timeToStart.textContent = 'This quiz will start in 5...'
    start();
});



function start() {
    var timeLeft = 1;

    var timeInterval = setInterval(function () {
        timeToStart.textContent = 'This quiz will start in ' + (timeLeft - 1) + '...';
        --timeLeft;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timeToStart.textContent = '';
            questionTime();
        }

    }, 1000);
}



var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    ///etc.
];
//set score to zero
var score = 0;
function questionTime() {

    //set question to zero
    var question = 0;
    //create new element to hold question
    var newQuestion = document.createElement('p');
    //attach new empty question element to div
    mainContent.appendChild(newQuestion);
    //answer is blank
    var newAnswer = '';
    //set new question to question drawn from array
    newQuestion.textContent = questions[question].title;
    //set new answer to correct answer drawn from array
    newAnswer.textContent = questions[question].answer;
    //ask user for answer
    for (var i = 0; i < questions[question].choices.length; i++) {
        var answerButton = document.createElement('button');
        answerButton.setAttribute('class', 'answer');
        answerButton.textContent = questions[question].choices[i];
        mainContent.appendChild(answerButton);
    }




    
    // document.querySelector('.answer').addEventListener('click', function () {
    //     alert(this.value);
    //     if (this.innerText === questions[question].answer) {
    //         console.log('score!');
    //         score++;
    //     }
    // });
    // var userAnswer = prompt(questions[question].choices);
    //compare answer to question

    //if wrong 
    // reset content to ''



    console.log(score);
}
    // document.getElementById('answerButton').addEventListener('click', function () {
    //     alert('You clicked continue');
    //     if (question < 3) {
    //         questionTime();
    //     } else {
    //         alert('finished!');
    //     }
    // });

