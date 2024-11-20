const btnNext = document.getElementById('btnNextPage1');
const checkbox = document.getElementById('checkbox');

btnNext.addEventListener('click', proceed);

checkbox.addEventListener('change', () => {
  btnNext.disabled = !checkbox.checked;
});

function proceed(e) {
  e.preventDefault();
  if (checkbox.checked) {
    window.location.href = 'index-2.html';
  } else {
    window.alert('Check the promise box');
  }
}
