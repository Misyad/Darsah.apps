const quizCards = document.querySelectorAll('.quiz-card');
const answers = document.querySelectorAll('.answers button');
const difficultyButtons = document.querySelectorAll('.difficulty-row button');

quizCards.forEach((card) => {
  card.addEventListener('click', () => {
    quizCards.forEach((item) => item.style.outline = '0');
    card.style.outline = '3px solid rgba(255, 255, 255, 0.96)';
    card.style.outlineOffset = '2px';
  });
});

answers.forEach((answer) => {
  answer.addEventListener('click', () => {
    answers.forEach((item) => item.classList.remove('selected'));
    answer.classList.add('selected');
  });
});

difficultyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    difficultyButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});
