const results = document.getElementById('results');
const btnRate = document.getElementById('btnRate');

const result = 6;
const difference = 10 - result;

document.addEventListener('load', init());

function init() {
  flowchart(result, difference);
}

function flowchart(result, difference) {
  const ctx = document.getElementById('myPieChart').getContext('2d');

  const data = {
    labels: ['difference', 'result'],
    datasets: [
      {
        label: 'Risultati',
        data: [difference, result], // DA AGGIUNGERE RISULTATI QUIZ
        backgroundColor: ['#C2128D', '#00FFFF'],
        borderColor: ['#00FFFF', '#C2128D'],
        borderWidth: 1,
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
});
