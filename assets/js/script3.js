const results = document.getElementById("results");
const btnRate = document.getElementById("btnRate");
const correct = document.getElementById("percentageCorrect");
const wrong = document.getElementById("percentageWrong");
const answersList = document.getElementById("answerRecap");

const punteggioFinale = ottieniPunteggio();
const rightPercentage = (punteggioFinale / 10) * 100;
const wrongPercentage = 100 - rightPercentage;

document.addEventListener("load", init());

function init() {
  flowchart(rightPercentage, wrongPercentage);
  correctAnswer();
  wrongAnswer();
  ottieniDomande();
}

function ottieniPunteggio() {
  const data = JSON.parse(localStorage.getItem("quizResults"));
  return data.score;
}

function ottieniDomande() {
  const data = JSON.parse(localStorage.getItem("quizResults")) || {
    score: 0,
    answers: [],
  };

  const risultatoContainer = document.getElementById("answersList");
  risultatoContainer.innerHTML = `
    <h2>Quiz completed!</h2>
    <p>You obtained ${data.score}/10 points.</p>
    <p>Questions details:</p>
    
  `;

  risultatoContainer.style.marginTop = "100px";
  const listaRisposte = document.createElement("ul");
  data.answers.forEach((risposta, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>Question ${index + 1}:</strong> ${risposta.question}<br>
      <strong>Given answer:</strong> ${risposta.givenAnswer} <br>
      <strong>Right answer:</strong> ${risposta.correctAnswer} <br>
      <strong>result:</strong> ${risposta.isCorrect ? "Correct" : "Wrong"}
    `;
    listItem.style.color = risposta.isCorrect ? "green" : "red";
    listItem.style.textAlign = "left";
    listItem.style.padding = "20px";
    listaRisposte.style.border = "2px solid purple";

    listaRisposte.appendChild(listItem);
  });

  risultatoContainer.appendChild(listaRisposte);
}

function flowchart(result, difference) {
  const ctx = document.getElementById("myPieChart").getContext("2d");

  const data = {
    labels: ["Wrong Answers", "Correct Answers"],
    datasets: [
      {
        label: "Risultati",
        data: [difference, result],
        backgroundColor: ["#C2128D", "#00FFFF"],
        borderColor: ["#C2128D", "#00FFFF"],
      },
    ],
  };

  const config = {
    type: "pie",
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

btnRate.addEventListener("click", function () {
  window.location.href = "index-4.html";
  resetLocalStorage();
});

//Funzione per mostrare a schermo la percentuale giusta
function correctAnswer() {
  const newP = document.createElement("p");
  newP.id = "correctP";
  const correctPercentage = `${rightPercentage}%`;
  newP.innerText = correctPercentage;
  correct.appendChild(newP);
}

//Funzione per mostrare a schermo la percentuale sbagliata
function wrongAnswer() {
  const newP = document.createElement("p");
  newP.id = "wrongP";
  const percentageWrong = `${wrongPercentage}%`;
  newP.innerText = percentageWrong;
  wrong.appendChild(newP);
}

function resetPunteggio() {
  localStorage.setItem("trueCounter", JSON.stringify({ score: 0 }));
}
