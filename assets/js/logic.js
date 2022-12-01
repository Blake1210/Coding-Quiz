// variables to keep track of the quiz
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedBackEl = document.getElementById('feedback');

function beginQuiz() {
    //removes start screen
    var startEl = document.getElementById('start-screen');
    startEl.setAttribute('class', 'hide');

    //shows question section
    questionsEl.removeAttribute('class');

    //Start timer
    timerId = setInterval(timer, 1000);

    //shows starting time
    timerEl.textContent = time;

    nextQuestion();
}

//will pull next question fron question.js
function nextQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    
    var title = document.getElementById('question-title');
    title.textContent = currentQuestion.title;

    choicesEl.innerHTML = '';

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);

        choiceNode.textContent = i + 1 + '. ' + choice;

        choicesEl.appendChild(choiceNode);
    }
}

//reactions to when a button is clicked for an answer
function answeringQuestion(event) {
    var buttonEl = event.target

    if (!buttonEl.matches('.choice')) {
        return;
    }

    if (buttonEl.value === questions[currentQuestionIndex].answer) {
        feedBackEl.textContent = 'Correct!';

    }

    else {

        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timerEl.textContent = time

        feedBackEl.textContent = 'Wrong!';
    }

    feedBackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
        feedBackEl.setAttribute('class', 'feedback hide');
    }, 1000);

    currentQuestionIndex++;

    if (time <= 0 || currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        nextQuestion();
    }
}

//ends the quiz and takes you to the score screen
function endQuiz() {
    clearInterval(timerId);

    var endScreen = document.getElementById('end-screen');
    endScreen.removeAttribute('class');

    var finalScore = document.getElementById('final-score');
    finalScore.textContent = time;

    questionsEl.setAttribute('class', 'hide');
    
}

function timer() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        endQuiz();
    }
}

function saveHighscore() {
    var initials = initialsEl.value.trim();

    if (initials !== '') {
        var highscores =
        JSON.parse(window.localStorage.getItem('highscores')) || [];

        var newHighscore = {
            score: time,
            initials: initials,
        };

        highscores.push(newHighscore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

        window.location.href = 'highscores.html';
    }
}

function enterScore(event) {
    if (event.key === 'Enter') {
        saveHighscore();
    }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = beginQuiz;

choicesEl.onclick = answeringQuestion;

initialsEl.onkeyup = enterScore;