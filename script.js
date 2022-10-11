'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions

const init = () => {
  scores = [0, 0]; // глобаотный счетчик очков
  currentScore = 0; // текущий счетчик очков
  activePlayer = 0; // определяем текущего игрока
  playing = true; // состояние игры

  score0El.textContent = 0; // переписываем стартовые результаты игроков
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden'); // скрываем встроенный в разметку кубик
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // текстовое содержимое обнуляем
  currentScore = 0; // проигравшему игроку (получившему 1) обнуляем счет
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice

btnRoll.addEventListener('click', () => {
  if (playing) {
    // при нажатии на 'Roll dice'
    let dice = Math.trunc(Math.random() * 6) + 1; // генерируем рандомное число
    diceEl.classList.remove('hidden'); // отображаем картинку кубика
    diceEl.src = `dice-${dice}.png`; // добавляем новую картинку исходя из рандомного числа
    if (dice !== 1) {
      currentScore += dice; // суммируем очки
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // динамически определяем текущего игрока и переписываем общий результат
    } else {
      switchPlayer(); // вызываем фукцию для переключения игрока
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. добавляем текущий счет к глобальному для текущего игрока
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. проверка глобального счета игрока
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
    // вызываем фукцию для переключения игрока
  }
});

btnNew.addEventListener('click', init);
