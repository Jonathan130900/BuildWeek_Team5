const results = document.getElementById('results');
const btnRate = document.getElementById('btnRate');
const correct = document.getElementById('percentageCorrect');
const wrong = document.getElementById('percentageWrong');
const answersList = document.getElementById('answerRecap');

const punteggioFinale = ottieniPunteggio();
const rightPercentage = (punteggioFinale / 10) * 100;
const wrongPercentage = 100 - rightPercentage;

document.addEventListener('load', init());

function init() {
  flowchart(rightPercentage, wrongPercentage);
  correctAnswer();
  wrongAnswer();
  ottieniDomande();
}

function ottieniPunteggio() {
  const data = JSON.parse(localStorage.getItem('quizResults'));
  return data.score;
}

function ottieniDomande() {
  const data = JSON.parse(localStorage.getItem('quizResults')) || {
    score: 0,
    answers: [],
  };

  const risultatoContainer = document.getElementById('answersList');
  risultatoContainer.innerHTML = `
    <h2>Quiz completed!</h2>
    <p>You obtained ${data.score}/10 points.</p>    
  `;

  risultatoContainer.style.marginTop = '100px';
  const listaRisposte = document.createElement('ul');
  listaRisposte.innerHTML = `
    <p>Questions details:</p>`;
  listaRisposte.style.listStyle = 'none';
  data.answers.forEach((risposta, index) => {
    const listItem = document.createElement('li');

    // Aggiungere la domanda e le risposte senza colorare il testo
    listItem.innerHTML = `
      <p id = 'numeroDomanda'>Question ${index + 1}:</p> ${
      risposta.question
    }<br>
      <strong>Given answer:</strong> ${risposta.givenAnswer} <br>
      <strong>Right answer:</strong> ${risposta.correctAnswer} <br>
      <strong>result:</strong> <strong id="result-${index}">${
      risposta.isCorrect ? 'Correct' : 'Wrong'
    }</strong>
    `;

    // Colore del testo per la domanda e le risposte non modificato
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
  const ctx = document.getElementById('myPieChart').getContext('2d');

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
    type: 'pie',
    data: data,
    options: {
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
