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

var score = 0;
var question = 0;
var newAnswer = '';
function questionTime() {
    questionBox.textContent = questions[question].title;
    newAnswer = questions[question].answer;
    for (var i = 0; i < questions[question].choices.length; i++) {
        var answerButton = document.createElement('button');
        answerButton.textContent = questions[question].choices[i];
        answerBox.appendChild(answerButton);
    }
    answerBox.addEventListener('click', function () {
        if (event.target.nodeName === 'BUTTON') {
            userAnswer = event.target.textContent;
            if (userAnswer === newAnswer) {
                alert('Correct!');
                score++;
            } else {
                alert('Wrong!');
            }
            questionBox.textContent = '';
            while (answerBox.firstChild) {
                answerBox.removeChild(answerBox.firstChild);
            }
            if (question < questions.length - 1) {
                question++;
                questionTime();
            } else {
                alert('finished! Your score is ' + score + ' out of ' + questions.length + '!');
            }
        }
    });
}










