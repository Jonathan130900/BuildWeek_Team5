const btnNext = document.getElementById('btnNextPage1');
const checkbox = document.getElementById('checkbox');
const difficultyDiv = document.getElementById('difficulty');

document.addEventListener('DOMContentLoaded', () => {
  difficulty();
  selectDifficulty();
});
btnNext.addEventListener('click', proceed);

checkbox.addEventListener('change', () => {
  btnNext.disabled = !checkbox.checked;
});

function selectDifficulty() {
  const newH4 = document.createElement('h4');
  newH4.innerText = 'Select Test difficulty:';

  const easy = document.createElement('button');
  easy.id = 'easyButton';
  easy.innerText = 'Easy';

  const medium = document.createElement('button');
  medium.id = 'mediumButton';
  medium.innerText = 'Medium';

  const hard = document.createElement('button');
  hard.id = 'hardButton';
  hard.innerText = 'Hard';

  easy.addEventListener('click', () => {
    setDifficultyEasy();
    easy.id = 'selected';
    medium.id = 'mediumButton';
    hard.id = 'hardButton';
  });
  medium.addEventListener('click', () => {
    setDifficultyMedium();
    easy.id = 'easyButton';
    medium.id = 'selected';
    hard.id = 'hardButton';
  });
  hard.addEventListener('click', () => {
    setDifficultyHard();
    hard.id = 'selected';
    easy.id = 'easyButton';
    medium.id = 'mediumButton';
  });

  difficultyDiv.appendChild(newH4);
  difficultyDiv.appendChild(easy);
  difficultyDiv.appendChild(medium);
  difficultyDiv.appendChild(hard);
}

function difficulty() {
  const diff = JSON.parse(localStorage.getItem('difficulty')) || {
    selected: 0,
  };
  localStorage.setItem('difficulty', JSON.stringify(diff));
}

function setDifficultyEasy() {
  const diff = JSON.parse(localStorage.getItem('difficulty')) || {
    selected: 0,
  };
  if (diff.selected >= 1) {
    diff.selected = 0;
  }
  localStorage.setItem('difficulty', JSON.stringify(diff));
}

function setDifficultyMedium() {
  const diff = JSON.parse(localStorage.getItem('difficulty')) || {
    selected: 0,
  };
  if (diff.selected === 0 || diff.selected === 2) {
    diff.selected = 1;
  }
  localStorage.setItem('difficulty', JSON.stringify(diff));
}

function setDifficultyHard() {
  const diff = JSON.parse(localStorage.getItem('difficulty')) || {
    selected: 0,
  };
  if (diff.selected === 0 || diff.selected === 1) {
    diff.selected = 2;
  }
  localStorage.setItem('difficulty', JSON.stringify(diff));
}

function proceed(e) {
  e.preventDefault();
  if (checkbox.checked) {
    window.location.href = 'index-2.html';
  } else {
    window.alert('Check the promise box');
  }
}
