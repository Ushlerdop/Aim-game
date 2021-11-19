const body = document.body;
const start = document.querySelector('.start');
const timeBtn = document.querySelectorAll('.time-btn');
const timeList = document.querySelector('.time-list');
const timeSection = document.querySelector('#time');
const board = document.querySelector('#board');

let points = 0;

start.addEventListener('click', goToTimers);
timeList.addEventListener('click', startGame);

function getRandom(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function getRandomColor() {
    return `hsl(${Math.random() * 360}, 95%, 60%)`
}

function goToTimers(e) {
    e.preventDefault();
    body.style.transform = 'translateY(-100vh)'
}

function createCircle() {
    const size = getRandom(25, 70);
    const {width, height} = board.getBoundingClientRect();
    const circle = document.createElement('div');
    circle.classList.add('circle');
    board.append(circle);

    circle.style.height = `${size}px`;
    circle.style.width = `${size}px`;
    circle.style.background = getRandomColor();

    circle.style.top = `${getRandom(0, height - size)}px`;
    circle.style.left = `${getRandom(0, width - size)}px`;

    circle.addEventListener('click', (e) => {
        ++points;
        e.target.remove();
        createCircle();
    })
}

async function startGame(e) {    
    timeSection.parentNode.classList.remove('hide');
    if (e.target.matches('.time-btn')) {
        body.style.transform = 'translateY(-200vh)';
        let time = parseInt(e.target.textContent.trim());
        createCircle();
        startTimer(time);
    }
}

function createEndScreen() {
    const endScreen = document.createElement('div');
    endScreen.classList.add('end-screen');
    endScreen.textContent = `Ваш счёт: ${points}`;

    const reloadBtn = document.createElement('button');
    reloadBtn.classList.add('reload-btn');
    reloadBtn.textContent = `Начать заного`;
    reloadBtn.addEventListener('click', () => {
        body.style.transform = 'translateY(-100vh)';
        board.textContent = '';
        endScreen.remove();
        points = 0;
    });

    board.append(endScreen);
    endScreen.append(reloadBtn);
}

function gameOver() {
    timeSection.parentNode.classList.add('hide');

    const circle = board.querySelector('.circle');
    circle.remove();

    createEndScreen();
}

function setTimer(value) {
    if (value < 10) {
        timeSection.textContent = `00:0${value}`;
    } else {
        timeSection.textContent = `00:${value}`;
    }
}

function startTimer(time) {
    setTimer(time);
    let timer = setInterval(() => {
        setTimer(time);        
        time--;
        if (time < 0) {
            clearInterval(timer)
            gameOver();
        }
        }, 1000);
}