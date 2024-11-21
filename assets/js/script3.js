const results = document.getElementById('results');
const btnRate = document.getElementById('btnRate');
const correct = document.getElementById('percentageCorrect');
const wrong = document.getElementById('percentageWrong');
const answersList = document.getElementById('answerRecap');
const chartText = document.getElementById('chartText');

const punteggioFinale = ottieniPunteggio();
const punteggioTotale = 10;
const rightPercentage = (punteggioFinale / punteggioTotale) * 100;
const wrongPercentage = 100 - rightPercentage;

document.addEventListener('load', init());

function init() {
  flowchart(rightPercentage, wrongPercentage);
  correctAnswer();
  wrongAnswer();
  ottieniDomande();
  resultText();
}

function ottieniPunteggio() {
  const data = JSON.parse(localStorage.getItem('quizResults'));
  return data.score;
}

// Libreria Canvas confetti
function launchConfetti() {
  // Confetti su tutto il viewport
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { x: 0.5, y: 0.5 }, // Centro dello schermo
    startVelocity: 30,
    ticks: 60,
  });

  // Esplosioni di confetti
  const duration = 2 * 1000; // 2 secondi
  const animationEnd = Date.now() + duration;
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confetti({
      particleCount: 100,
      startVelocity: 20,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.5, // Metà superiore dello schermo
      },
    });
  }, 250);
}

// Effetto sonoro fail test
function playSadMusic() {
  console.log(":'(");
  const audio = new Audio('assets/audio/violino_triste_piango_forte.mp3');
  audio.play();
  audio.volume = 0.5;
  audio.loop = false;
}

// Effetto sonoro success test
function cheersGoodJob() {
  console.log(':D');
  const audio = new Audio('assets/audio/ma_quanto_sei_forte_complimenti.mp3');
  audio.play();
  audio.volume = 0.5;
  audio.loop = false;
}

function ottieniDomande() {
  const data = JSON.parse(localStorage.getItem('quizResults')) || {
    score: 0,
    answers: [],
  };

  const risultatoContainer = document.getElementById('answersList');
  risultatoContainer.innerHTML = `
    <h2>Quiz completed!</h2>
    <p>You obtained ${data.score}/${punteggioTotale} points.</p>    
  `;

  // Confetti e festa se il data score e maggiore-uguale a 6 (passato il test)
  if (data.score >= 6) {
    cheersGoodJob();
    launchConfetti();
  } else if (data.score <= 5) {
    // Musica triste al fallimento del test
    playSadMusic();
  }

  risultatoContainer.style.marginTop = '100px';
  const listaRisposte = document.createElement('ul');
  listaRisposte.innerHTML = `
    <p>Questions details:</p>`;
  listaRisposte.style.listStyle = 'none';
  data.answers.forEach((risposta, index) => {
    const listItem = document.createElement('li');

    // Aggiungere la domanda e le risposte
    listItem.innerHTML = `
      <p id = 'numeroDomanda'>Question ${index + 1}:</p> <p>${
      risposta.question
    } </p>
    <br>
      <strong>Given answer:</strong> ${risposta.givenAnswer} <br>
      <strong>Right answer:</strong> ${risposta.correctAnswer} <br>
      <strong>result:</strong> <strong id="result-${index}">${
      risposta.isCorrect ? 'Correct' : 'Wrong'
    }</strong>
    `;

    listItem.style.textAlign = 'left';
    listItem.style.padding = '20px';
    listaRisposte.style.border = '2px solid purple';

    // Imposta il colore solo per il risultato
    const resultElement = listItem.querySelector(`#result-${index}`);
    resultElement.style.color = risposta.isCorrect ? 'green' : 'red';

    listaRisposte.appendChild(listItem);
  });

  risultatoContainer.appendChild(listaRisposte);
}

function flowchart(result, difference) {
  const ctx = document.getElementById('myFlowChart').getContext('2d');

  const data = {
    labels: ['Wrong Answers', 'Correct Answers'],
    datasets: [
      {
        label: 'Risultati',
        data: [difference, result],
        backgroundColor: ['#C2128D', '#00FFFF'],
        borderColor: ['#C2128D', '#00FFFF'],
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      cutout: '75%',
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  // Crea il grafico
  new Chart(ctx, config);
}

function resultText() {
  const newH4 = document.createElement('h4');
  const newP = document.createElement('p');

  // Controlla il punteggio e determina il messaggio da mostrare
  if (punteggioFinale > punteggioTotale / 2) {
    newH4.innerHTML = `Congratulations! <br> You passed the exam.`;
    newP.innerHTML = `We'll send you the certificate in a few minutes.<br>
                      Check your email (including promotions/spam folder).`;
    chartText.appendChild(newH4);
    chartText.appendChild(newP);
  } else {
    newH4.innerHTML = `We're sorry! <br> You didn't pass the exam.`;
    chartText.appendChild(newH4);
  }

  // Stile aggiuntivo per il testo (opzionale)
  newH4.style.textAlign = 'center';
  newH4.style.color = punteggioFinale > punteggioTotale / 2 ? 'green' : 'red';
  newP.style.textAlign = 'center';
}

btnRate.addEventListener('click', function () {
  window.location.href = 'index-4.html';
  resetLocalStorage();
});

//Funzione per mostrare a schermo la percentuale giusta
function correctAnswer() {
  const newP = document.createElement('p');
  newP.id = 'correctP';
  const correctPercentage = `${rightPercentage}%`;
  newP.innerText = correctPercentage;
  correct.appendChild(newP);
}

//Funzione per mostrare a schermo la percentuale sbagliata
function wrongAnswer() {
  const newP = document.createElement('p');
  newP.id = 'wrongP';
  const percentageWrong = `${wrongPercentage}%`;
  newP.innerText = percentageWrong;
  wrong.appendChild(newP);
}

//Funzione per resettare il localstorage
function resetLocalStorage() {
  localStorage.setItem(
    'quizResults',
    JSON.stringify({
      score: 0,
      answers: [],
    })
  );
}
