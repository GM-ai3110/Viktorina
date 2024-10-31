const questions = [
    {
        question: "Кое от следните е твърдо тяло?",
        answers: [
            { text: "Вода", correct: false },
            { text: "Лед", correct: true },
            { text: "Въздух", correct: false }
        ]
    },
    {
        question: "Кое от изброените вещества е газообразно?",
        answers: [
            { text: "Камък", correct: false },
            { text: "Въздух", correct: true },
            { text: "Пясък", correct: false }
        ]
    },
    {
        question: "Какво представляват телата?",
        answers: [
            { text: "Неща, които заемат определено място и имат маса", correct: true },
            { text: "Само течности", correct: false },
            { text: "Само твърди предмети", correct: false }
        ]
    },
    // Добавете още въпроси тук
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = `Точки: ${score}`;
    nextButton.innerText = "Следващ въпрос";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }
    scoreElement.innerText = `Точки: ${score}`;
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.style.display = "inline-block";
    } else {
        nextButton.innerText = "Край";
        nextButton.style.display = "inline-block";
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    resetState();
    questionElement.innerText = `Вие събрахте общо ${score} точки.`;
    if (score >= 9) {
        scoreElement.innerText = "Справихте се отлично!";
    } else if (score >= 7) {
        scoreElement.innerText = "Справихте се много добре!";
    } else if (score >= 5) {
        scoreElement.innerText = "Справихте се добре!";
    } else {
        scoreElement.innerText = "Прочети още по темата и играй отново!";
    }
    nextButton.innerText = "Играй отново";
    nextButton.style.display = "inline-block";
    nextButton.addEventListener("click", startGame);
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        handleNextButton();
    } else {
        startGame();
    }
});

startGame();