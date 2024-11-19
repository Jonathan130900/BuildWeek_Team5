let selectedRating = 0;

// Aggiungi il comportamento cliccabile alle stelle
const stars = document.querySelectorAll('.star');
stars.forEach((star) => {
  star.addEventListener('mouseover', () => {
    selectedRating = parseInt(star.getAttribute('data-value'));
    updateStars(selectedRating);
  });
});

/* al posto di click abbiamo messo mouse over*/

function updateStars(rating) {
  stars.forEach((star) => {
    if (parseInt(star.getAttribute('data-value')) <= rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function submitRating() {
  const feedback = document.getElementById('feedback').value;
  const resultDiv = document.getElementById('result');

  if (selectedRating === 0) {
    resultDiv.innerHTML =
      "<p style='color: red;'>Per favore, seleziona una valutazione!</p>";
    return;
  }

  resultDiv.innerHTML = `
                <p>Grazie per la tua valutazione di ${selectedRating} stelle!</p>
                <p>Commento: ${feedback || 'Nessun commento lasciato.'}</p>
            `;
  // Reset della valutazione (opzionale)
  selectedRating = 0;
  updateStars(selectedRating);
  document.getElementById('feedback').value = '';
}
