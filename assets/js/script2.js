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
      'In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?',
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


const timerDisplay = document.getElementById("timer");
const canvas = document.getElementById("timerCanvas");
const grafica2d = canvas.getContext("2d");
let durata = 20;
const durataTotale = 20;

function drawCircle(percentage, timeLeft) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 60;
  const startAngle = -Math.PI / 2; // Angolo di partenza
  const endAngle = startAngle + (2 * Math.PI * percentage);

  // Cancella il canvas
  grafica2d.clearRect(0, 0, canvas.width, canvas.height);

  // Disegna il cerchio di sfondo
  grafica2d.beginPath();
  grafica2d.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  grafica2d.fillStyle = "#555";
  grafica2d.fill();

  // Disegna il cerchio animato
  grafica2d.beginPath();
  grafica2d.arc(centerX, centerY, radius, startAngle, endAngle);
  grafica2d.lineWidth = 10;
  grafica2d.strokeStyle = "#00FF00";
  grafica2d.stroke();

    // Disegna il timer rimanente al centro
    grafica2d.font = "30px Arial";
    grafica2d.fillStyle = "#FFFFFF";
    grafica2d.textAlign = "center";
    grafica2d.textBaseline = "middle";
    grafica2d.fillText(timeLeft, centerX, centerY);
}

function aggiornaTimer() {
  // Aggiorna il timer testuale
  timerDisplay.textContent = durata;

  // Cambia stile negli ultimi 10 secondi
  if (durata <= 10) {
    timerDisplay.classList.add("fineTimer");
  } else {
    timerDisplay.classList.remove("fineTimer");
  }

  // Calcola la percentuale rimanente e aggiorna il cerchio
  const percentage = durata / durataTotale;
  drawCircle(percentage, durata);

  // Gestisci il decremento e il reset del timer
  if (durata <= 0) {
    durata = durataTotale;
  } else {
    durata--;
  }
}

// Disegna il cerchio pieno all'inizio
drawCircle(1);

// Avvia il timer
const timerInterval = setInterval(aggiornaTimer, 1000);
