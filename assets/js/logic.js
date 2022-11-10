// variables to keep track of the quiz
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choisesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedBackEl = document.getElementById('feedback');

function beginQuiz() {
    
    var startEl = document.getElementById('start-screen');
    startEl.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    timerId = setInterval(timer, 1000);

    timerEl.textContent = time;

    nextQuestion();
}

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

function answeringQuestion(event) {
    var buttonEl = event.target

    if (!buttonEl.matches('choice')) {
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
        quizEnd();
    } else {
        getQuestion();
    }
}