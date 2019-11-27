//question database
const STORE = [{
        question: 'What is the count for dancing salsa On2?',
        options: [
            '123-567',
            '1234-5678',
            'No count- just dance to the beat',
            'Just stand there and watch everyone else'
        ],
        correctAnswer: '123-567'
    },
    {
        question: 'What foot do men start with?',
        options: [
            'Men start with their right foot',
            'They do not start with their foot at all',
            'Men hop forward towards their dance partner',
            'Men start with their left foot'
        ],
        correctAnswer: 'Men start with their left foot'
    },
    {
        question: 'Is it ok for men to use their hips?',
        options: [
            'NO, they must dance in a stiff manner',
            'Yes, let the rythm take over',
            'Men must move their hips more than their partner',
            'None of the above'
        ],
        correctAnswer: 'Yes, let the rythm take over'
    },
    {
        question: 'What happened to "4" and "8" in the dance count?',
        options: [
            'They do not exist',
            'The person who created can not count',
            'The count exist, it is in the air shifting back and forward',
            'None of the above'
        ],
        correctAnswer: 'The count exist, it is in the air shifting back and forward'
    },
    {
        question: 'Do you need to bring a dance partner to class?',
        options: [
            'Yes or you will be dancing solo',
            'You can dance with the wall',
            'No need to bring a partner',
            'None of the above'
        ],
        correctAnswer: 'No need to bring a partner'
    }
];

// //variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

// handle restart button
function restartQuiz() {
    $('.quiz-container').on('click', '.restartButton', function(event) {
        console.log('restart')
        resetStats();
        $('.finalBox').hide()
        startQuiz()
    });
}

function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(1);
}


// generate HTML final screen
// render final screen when the questions are done
function finalScore() {
    $('.finalBox').show()

    const great = [
        'Great job!',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkARYwiSG3NIk2h0F7pLsW-oJ5hOLkI52nkc-rEDxy9_xTGrdKA&s',
        'baby with nailed it comment',
        'WEPA...time to dance!'
    ];

    const good = [
        'Good, not great.',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIjHZlzgjh7z2dsWgEsd9HHkcq7QcjI87VfGQW-CUvDbXw6lXw&s',
        'baby in a tux',
        'You should keep studying about salsa...'
    ];

    const bad = [
        'OH VEY!?!',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyV--5ZFtvb3mOx0pC8nUOTjBVp0WqBnBP4TBO5zp0wnMPppuKwA&s',
        'crying baby',
        'Is this your best effort?'
    ];

    if (score >= 4) {
        array = great;
    } else if (score < 4 && score >= 3) {
        array = good;
    } else {
        array = bad;
    }
    $('.finalBox').html(
        `<h3>${array[0]}</h3>
        <img src="${array[1]}" alt="${array[2]}" class="images">
          <h3>Your score is ${score} / 5</h3>
          <p class="sizeMe">${array[3]}</p>
          <button type="submit" class="restartButton button">Restart</button>`
    );
}

// handle next button click
function nextQuestion() {
    $('.quiz-container').on('click',
        '.nextButton',
        function(event) {
            $('.responseBox').hide();
            questionNumber++;
            if (questionNumber < STORE.length) {
                updateQuestionNumber();
                $('.questionBox').show();
                renderQuestion();
            } else {
                finalScore()
            }
        });
}

// update quiz info
function updateScore() {
    score++;
    $('.score').text(score);
}

// and questionNumber
function updateQuestionNumber() {
    $('.questionNumber').text(questionNumber + 1)
}

// grade the answer
function gotItRight() {
    console.log('got it right')
    $('.responseBox').html(
        `<h3>Correcto!</h3>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd1AYIn4VTdg_xgGfnSv2m5geBUOlmcOzSvUKlfcAGD3n-KuRr&s" alt="dance shoes" class="images" width="200px">
        <p class="sizeMe">You got this...get your dance shoes ready!</p>
        <button type="button" class="nextButton button">Next</button>`
    );
    updateScore();
}

function gotItWrong() {
    $('.responseBox').html(
        `<h3>Incorrecto...</h3>
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Salsa_Basic_Steps%2C_LA-style.png" alt="dance steps model" class="images" width="200px">
      <p class="sizeMe">The correct answer is:</p>
      <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
      <button type="button" class="nextButton button">Next</button>`
    );

}

function gradeAnswer(answer) {
    if (answer === STORE[questionNumber].correctAnswer) {
        gotItRight();
    } else {
        gotItWrong();
    }
}

function submitAnswer() {
    $('.questionBox').on('submit', function(e) {
        event.preventDefault();
        $('.questionBox').hide();
        $('.responseBox').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNumber].correctAnswer;
        console.log(answer, correct, answer === correct)
        if (answer === correct) {
            gotItRight();
        } else {
            gotItWrong();
        }
    });

}

// generate HTML for a question
function generateHTMLQuestion() {

    const question = STORE[questionNumber].question;
    const inputs = STORE[questionNumber].options.map(option => {
        console.log(option);
        return (`<input type='radio' name='question-input' id='${option}' value="${option}" required />
      <label class='question-label' for='${option}'>${option}</label>`)
    }).join('')

    let questionHTML = $(`<form class='question-form'>
      <fieldset>
      <legend class= "question-string" required>${STORE[questionNumber].question}</legend>
      ${inputs}
      <input type='submit' />
    </form>`)

    return questionHTML;
}

// render a question
function renderQuestion() {
    const questionHTML = generateHTMLQuestion()
    $('.questionBox').html(questionHTML)
}

// handle start button 
function handleStartClick() {
    $('#start').on('click', function(e) {
        $('.landing-page').hide()
        startQuiz()
    })
}

function startQuiz() {
    $('.quiz-info').show()
    $('.questionBox').show()
    renderQuestion()
}

//runs the functions
function makeQuiz() {
    handleStartClick();
    renderQuestion();
    nextQuestion();
    submitAnswer();
    restartQuiz();
}

$(makeQuiz);