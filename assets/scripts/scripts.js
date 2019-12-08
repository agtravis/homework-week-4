



var mainContent = document.getElementById('main');
var timeToStart = document.getElementById('countdown');

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
//set score to zero
var score = 0;
//set question to zero
var question = 0;
function questionTime() {

    //create new element to hold question
    var newQuestion = document.createElement('p');
    //attach new empty question element to container
    mainContent.appendChild(newQuestion);
    //create div to hold answer selection
    var answerBox = document.createElement('div');
    mainContent.appendChild(answerBox);
    //answer is blank
    var newAnswer = '';
    //set new question to question drawn from array
    newQuestion.textContent = questions[question].title;
    //set new answer to correct answer drawn from array
    newAnswer = questions[question].answer;
    //ask user for answer
    for (var i = 0; i < questions[question].choices.length; i++) {
        var answerButton = document.createElement('button');
        answerButton.setAttribute('id', 'answerButton' + i);
        answerButton.textContent = questions[question].choices[i];
        answerBox.appendChild(answerButton);
    }
    answerBox.addEventListener('click', function () {
        if (event.target.nodeName === 'BUTTON') {
            userAnswer = event.target.textContent;
            if (userAnswer === newAnswer) {
                alert('Correct!');
                score++;
                alert(score);
            } else {
                alert('Wrong!');
                alert(score);
            }
            question++;
            while (mainContent.firstChild) {
                mainContent.removeChild(mainContent.firstChild);
            }
        }
    });


}

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

