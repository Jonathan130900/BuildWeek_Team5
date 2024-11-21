const questions = [
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question: 'What does CPU stand for?',
    correct_answer: 'Central Processing Unit',
    incorrect_answers: [
      'Central Process Unit',
      'Computer Personal Unit',
      'Central Processor Unit',
    ],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: 'Final',
    incorrect_answers: ['Static', 'Private', 'Public'],
  },
  {
    category: 'Science: Computers',
    type: 'boolean',
    difficulty: 'easy',
    question: 'The logo for Snapchat is a Bell.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'Science: Computers',
    type: 'boolean',
    difficulty: 'easy',
    question:
      'Pointers were not used in the original C programming language; they were added later on in C++.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'What is the most preferred image format used for logos in the Wikimedia database?',
    correct_answer: '.svg',
    incorrect_answers: ['.png', '.jpeg', '.gif'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question: 'In web design, what does CSS stand for?',
    correct_answer: 'Cascading Style Sheet',
    incorrect_answers: [
      'Counter Strike: Source',
      'Corrective Style Sheet',
      'Computer Style Sheet',
    ],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'What is the code name for the mobile operating system Android 7.0?',
    correct_answer: 'Nougat',
    incorrect_answers: ['Ice Cream Sandwich', 'Jelly Bean', 'Marshmallow'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question: 'On Twitter, what is the character limit for a Tweet?',
    correct_answer: '140',
    incorrect_answers: ['120', '160', '100'],
  },
  {
    category: 'Science: Computers',
    type: 'boolean',
    difficulty: 'easy',
    question: 'Linux was first created as an alternative to Windows XP.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'Which programming language shares its name with an island in Indonesia?',
    correct_answer: 'Java',
    incorrect_answers: ['Python', 'C', 'Jakarta'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'hard',
    question:
      'Which of the following programming languages is considered a dialect of Lisp?',
    correct_answer: 'Scheme',
    incorrect_answers: ['Java', 'Python', 'C++'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'hard',
    question:
      'Which company developed the first microprocessor, the Intel 4004?',
    correct_answer: 'Intel',
    incorrect_answers: ['AMD', 'IBM', 'Microsoft'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'hard',
    question:
      'Which of these is the most used version control system in the open-source community?',
    correct_answer: 'Git',
    incorrect_answers: ['SVN', 'Mercurial', 'CVS'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'hard',
    question: 'Which of these programming languages is *not* compiled?',
    correct_answer: 'Python',
    incorrect_answers: ['C', 'Java', 'Go'],
  },
  {
    category: 'Science: Computers',
    type: 'boolean',
    difficulty: 'hard',
    question:
      'In computer science, "Big O notation" is used to measure time complexity only.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'hard',
    question: 'What does the command "chmod 777" do in Unix-based systems?',
    correct_answer: 'Gives full permissions to all users',
    incorrect_answers: [
      'Gives read-only permission to the owner',
      'Removes execute permissions',
      'Changes the owner of a file',
    ],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'hard',
    question:
      'Which of the following is a technique used to test the behavior of a program under stress or high loads?',
    correct_answer: 'Load Testing',
    incorrect_answers: [
      'Unit Testing',
      'Integration Testing',
      'Regression Testing',
    ],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'hard',
    question:
      'What is the main difference between an interpreter and a compiler?',
    correct_answer:
      'An interpreter translates code line-by-line, whereas a compiler translates the entire program at once.',
    incorrect_answers: [
      'Interpreters are faster than compilers',
      'Compilers are slower than interpreters',
      'There is no difference',
    ],
  },
  {
    category: 'Science: Computers',
    type: 'boolean',
    difficulty: 'hard',
    question: 'The first version of UNIX was written in Assembly language.',
    correct_answer: 'True',
    incorrect_answers: ['False'],
  },
  {
    category: 'Science: Computers',
    type: 'multiple',
    difficulty: 'hard',
    question:
      'Which company developed the first graphical web browser, Mosaic?',
    correct_answer: 'NCSA',
    incorrect_answers: ['Microsoft', 'Apple', 'Netscape'],
  },
];

document.addEventListener('DOMContentLoaded', () => {
  inizializzaPunteggio();
  iniziaCountdown();
});

const timerDisplay = document.getElementById('timer');
const canvas = document.getElementById('timerCanvas');
const grafica2d = canvas.getContext('2d');
let durata = 30;
const durataTotale = 30;
let timerInterval;
const maxDomande = 10;
let domandeMostrate = [];
let contatoreDomande = 0;
const contatoreDisplay = document.getElementById('contatoreDomande');
const questionsContainer = document.getElementById('domandeContainer');

function iniziaCountdown() {
  contatoreDisplay.style.display = 'none';

  const countdownWrapper = document.createElement('div');
  countdownWrapper.id = 'countdownWrapper';
  countdownWrapper.style.textAlign = 'center';
  countdownWrapper.style.margin = '20px 0';

  const countdownText = document.createElement('p');
  countdownText.id = 'startCountdownP';
  countdownText.textContent = 'Quiz starts in';
  countdownText.style.fontSize = '24px';
  countdownText.style.marginBottom = '10px';

  const countdownDisplay = document.createElement('div');
  countdownDisplay.id = 'startCountdownDiv';
  countdownDisplay.textContent = '3';

  countdownWrapper.appendChild(countdownText);
  countdownWrapper.appendChild(countdownDisplay);
  questionsContainer.appendChild(countdownWrapper);

  let countdownValue = 3;

  const countdownInterval = setInterval(() => {
    countdownValue--;
    countdownDisplay.textContent = countdownValue;

    if (countdownValue <= 0) {
      clearInterval(countdownInterval);
      countdownWrapper.remove();

      contatoreDisplay.style.display = 'block';
      avviaQuiz();
    }
  }, 1000);
}

function avviaQuiz() {
  drawCircle(1);
  aggiornaTimer();
  timerInterval = setInterval(aggiornaTimer, 1000);
  generaDomanda();
}

function aggiornaContatore() {
  contatoreDisplay.textContent = `QUESTION ${contatoreDomande}/${maxDomande}`;
}

function drawCircle(percentage, timeLeft) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 4;
  const radius = 60;
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + 2 * Math.PI * percentage;

  grafica2d.clearRect(0, 0, canvas.width, canvas.height);

  grafica2d.beginPath();
  grafica2d.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  grafica2d.fillStyle = 'transparent';
  grafica2d.fill();

  grafica2d.beginPath();
  grafica2d.arc(centerX, centerY, radius, startAngle, endAngle);
  grafica2d.lineWidth = 10;
  if (durata > 10) {
    grafica2d.strokeStyle = '#00FF00';
  } else if (durata <= 10) {
    grafica2d.strokeStyle = '#FF0000';
  }
  grafica2d.stroke();

  timerDisplay.textContent = durata;

  grafica2d.font = '30px Arial';
  if (durata > 10) {
    grafica2d.fillStyle = '#FFFFFF';
  } else if (durata <= 10) {
    grafica2d.fillStyle = '#FF0000';
  }

  grafica2d.textAlign = 'center';
  grafica2d.textBaseline = 'middle';
  grafica2d.fillText(timeLeft, centerX, centerY);
}

function aggiornaTimer() {
  const percentage = durata / durataTotale;
  drawCircle(percentage, durata);

  if (durata <= 0) {
    generaDomanda();
    resetTimer();
  } else {
    durata--;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  durata = durataTotale;
  aggiornaTimer();
  timerInterval = setInterval(aggiornaTimer, 1000);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function inizializzaPunteggio() {
  const data = JSON.parse(localStorage.getItem('quizResults')) || {
    score: 0,
    answers: [],
  };
  localStorage.setItem('quizResults', JSON.stringify(data));
}

function aggiornaPunteggio() {
  const data = JSON.parse(localStorage.getItem('quizResults')) || {
    score: 0,
    answers: [],
  };
  data.score += 1;
  localStorage.setItem('quizResults', JSON.stringify(data));
}

function generaDomanda() {
  if (contatoreDomande >= maxDomande) {
    clearInterval(timerInterval);
    canvas.style.display = 'none';
    timerDisplay.style.display = 'none';
    contatoreDisplay.style.display = 'none';

    const divDomanda = document.getElementById('domande');
    divDomanda.innerHTML = `<h2>Quiz terminato!</h2>`;

    const bottoneProssimaPagina = document.createElement('button');
    bottoneProssimaPagina.textContent = 'Go to Results';
    bottoneProssimaPagina.id = 'btnNextPage2';
    bottoneProssimaPagina.addEventListener('click', () => {
      window.location.href = 'index-3.html';
    });

    divDomanda.appendChild(bottoneProssimaPagina);
    return;
  }

  let indiceCasuale;
  do {
    indiceCasuale = Math.floor(Math.random() * questions.length);
  } while (domandeMostrate.includes(indiceCasuale));

  domandeMostrate.push(indiceCasuale);
  contatoreDomande++;

  aggiornaContatore();
  const domandaSelezionata = questions[indiceCasuale];
  const divQuestion = document.getElementById('domande');
  divQuestion.innerHTML = `<h3>${domandaSelezionata.question}</h3>`;

  let answers = [
    ...domandaSelezionata.incorrect_answers,
    domandaSelezionata.correct_answer,
  ];
  shuffleArray(answers);

  const buttons = [];
  answers.forEach((answer) => {
    const btnAnswer = document.createElement('button');
    btnAnswer.textContent = answer;
    btnAnswer.id = 'btnAnswers';
    btnAnswer.addEventListener('click', () => {
      buttons.forEach((btn) => (btn.disabled = true));

      const data = JSON.parse(localStorage.getItem('quizResults')) || {
        score: 0,
        answers: [],
      };

      const isCorrect = answer === domandaSelezionata.correct_answer;
      if (isCorrect) {
        btnAnswer.classList.add('correct-answer');
        data.score += 1;
      } else {
        btnAnswer.classList.add('incorrect-answer');
      }

      data.answers.push({
        question: domandaSelezionata.question,
        givenAnswer: answer,
        correctAnswer: domandaSelezionata.correct_answer,
        isCorrect: isCorrect,
      });

      localStorage.setItem('quizResults', JSON.stringify(data));

      setTimeout(() => {
        resetTimer();
        generaDomanda();
      }, 1000);
    });

    buttons.push(btnAnswer);
    divQuestion.appendChild(btnAnswer);
  });
}
