const results = document.getElementById("results");
const btnRate = document.getElementById("btnRate");
//const risposteCorrette = localStorage.getItem(localStorageKey);

const result = 6;
const difference = 4;

document.addEventListener("load", init());

function init() {
  flowchart(result, difference);
  displayResultText(result);
}

function displayResultText(result) {
  const resultText = document.getElementById("resultText");

  if (result >= 6) {
    resultText.textContent = "Complimenti, hai passato il test!";
  } else if (difference >= 5) {
    resultText.textContent =
      "Peccato, non hai passato il test! Puoi riprovare quante volte vuoi.";
  }
}

function flowchart(result, difference) {
  const ctx = document.getElementById("myPieChart").getContext("2d");

  const data = {
    labels: ["difference", "result"],
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
});
