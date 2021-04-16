const ground = document.querySelectorAll('.ground');
const mole = document.querySelectorAll('.mole');
const myScore = document.querySelector('.myScore');
const topScore = document.querySelector('.topScore');

let groundBefore, end, score, topscore = 0;
let resetTime = parseInt(document.querySelector('.timer').innerHTML);
let time = parseInt(document.querySelector('.timer').innerHTML);
let count = time * 1000;

function randomGround(ground) {
    const indexGround = Math.floor(Math.random() * ground.length);
    const gRandom = ground[indexGround];

    if(gRandom == groundBefore) {
        randomGround(ground);
    }
    groundBefore = gRandom;

    return gRandom;
}

function timeRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min); 
}

function moleUp() {
    const gRandom = randomGround(ground);
    const tRandom = timeRandom(600, 1600);
    gRandom.classList.add('moleup');    

    setTimeout(() => {
        gRandom.classList.remove('moleup');
        if(!end) {
            moleUp();
        }    
    }, tRandom);
}

function go() {
    end = false;    
    score = 0;
    myScore.textContent = 0;       

    moleUp();
    setTimeout(() => {        
        end = true;
    }, count);    

    let countDown = setInterval(() => {
        if(time > 0) {
            time--;
            document.querySelector('.timer').innerHTML = time;                       
        } else {      
            time = resetTime;
            document.querySelector('.timer').innerHTML = resetTime;                  
            return clearInterval(countDown);
        }
    }, 1000);     
}

function hit() {
    score++;
    myScore.textContent = score;
    this.parentNode.className = 'ground'; 
    
    if(score > topscore) {
        topscore = score;
    }
    return topScore.textContent = topscore;    
}

mole.forEach(m => {
    m.addEventListener('click', hit);
});

function selected() {
    return document.getElementsByClassName('select');
}

function cColor() {
    let all = selected();

    for (let i = 0; i < 1; i++) {
        let color = all[i].classList;
        if (color.contains('bgOrange')) {
            all[i].classList.add('bgBlack');
            all[i].classList.remove('bgOrange');
        } else if (color.contains('bgBlack')) {
            all[i].classList.add('bgGreen');
            all[i].classList.remove('bgBlack');
        } else if (color.contains('bgGreen')) {
            all[i].classList.add('bgBlue');
            all[i].classList.remove('bgGreen');
        } else if (color.contains('bgBlue')) {
            all[i].classList.add('bgOrange');
            all[i].classList.remove('bgBlue');
        }
    }
}