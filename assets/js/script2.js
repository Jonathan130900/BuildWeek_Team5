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
      'In the programming language Java, which of these keywords would you put on a variable to make sure it doesn\'t get modified?',
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
  drawCircle(1); // Disegna il cerchio pieno all'inizio
  aggiornaTimer(); // Aggiorna il display del timer
  timerInterval = setInterval(aggiornaTimer, 1000); // Avvia il timer
  generaDomanda(); // Genera la prima domanda
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

function aggiornaContatore() {
  contatoreDisplay.textContent = `QUESTION ${contatoreDomande}/${maxDomande}`;
}


function drawCircle(percentage, timeLeft) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 60;
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + 2 * Math.PI * percentage;

  grafica2d.clearRect(0, 0, canvas.width, canvas.height);

  // Cerchio di sfondo
  grafica2d.beginPath();
  grafica2d.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  grafica2d.fillStyle = '#555';
  grafica2d.fill();

  // Cerchio del timer
  grafica2d.beginPath();
  grafica2d.arc(centerX, centerY, radius, startAngle, endAngle);
  grafica2d.lineWidth = 10;
  grafica2d.strokeStyle = '#00FF00';
  grafica2d.stroke();

  // Timer testuale al centro
  grafica2d.font = '30px Arial';
  grafica2d.fillStyle = '#FFFFFF';
  grafica2d.textAlign = 'center';
  grafica2d.textBaseline = 'middle';
  grafica2d.fillText(timeLeft, centerX, centerY);
}

function aggiornaTimer() {
  timerDisplay.textContent = durata;

  if (durata <= 5) {
    timerDisplay.style.color = 'red'; // Avviso visivo per i pochi secondi rimasti
    const audio = new Audio('warning-sound.mp3'); // Suono per avviso
    audio.play();
  } else {
    timerDisplay.style.color = '#000'; // Reset colore timer
  }

  if (durata <= 10) {
    timerDisplay.classList.add('fineTimer');
  } else {
    timerDisplay.classList.remove('fineTimer');
  }

  const percentage = durata / durataTotale;
  drawCircle(percentage, durata);

  if (durata <= 0) {
    generaDomanda(); // Passa alla prossima domanda
    resetTimer(); // Resetta il timer
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
const localStorageKey = 'risposteCorrette';
resetRisposteCorrette();

function resetRisposteCorrette() {
  localStorage.setItem(localStorageKey, '0');
}

if (localStorage.getItem(localStorageKey) === null) {
  localStorage.setItem(localStorageKey, '0');
}

function aggiornaRisposteCorrette() {
  const punteggioCorrente = parseInt(localStorage.getItem(localStorageKey), 10);
  localStorage.setItem(localStorageKey, (punteggioCorrente + 1).toString());
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generaDomanda() {
  if (contatoreDomande >= maxDomande) {
    clearInterval(timerInterval);
    canvas.style.display = 'none';
    timerDisplay.style.display = 'none';

    const divDomanda = document.getElementById('domande');
    const punteggioFinale = localStorage.getItem(localStorageKey);
    divDomanda.innerHTML = `<h2>Quiz terminato!</h2><p>Hai risposto correttamente a ${punteggioFinale} domande su ${maxDomande}.</p>`;

    const bottoneProssimaPagina = document.createElement('button');
    bottoneProssimaPagina.textContent = 'Go to Results';
    bottoneProssimaPagina.classList.add('btn-prossima-pagina');
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

  const domandaSelezionata = questions[indiceCasuale];
  const divDomanda = document.getElementById('domande');
  divDomanda.innerHTML = '';

  const intestazione = document.createElement('h2');
  intestazione.textContent = domandaSelezionata.question;
  intestazione.setAttribute('aria-live', 'polite');
  divDomanda.appendChild(intestazione);

  const risposte = [...domandaSelezionata.incorrect_answers, domandaSelezionata.correct_answer];
  shuffleArray(risposte);

  risposte.forEach(risposta => {
    const btnRisposta = document.createElement('button');
    btnRisposta.textContent = risposta;
    btnRisposta.classList.add('btn-risposta');
    btnRisposta.addEventListener('click', () => {
      if (risposta === domandaSelezionata.correct_answer) {
        btnRisposta.style.backgroundColor = 'green';
        aggiornaRisposteCorrette();
        resetTimer();
      } else {
        btnRisposta.style.backgroundColor = 'red';
        resetTimer();
      }
      setTimeout(generaDomanda, 1000); // Passa alla prossima domanda
      risposte.forEach(btn => btn.disabled = true); // Disabilita i bottoni
    });

    divDomanda.appendChild(btnRisposta);
  });
}