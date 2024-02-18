const questions = [
    {
        question: "Which is the largest animal in the world ?",
        answers:[
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Tiger", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the largest City in the world ?",
        answers:[
            {text: "New York City", correct: false},
            {text: "Vatican City", correct: false},
            {text: "Tokyo City", correct: true},
            {text: "Dhaka City", correct: false},
        ]
    },
    {
        question: "Which is the largest River in the world ?",
        answers:[
            {text: "Nile", correct: true},
            {text: "Amazon River", correct: false},
            {text: "Yellow River", correct: false},
            {text: "Congo River", correct: false},
        ]
    },
    {
        question: "Which is the largest hill in the world ?",
        answers:[
            {text: "Lhotse", correct: false},
            {text: "Everest", correct: true},
            {text: "Karakoram", correct: false},
            {text: "Kangchenjunga", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
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

function selectAnswer(e){
    const selectedBtn = e.target;
    const  isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
            selectedBtn.classList.add('incorrect');
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === 'true'){
                button.classList.add('correct');
            }
            button.disabled = true;
        });
        nextButton.style.display ="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
}else{
    showScore();

}
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
} 

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();

