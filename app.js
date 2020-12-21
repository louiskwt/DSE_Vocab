// Game variables 
const inital = document.querySelector('.start');
const ansInput = document.querySelector('#answer');
const btn = document.querySelector('.btn');
let score = document.querySelector('.score');
let guess = document.querySelector('input');
let point = 0;
let game = false;
let newWord = "";
let randomOrder = "";
let chance = 5;
let finalScore = "";

// modal variables
const modal = document.getElementById('modal');
const modalBtn = document.getElementById('modalTrigger');
const span = document.querySelector('.close');

// Best Scores variables
let bestScoreDisplay = document.querySelector('.bestScore');
let scoreStorage = window.localStorage;
let bestScore = scoreStorage.getItem('bestScore');


// initial setting
score.innerHTML = "";


// Hard coded Word List
const words = {
    englishWord: ['stop', 'doctor', 'laptop', 'science', 'engineer', 
                  'wonder', 'desire', 'society', 'wonder', 'social', 
                  'volunteer', 'vet', 'wonderful', 'socialise', 'dentist',
                  'mention', 'finding', 'sad', 'special', 'tired', 
                  'volunteer', 'pet', 'crime', 'fun', 'sit', 
                  'sing', 'compete', 'piano', 'smartphone', 'simple',
                  'trap', 'flight', 'hotel', 'beach', 'farm',
                  'text', 'slow', 'oil', 'salt', 'hopeful',
                  'real', 'state', 'lead', 'health', 'sell',
                  'helpful', 'wage', 'pay', 'late', 'mask'
                ],
    chineseMeaning: ['停止 (v.)', '醫生 (n.)', '手提電腦 (n.)', '科學 (n.)', '工程師 (n.)',
                     '驚訝 (n.)', '慾望 (n.)', '社會 (n.)', '想知道 (v.)', '社交的 (adj.)', 
                     '義工 (v.)', '獸醫 (n.)', '神奇的 (Adj.)', '交際 (v.)', '牙醫 (n.)', 
                     '提及 (v.)', '發現 (n.)', '傷心 (adj.)', '特別的 (adj.)', '疲累的 (Adj.)', 
                     '做義工 (v.)', '寵物 (n.)', '罪案 (n.)', '歡樂的 (ad.)', '坐 (v.)',
                     '唱歌 (v.)', '競爭 (v.)', '鋼琴 (n.)', '智能手機 (n.)', '簡單的 （adj.)',
                     '陷阱 (n.)', '航班 (n.)', '酒店 (n.)', '海灘 (n.)', '  農田(n.)',
                     '文字 (n.)', '緩慢的 (adj.)', '油 (n.)', '鹽 (n.)', '有希望的 （adj.)',
                     '真實的 (adj.)', '指出 (v.)', '領導 (v.)', '健康', '賣 (v.)',
                     '有幫肋的 (adj.)', '工資 (n.)', '付款 (n.)', '遲的 (adj.)', '口罩 (n.)'   
                    ]
}

// Function for creating the vocab list
const createTable = () => {
    let len = words['englishWord'].length;
    const list = document.getElementById('wordList')

    for(let i = 0; i < len; i++) {
            // create table row
            const row = document.createElement('tr');
            for (let j = 0; j < 2; j++) {
                // create a <td> element and a text node
                const cell = document.createElement('td');
                if (j == 0) {
                    const engText = document.createTextNode(`${words.englishWord[i]}`);
                    cell.appendChild(engText);
                    row.appendChild(cell);
                } else {
                    const chinText = document.createTextNode(`${words.chineseMeaning[i]}`);
                    cell.appendChild(chinText);
                    row.appendChild(cell);
                }
            }
            list.appendChild(row);
        }

    }

createTable();

// Game life fuction
const addLife = () => {
    const life = document.querySelector('.life');
    if(chance == 5) {
        const startingLife = `<i id="heart" class="fas fa-heart"></i><i id="heart" class="fas fa-heart"></i><i id="heart" class="fas fa-heart"></i><i id="heart" class="fas fa-heart"></i><i id="heart" class="fas fa-heart"></i>`;
        life.innerHTML = startingLife;
    }
}

const reduceLife = () => {
    const life = document.querySelector('.life');
    const heart = document.getElementById('heart');
    if(chance < 5) {
        life.removeChild(heart);
    }
}

// Game Set up (creating and scrambling words)
const createWords = () => {
    let number = Math.floor(Math.random() * words.englishWord.length);
    let word = [words.englishWord[number], words.chineseMeaning[number]];
    // console.log(random.split(""));
    return word;
}

