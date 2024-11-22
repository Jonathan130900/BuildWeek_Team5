const btnNext = document.getElementById('btnNextPage1');
const checkbox = document.getElementById('checkbox');
const difficultyDiv = document.getElementById('difficulty');
const baseDiff = 0;

document.addEventListener('DOMContentLoaded', () => {
  difficulty();
  selectDifficulty();
});
btnNext.addEventListener('click', proceed);

checkbox.addEventListener('change', () => {
  btnNext.disabled = !checkbox.checked;
});

const easy = document.createElement('button');
const medium = document.createElement('button');
const hard = document.createElement('button');

function selectDifficulty() {
  const newH4 = document.createElement('h4');
  newH4.innerText = 'Select Test difficulty:';

  easy.id = 'easyButton';
  easy.innerText = 'Easy';

  medium.id = 'mediumButton';
  medium.innerText = 'Medium';

  hard.id = 'hardButton';
  hard.innerText = 'Hard';

  easy.addEventListener('click', () => {
    if (diff.selected != 1) {
      setDifficultyEasy();
    }
    easy.id = 'selected';
    medium.id = 'mediumButton';
    hard.id = 'hardButton';
  });
  medium.addEventListener('click', () => {
    if (diff.selected != 2) {
      setDifficultyMedium();
    }
    easy.id = 'easyButton';
    medium.id = 'selected';
    hard.id = 'hardButton';
  });
  hard.addEventListener('click', () => {
    if (diff.selected != 3) {
      setDifficultyHard();
    }
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
  localStorage.setItem('difficulty', JSON.stringify(diff));
}

const diff = JSON.parse(localStorage.getItem('difficulty')) || {
  selected: 0,
};

function setDifficultyEasy() {
  diff.selected = 1;
  localStorage.setItem('difficulty', JSON.stringify(diff));
}

function setDifficultyMedium() {
  diff.selected = 2;
  localStorage.setItem('difficulty', JSON.stringify(diff));
}
function setDifficultyHard() {
  diff.selected = 3;
  localStorage.setItem('difficulty', JSON.stringify(diff));
}

function proceed(e) {
  e.preventDefault();
  const diff = JSON.parse(localStorage.getItem('difficulty')) || {
    selected: 0,
  };
  if (!checkbox.checked) {
    window.alert('Check the promise box');
  } else if (diff.selected === 0) {
    window.alert('Select a difficulty level');
  } else {
    window.location.replace('index-2.html');
  }
}
