const results = document.getElementById("results");
const btnRate = document.getElementById("btnRate");
const correct = document.getElementById("percentageCorrect");
const wrong = document.getElementById("percentageWrong");

const punteggioFinale = ottieniPunteggio();
const rightPercentage = (punteggioFinale / 10) * 100;
const wrongPercentage = 100 - rightPercentage;

document.addEventListener("load", init());

function init() {
  flowchart(rightPercentage, wrongPercentage);
  correctAnswer();
  wrongAnswer();
}

function ottieniPunteggio() {
  const data = JSON.parse(localStorage.getItem("trueCounter"));
  return data.score;
}

function flowchart(result, difference) {
  const ctx = document.getElementById("myPieChart").getContext("2d");

  const data = {
    labels: ["Wrong Answers", "Correct Answers"],
    datasets: [
      {
        label: "Risultati",
        data: [difference, result], // DA AGGIUNGERE RISULTATI QUIZ
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
  resetPunteggio();
});

//Funzione per mostrare a schermo la percentuale giusta
function correctAnswer() {
  const newP = document.createElement("p");
  newP.id = "correctP";
  const correctPercentage = `${rightPercentage}%`;
  newP.innerText = correctPercentage;
  correct.appendChild(newP);
}
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