const jumbleWord = (el) => {
    for (let i = el.length - 1; i >= 0; i--) {
        let temp = el[i];
        let j = Math.floor(Math.random() * (i + 1));
        el[i] = el[j];
        el[j] = temp;

    }
    return el.join("");
}
// Initialising the setting
const initialSetUp = () => {
    game = true;
    finalScore = 0;
    score.innerHTML = " ";
    inital.style.color = '#e9ecef';
    btn.textContent = '提交';
    // guess.classList.toggle('hidden');
    newWord = createWords();
    // console.log(newWord[0]);
    randomWord = jumbleWord(newWord[0].split(""));
    // console.log(newWord[0].length);
    inital.innerHTML = `<h2>將下列字母重新排列</h2>
    <h2> <span class='question'> ${randomWord} </span> <span>- ${newWord[1]}</span></h2>`;
    creatingInput();
    addLife();
}

// Functions for hecking the answers
const correctAns = () => {
    let correctMessage = `<h2> 正確！好叻呀. </h2><br>
                         ${newWord[0]} - ${newWord[1]}`;
    game = false;
    inital.innerHTML = correctMessage;
    inital.style.color = '#6ab547';
    point += 5;
    score.innerHTML = `${point} 分`;
    btn.innerHTML = '下一題！';
}

const incorrectAns = () => {
    let incorrectMessage = `<h2>繼績努力呀～ </h2><br>
                            正確答案:  ${newWord[0]} - ${newWord[1]}`;
    inital.innerHTML = incorrectMessage;
    inital.style.color =  '#b5454e';
    btn.innerHTML = '試多次';
    score.innerHTML = `${point} 分`;
    game = false;  // reset the game
    reduceLife();
    
}

// creating the input
const creatingInput = () => {
    ansInput.innerHTML = "";
    for (let i = 0; i < newWord[0].length; i++) {
        console.log(i);
        let ans = document.createElement("INPUT");
        ans.setAttribute("class", 'letter');
        ans.setAttribute("type", "input");
        ans.setAttribute("size", "1");
        ans.setAttribute("maxLength", "1");
        ansInput.appendChild(ans);
    }
}

// chaining the input value
const chainingValue = () => {
    const answerSection = ansInput.children;
    let addedValue = "";
    for(let i = 0; i < answerSection.length; i++) {
        console.log(i);
        console.log(answerSection[i]);
        addedValue += answerSection[i].value;
    }
    return addedValue.toLowerCase();
}
// clearing the input
const clearingInput = () => {
    const answerSection = ansInput.children;
    let addedValue = "";
    for(let i = 0; i < answerSection.length; i++) {
        console.log(i);
        console.log(answerSection[i]);
        answerSection[i].value = "";
    }
}

// Game Over Display
const gameOver = () => {
    reduceLife();
    clearingInput();
    finalScore = point;
    inital.style.color = '#e9ecef';
    btn.textContent = '重新來過'
    inital.innerHTML = `<h2> Game Over </h2>`;
    score.innerHTML = `本次成績： ${finalScore} 分`;
    chance = 5;
    ansInput.innerHTML = "";
    game = false;
    point = 0;
}

// Best score function
const updatingBestScore = () => {
    // check and update the best score
    let bestScoreDisplay = document.querySelector('.bestScore');
    let bestScore = window.localStorage;
    if (bestScore.getItem('bestScore') == null) {
        bestScore.setItem('bestScore', '0');
    }else if (point > bestScore.getItem('bestScore')) {
        // updating the score
        bestScore.setItem('bestScore', point);
    } 
    // displaying the score
    bestScoreDisplay.innerHTML = `上次最住成績： ${bestScore.getItem('bestScore')} 分`;
}




// Game Event
btn.addEventListener('click', () => {
    if (!game) {
        // Setting up the game on click
        initialSetUp();
        updatingBestScore();
    } else {
        // getting the input from users
        let inputWord = chainingValue();
        // validiate the input
        if (inputWord.length < newWord[0].length ) {
            alert("請先輸入答案");
        } else if (inputWord === newWord[0]) { //checking the answer
            // displaying correct answer stage
            correctAns();
        } else {
            // reduce the life
            chance--;
                // check if the heart is 0
                if(chance == 0) {
                    // Ending the game and displaying final score
                    gameOver();
                    updatingBestScore();
                    } else {
                        // Displaying incorrect answer stage
                        incorrectAns();
                    }
                }
        }
})

// Modal event

// When the user click the modal button, open the modal
modalBtn.onclick = () => {
    modal.style.display = 'block';
}

// when the user click x, close the modal
span.onclick = () => {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if(event.target == modal){
        modal.style.display = 'none';
    }
}

