const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Thar", correct: false },
            { text: "Sahara", correct: true },
            { text: "Gobi", correct: false },
            { text: "Arctic", correct: false },
        ]
    },
    {
        question: "Which is the largest ocean in the world?",
        answers: [
            { text: "Indian", correct: false },
            { text: "Pacific", correct: true },
            { text: "Arctic", correct: false },
            { text: "Atlantic", correct: false },
        ]
    },
    {
        question: "Which is the largest continent in the world?",
        answers: [
            { text: "Australia", correct: false },
            { text: "Asia", correct: true },
            { text: "North America", correct: false },
            { text: "Africa", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0; 
    score = 0; 
    nextButton.innerHTML = "Next";
    resetState(); 
    showQuestion(); 
}

function showQuestion() {
    resetState();
    if (questions.length === 0) {
        questionElement.innerHTML = "No questions available.";
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none"; 
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; 
    });
    nextButton.style.display = "block"; 
}

function showScore() {
    resetState(); 
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"; 
    nextButton.style.display = "block"; 
}

function handleNextButton() {
    if (nextButton.innerHTML === "Play Again") {
        startQuiz(); 
    } else if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++; 
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", handleNextButton);

startQuiz();