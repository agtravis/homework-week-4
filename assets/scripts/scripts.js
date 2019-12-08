



var mainContent = document.getElementById('main');
var timeToStart = document.getElementById('countdown');

var questionBox = document.getElementById('questionBox');
var answerBox = document.getElementById('answerBox');

document.getElementById('begin').addEventListener('click', function () {
    timeToStart.textContent = 'This quiz will start in 5...'
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
var score = 0;
var question = 0;
function questionTime() {
    var newAnswer;
    //set new question to question drawn from array
    questionBox.textContent = questions[question].title;
    //set new answer to correct answer drawn from array
    newAnswer = questions[question].answer;
    //create answer choices
for (var i = 0; i < questions[question].choices.length; i++) {
        var answerButton = document.createElement('button');
        answerButton.setAttribute('id', 'answerButton' + i);
        answerButton.textContent = questions[question].choices[i];
        answerBox.appendChild(answerButton);
    }
    //take user choice and compare to actual answer
    answerBox.addEventListener('click', function () {
        if (event.target.nodeName === 'BUTTON') {
            userAnswer = event.target.textContent;
            if (userAnswer === newAnswer) {
                alert('Correct!');
                score++;
            } else {
                alert('Wrong!');
            }
            alert(score);
            question++;
        }
    });
}









// for (var i = 0; i < questions[question].choices.length; i++) {
//     var answerButton = document.getElementById('btn' + i);
//     answerButton.textContent = questions[question].choices[i];
// }





//elem.parentNode.removeChild(elem);
// while (el.firstChild) el.removeChild(el.firstChild);
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


    // document.getElementById('answerButton').addEventListener('click', function () {
    //     alert('You clicked continue');
    //     if (question < 3) {
    //         questionTime();
    //     } else {
    //         alert('finished!');
    //     }
    // });

