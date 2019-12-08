



var mainContent = document.getElementById('main');
// var readEl = document.getElementById('read');
var timeToStart = document.getElementById('countdown');
// var bodyEl = document.createElement('div');

document.getElementById('begin').addEventListener('click', function () {
    timeToStart.textContent = 'This quiz will start in 5...'
    start();
});



function start() {
    var timeLeft = 5;

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

var questionArr = ['question 1', 'question 2', 'question 3'];
var answerArr = ['answer 1', 'answer 2', 'answer 3'];


function questionTime() {
    //set score to zero
    var score = 0;
    //create new element to hold question
    var newQuestion = document.createElement('p');
    //attach new empty question element to div
    mainContent.appendChild(newQuestion);
    //answer is blank
    var newAnswer = '';

    for (var i = 0; i < 3; i++) {
        //set new question to question drawn from array
        newQuestion.textContent = questionArr[i];
        //set new answer to correct answer drawn from array
        newAnswer.textContent = answerArr[i];
        //ask user for answer
        var userAnswer = prompt('answer');
        //compare answer to question
        if (userAnswer === newAnswer) {
            //if correct score one point
            score++;
        }
        //if wrong 
        // reset content to ''

    }
    alert(score);

    // document.getElementById('answerButton').addEventListener('click', function () {
    //     alert('You clicked continue');
    //     if (question < 3) {
    //         questionTime();
    //     } else {
    //         alert('finished!');
    //     }
    // });

}