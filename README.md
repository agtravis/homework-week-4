# homework-week-4

## Concept

To create a functioning quiz application that will present a user with multiple choice questions against a count-down clock. Correct choices score points that fluctuate based on time taken to answer, and incorrect choices incur a time deduction penalty.

Users will be able to save their scores by entering their initials.

## Rules of play

First the user must choose which quiz they wish to participate in. Then they click the start button, and a timer initiates preparing them to take the quiz. Once the first question is displayed, the actual game clock starts ticking. The game generates a time of 15 seconds per question, and so the overall time available depends on how many questions are in the user's choice.

If the user gets a question right, a message displayed in green flashes on screen, and if it is wrong, a similar message displays in red. If correct, depending on how long the user took to answer the question, a different score is applied: these scoring break points are detailed on the front page of the app. If the user answers incorrecly, 15 seconds are deducted from the clock and the user moves on to the next question.

Once all questions have been answered, the user's score is displayed and they are invited to enter their initials in a pop-up window to submit the score to the high scores board. After the initials are entered, the high scores board specifically for the quiz just taken. Each quiz has its own high scores board. If the time runs out, there is an alert to the user, and the same procedure happens.

At this point the user has the opportunity to take the quiz again, or a different quiz - clicking the button refreshes the browser and the start page loads again, ready to go.

## Writing the App

### HTML (& CSS)

My HTML is littered with a css class ```.hide```. This is toggled on and off in the JavaScript using ```.classList.[add/remove].('hide')```. All sorts of element tags are deliberately left without text child nodes because their content will be dynamically created with the JavaScript code, most notably the questions and answers. All they need is a targetted parent with an ID for the content and child nodes to be generated.

### JavaScript

First my JavaScript file collects all the elements I will be using and stores them as semantically named variables for future use. Next, I initiallize some other variables that will require global usage. Finally, before the game is started, the game glock is primed to display a message using a helper function that most of the time simply converts the seconds to a minutes & seconds display.

### Start

When the user clicks start, the first thing that happens is that the code reads the dropdown menu to see the user's choice. I wrote this app initially for one quiz and adapted it for additional quizzes. There are a few instances where my code may seem a little clunky, and this conditional is one of those instances. I will try to highlight these as I go, and specifically in this instance the array variable ```questions``` is reassigned another variable in the instance of the secondary quiz being selected. I have written the code this way simply because I successfully had the app working, and retro-engineered it to have access to the secondary set of questions. If I had written the app from the beginning with this intention, or if I decided to write it again, I would write the questions as arrays in objects, and assign the objects other properties that are used, such as the keys and headers. Here also the high scores array is set based on the user selection.

A countdown message appears and after it reaches zero the quiz begins proper, based on the user selection.

### Questions

For each question, the user is presented with a set of four answers. The questions are stored in a separate JavaScript file, and are broken down as follows:

1. 'questions' is an array.
1. This is an array of objects.
1. Each object has two properties: 'title' - a string, and 'answers' - an array.
1. the property 'answers' is another array of objects.
1. Each object here has two properties: 'text' - the answer string, and 'correct' which has a boolean value assign to it, true identifying the correct answer, and false for the 3 incorrect answers.

### Answers

Originally I had a different method of identifying the correct answer:

    answerBox.addEventListener('click', function () {
            if (event.target.nodeName === 'BUTTON') {
                userAnswer = event.target.textContent;
            }
            if (userAnswer === newAnswer) {
                alert('Correct!');
                score++;
            } else {
                alert('Wrong!');
            }

However, I decided to change my approach to the method I ended up using to confirm correct answers after seeing it in a tutorial. Here is how it works:

First, for each question to be generated, the code uses a ```while``` loop to remove any children as long as they exist. Once they are all gone, the current question index is used to identify the question in the array, and the property 'answers' is targeted and has a ```forEach``` method applied to its array which creates, fills with content, styles, and appends the answer button. Additionally for each button, the code checks to see if the answer is assigned the property 'correct' by seeing if that property returns true (which it will only do if it is assigned true as the value). In this instance, that button is assigned a ```dataset``` equal to the value of that property (i.e. ```true```). Incorrect answer choice buttons simply are not assigned a custome data value at all. You can see this in action in the developer tools here:

![dataset](https://github.com/agtravis/homework-week-4/blob/master/assets/images/dataset.PNG)

Also, while this is all happening, a variable is declared storing the value of the seconds when the question displays. When the user answers, another global variable is stored with the seconds count again, and thus the time it took the user to answer is available globally. This could also simply be a value passed to the next function, and if I was to re-write this program, that would be one of the things I would implement.

When the user answers, an answer function is called, and it does pass the event as an argument.

The answer function receives the event and assigns the target of the event (the button) to a variable. Next, the dataset attribute of correct is set to another variable, which again only holds a value (of anything) if it was the correct answer as defined by the code. A conditional runs, and if that most recently assigned variable returns true, the data attribute *exists* and therefore is correct, and a score is applied.

I am keeping track not just of the score but also of the questions answered correctly, so both those variables increment.

If the wrong answer is chosen, the seconds remaining has 15 seconds deducted from it - for this reason the countdown may skip zero and therefore never clear the interval, so the operator ```<=``` must be used.

Next the question index variable increments, and the next question function is called, as long as the question index is not greater than the amount of questions in the array, accounting for the ```length``` being 1 longer than the last index.

To finish, a series of spans in the HTML are assigned relevant values to inform the user how well they performed, and the user is asked if they want to enter their initials for record keeping.

### Keeping Score(s)

My ```init``` function refers to the scoreboard. First it checks for the user's quiz choice to define which key is used to accesss from local storage and display the correct table for the quiz taken. It also uses a helper function to organize the user scores so that the highest scorer is on the top. Note that I am only doing this by percent, so there will be ties.

The user is presented with a div styled to look ```absolute```ly like a pop-up. There are 3 boxes, each with a ```keyup``` event listener to either move the cursor over or ```submit``` if complete, and all lower case is converted to upper case. On submit, the leader board is displayed.
