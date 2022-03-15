var randomNumber = Math.floor(Math.random() * 100) +
    1; //присваивается случайное число от 1 до 100, вычисленное с использованием математического алгоритма.

var guesses = document.querySelector(
    '.guesses'
); //Следующие три переменные сделаны для хранения ссылок на абзацы результатов в нашем HTML и используются для вставки значений в абзацы
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

var guessSubmit = document.querySelector(
    '.guessSubmit'
); //Следующие две переменных хранят ссылки на форму ввода текста и кнопку отправки а позже используются для управления подачи догадки
var guessField = document.querySelector('.guessField');

var guessCount =
    1; //Наши последние две переменные сохраняют количество догадок 1 (используется для отслеживания того, сколько догадок у игрока было)
var resetButton; // и ссылку на кнопку сброса, которая ещё не существует (но позже)
guessField.focus(); //Сразу же помещает курсор в поле ввода


function checkGuess() { //Функция проверяет правильность выбора
    var userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Предыдущие догадки: ';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Поздравляем! Все правильно!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!ИГРА ОКОНЧЕНА!!!';
        setGameOver();
    } else {
        lastResult.textContent = 'Неверно!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Слишком мало!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Слишком много!';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}
guessSubmit.addEventListener('click', checkGuess); //Слушатель событий на функцию правильности выбора

function setGameOver() { //Функция завершает игру и подводит к ресету
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Начать новую игру';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() { //Функция перезапускает игру
    guessCount = 1;

    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}