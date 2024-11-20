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
];

document.addEventListener('DOMContentLoaded', () => {
  inizializzaPunteggio();
  iniziaCountdown();
});

const timerDisplay = document.getElementById('timer');
const canvas = document.getElementById('timerCanvas');
const grafica2d = canvas.getContext('2d');
let durata = 30; // Tempo iniziale
const durataTotale = 30;
let timerInterval; // Intervallo globale per gestire il timer
const maxDomande = 10; // Numero massimo di domande
let domandeMostrate = []; // Array per tenere traccia delle domande mostrate
let contatoreDomande = 0; // Contatore per fermare il quiz
const contatoreDisplay = document.getElementById('contatoreDomande'); // Elemento HTML per mostrare il contatore

function iniziaCountdown() {
  // Nascondi il contatore delle domande
  contatoreDisplay.style.display = 'none';

  // Crea la frase "Quiz starts in"
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
  document.body.appendChild(countdownWrapper);

  let countdownValue = 3;

  const countdownInterval = setInterval(() => {
    countdownValue--;
    countdownDisplay.textContent = countdownValue;

    if (countdownValue <= 0) {
      clearInterval(countdownInterval);
      countdownWrapper.remove(); // Rimuove il countdown dallo schermo

      // Mostra il contatore delle domande
      contatoreDisplay.style.display = 'block';

      avviaQuiz(); // Avvia il timer principale e genera la prima domanda
    }
  }, 1000);
}

function avviaQuiz() {
  drawCircle(1); // Disegna il cerchio pieno all'inizio
  aggiornaTimer(); // Aggiorna il display del timer
  timerInterval = setInterval(aggiornaTimer, 1000); // Avvia il timer
  generaDomanda(); // Genera la prima domanda
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

  // Cerchio di sfondo
  grafica2d.beginPath();
  grafica2d.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  grafica2d.fillStyle = 'transparent';
  grafica2d.fill();

  // Cerchio del timer
  grafica2d.beginPath();
  grafica2d.arc(centerX, centerY, radius, startAngle, endAngle);
  grafica2d.lineWidth = 10;
  if (durata >10) {
    grafica2d.strokeStyle = '#00FF00';
 } else if (durata <= 10) {
   grafica2d.strokeStyle = '#FF0000';
 } 
  grafica2d.stroke();

  timerDisplay.textContent = durata;

  // Timer testuale al centro
  grafica2d.font = '30px Arial';
  if (durata >10) {
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
function aggiornaContatore() {
  contatoreDisplay.textContent = `QUESTION ${contatoreDomande}/${maxDomande}`;
}

function inizializzaPunteggio() {
  const data = JSON.parse(localStorage.getItem('trueCounter')) || { score: 0 };
  localStorage.setItem('trueCounter', JSON.stringify(data));
}

// Funzione per aggiornare il punteggio
function aggiornaPunteggio() {
  const data = JSON.parse(localStorage.getItem('trueCounter')) || { score: 0 };
  data.score += 1; // Incrementa il punteggio di 1
  localStorage.setItem('trueCounter', JSON.stringify(data));
}

// Modifica nella funzione `generaDomanda`
function generaDomanda() {
  if (contatoreDomande >= maxDomande) {
    clearInterval(timerInterval);
    canvas.style.display = 'none';
    timerDisplay.style.display = 'none';

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

  aggiornaContatore(); // Aggiorna il contatore di domande

  const domandaSelezionata = questions[indiceCasuale];
  const divQuestion = document.getElementById('domande');
  divQuestion.innerHTML = '';

  const intestazione = document.createElement('h2');
  intestazione.id = 'QuestionH2';
  intestazione.textContent = domandaSelezionata.question;
  intestazione.setAttribute('aria-live', 'polite');
  divQuestion.appendChild(intestazione);

  const risposte = [
    ...domandaSelezionata.incorrect_answers,
    domandaSelezionata.correct_answer,
  ];
  shuffleArray(risposte);

  // Crea un array per mantenere i riferimenti ai pulsanti di risposta
  const buttons = [];

  risposte.forEach((answer) => {
    const btnAnswer = document.createElement('button');
    btnAnswer.textContent = answer;
    btnAnswer.id = 'btnAnswers';
    btnAnswer.addEventListener('click', () => {
      // Disabilita tutti i pulsanti
      buttons.forEach((btn) => (btn.disabled = true));

      // Aggiungi una classe personalizzata in base al risultato
      if (answer === domandaSelezionata.correct_answer) {
        btnAnswer.classList.add('correct-answer');
        aggiornaPunteggio();
      } else {
        btnAnswer.classList.add('incorrect-answer');
      }

      setTimeout(() => {
        resetTimer();
        generaDomanda();
      }, 1000);
    });

    buttons.push(btnAnswer); // Aggiungi il pulsante all'array
    divQuestion.appendChild(btnAnswer);
  });
}