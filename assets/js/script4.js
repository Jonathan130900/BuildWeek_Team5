const btnFeedback = document.getElementById('btnFeedback');
const star = document.getElementById('star');
const txtFeedback = document.getElementById('feedbackText').value;
let selectedRating = 0;

// Aggiungi il comportamento cliccabile alle stelle
const stars = document.querySelectorAll('.star');
stars.forEach((star) => {
  star.addEventListener('mouseover', () => {
    const hoverRating = parseInt(star.getAttribute('data-value'));
    updateStars(hoverRating);
  });

  star.addEventListener('mouseout', () => {
    updateStars(selectedRating);
  });

  star.addEventListener('click', () => {
    const clickSound = new Audio('/assets/audio/coinSound.mp3');
    selectedRating = parseInt(star.getAttribute('data-value'));
    clickSound.play();
    updateStars(selectedRating);
  });
});

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

  if (selectedRating === 0) {
    alert('Per favore, seleziona una valutazione!');
    return;
  }
  alert(`Grazie per la tua valutazione di ${selectedRating} stelle!`);

  // Reset delle stelle
  selectedRating = 0;
  updateStars(selectedRating);
  window.location.replace('/index.html');
}

btnFeedback.addEventListener('click', () => {
  localStorage.clear();
  submitRating();
});
