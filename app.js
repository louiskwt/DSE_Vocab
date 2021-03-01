// Game variables 
const inital = document.querySelector('.start');
const ansInput = document.querySelector('#answer');
const btn = document.querySelector('.btn');
const checkBtn = document.querySelector('#checkButton');
let score = document.querySelector('.score');
let guess = document.querySelector('input');
let point = 0;
let game = false;
let newWord = "";
let randomOrder = "";
let chance = 5;
let finalScore = "";

// Overlay List
const overlayList = document.getElementById('myList');

// Best Scores variables
let bestScoreDisplay = document.querySelector('.bestScore');
let scoreStorage = window.localStorage;
let bestScore = scoreStorage.getItem('bestScore');

// Reverse Autotab Variable
let userInput = document.querySelector('.letter'); 

// initial setting
score.innerHTML = "";


// Static vocab list
const vocabList = [
    {
        "word": "impressive",
        "meaning": "印象深刻 (adj.)"
    },
    {
        "word": "invest",
        "meaning": "投資/投入 (v.)"
    },
    {
        "word": "monitor",
        "meaning": "監控 (v.)"
    },
    {
        "word": "machine",
        "meaning": "機器 (n.)"
    },
    {
        "word": "industrial",
        "meaning": "工業的 (adj.)"
    },
    {
        "word": "virtual",
        "meaning": "虛擬的 (adj.)"
    },
    {
        "word": "vacuum",
        "meaning": "吸塵器 (n.)"
    },
    {
        "word": "handle",
        "meaning": "處理 (v.)"
    },
    {
        "word": "interactive",
        "meaning": "互動的 (adj.)"
    },
    {
        "word": "tiresome",
        "meaning": "令人厭倦 (adj.)"
    }
];

let vocabList_serialised = JSON.stringify(vocabList);
let userList;
function storeingData() {
    if (window.localStorage.getItem('userVocab') == null || window.localStorage.getItem('userVocab') == "" ) {
        window.localStorage.setItem('userVocab', vocabList_serialised);
    }
    userList = JSON.parse(window.localStorage.getItem('userVocab'));
}

storeingData();

// localStorage.setItem



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
    let number = Math.floor(Math.random() * userList.length);
    let word = [userList[number].word, userList[number].meaning];
    // console.log(random.split(""));
    return word;
}

// function for mixing the words
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
    btn.textContent = '提交答案～';
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
    let correctMessage = `<h2 class="correct"> 正確！好叻呀~ </h2>
                         <h2 class="correct">${newWord[0]} - ${newWord[1]}</h2>`;
    game = false;
    inital.innerHTML = correctMessage;
    point += 5;
    score.innerHTML = `${point} 分`;
    btn.innerHTML = '下一題！';
}

const incorrectAns = () => {
    let incorrectMessage = `<h2 class="incorrect">繼績努力呀～ </h2>
                            <h2 class="incorrect">正確答案:  ${newWord[0]} - ${newWord[1]}<h2>`;
    inital.innerHTML = incorrectMessage;
    btn.innerHTML = '試多次';
    score.innerHTML = `${point} 分`;
    game = false;  // reset the game
    reduceLife();
    
}

// auto tab functin
function autoTab(original, destination) {
if (original.getAttribute&&original.value.length==original.getAttribute("maxlength")) {
    destination.focus()
    }
}

// reverse tab function
function reverseTab(e, original, destination) {
    // Check which key is pressed
    let key;
    if (window.e) { 
        key = e.keyCode; 
    } else if (e.which) { 
        key = e.which; 
    } 
    if(key == 8 && original.value.length==0){
        destination.focus();
    }
}


// creating the input
const creatingInput = () => {
    ansInput.innerHTML = "";
    for (let i = 0; i < newWord[0].length; i++) {
        let ans = document.createElement("INPUT");
        ans.setAttribute("class", 'letter');
        ans.setAttribute("type", "input");
        ans.setAttribute("size", "1");
        ans.setAttribute("maxLength", "1");
        ans.setAttribute("name", `${i}`);
        if(i+1 == newWord[0].length) {
            ans.setAttribute("onKeyup", `autoTab(this, checkBtn)`);
        } else {
            ans.setAttribute("onKeyup", `autoTab(this, ansInput.childNodes[${i+1}])`);
        }
        if(i > 0) {
            ans.setAttribute("onKeydown", `reverseTab(event, this, ansInput.childNodes[${i-1}])`);
        }
        ansInput.appendChild(ans);
    }
}

// chaining the input value
const chainingValue = () => {
    const answerSection = ansInput.children;
    let addedValue = "";
    for(let i = 0; i < answerSection.length; i++) {
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
    if (bestScore.getItem('bestScore') == null) {  // check if bestscore exists; if not set it to zero
        bestScore.setItem('bestScore', '0');
    }else if (point > bestScore.getItem('bestScore')) {
        // updating the score
        bestScore.setItem('bestScore', point);
    } 
    // displaying the score
    bestScoreDisplay.innerHTML = `<h2>最住成績： ${bestScore.getItem('bestScore')} 分<h2>`;
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
});
