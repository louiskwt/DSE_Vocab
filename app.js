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

// Reverse Autotab Variable
let userInput = document.querySelector('.letter'); 

// initial setting
score.innerHTML = "";


// Static vocab list
const vocabList = [
    {
        "word": "stop",
        "meaning": "停止 (v.)"
    },
    {
        "word": "doctor",
        "meaning": "醫生 (n.)"
    },
    {
        "word": "laptop",
        "meaning": "手提電腦 (n.)"
    },
    {
        "word": "science",
        "meaning": "科學 (n.)"
    },
    {
        "word": "engineer",
        "meaning": "工程師 (n.)"
    },
    {
        "word": "wonder",
        "meaning": "驚訝 (n.)"
    },
    {
        "word": "desire",
        "meaning": "慾望 (n.)"
    },
    {
        "word": "society",
        "meaning": "社會 (n.)"
    },
    {
        "word": "wonder",
        "meaning": "想知道 (v.)"
    },
    {
        "word": "social",
        "meaning": "社交的 (adj.)"
    },
    {
        "word": "volunteer",
        "meaning": "義工 (v.)"
    },
    {
        "word": "vet",
        "meaning": "獸醫 (n.)"
    },
    {
        "word": "desire",
        "meaning": "慾望 (n.)"
    },
    {
        "word": "wonderful",
        "meaning": "神奇的 (adj.)"
    },
    {
        "word": "socialise",
        "meaning": "交際 (v.)"
    },
    {
        "word": "dentist",
        "meaning": "牙醫 (n.)"
    },
    {
        "word": "mention",
        "meaning": "提及 (v.)"
    },
    {
        "word": "finding",
        "meaning": "發現 (n.)"
    },
    {
        "word": "sad",
        "meaning": "傷心 (adj.)"
    },
    {
        "word": "special",
        "meaning": "特別的 (adj.)"
    },
    {
        "word": "tired",
        "meaning": "疲累的 (adj.)"
    },
    {
        "word": "volunteer",
        "meaning": "做義工 (v.)"
    },
    {
        "word": "pet",
        "meaning": "寵物 (n.)"
    },
    {
        "word": "crime",
        "meaning": "罪案 (n.)"
    },
    {
        "word": "fun",
        "meaning": "歡樂的 (ad.)"
    },
    {
        "word": "sit",
        "meaning": "坐 (v.)"
    },
    {
        "word": "compete",
        "meaning": "競爭 (v.)"
    },
    {
        "word": "piano",
        "meaning": "鋼琴 (n.)"
    },
    {
        "word": "smartphone",
        "meaning": "智能手機 (n.)"
    },
    {
        "word": "simple",
        "meaning": "簡單的 （adj.)"
    },
    {
        "word": "trap",
        "meaning": "陷阱 (n.)"
    },
    {
        "word": "flight",
        "meaning": "航班 (n.)"
    },
    {
        "word": "hotel",
        "meaning": "酒店 (n.)"
    },
    {
        "word": "beach",
        "meaning": "海灘 (n.)"
    },
    {
        "word": "farm",
        "meaning": "農田(n.)"
    },
    {
        "word": "text",
        "meaning": "文字 (n.)"
    },
    {
        "word": "slow",
        "meaning": "緩慢的 (adj.)"
    },
    {
        "word": "oil",
        "meaning": "油 (n.)"
    },
    {
        "word": "salt",
        "meaning": "鹽 (n.)"
    },
    {
        "word": "hopeful",
        "meaning": "有希望的（adj.)"
    },
    {
        "word": "real",
        "meaning": "真實的 (adj.)"
    },
    {
        "word": "state",
        "meaning": "指出 (v.)"
    },
    {
        "word": "lead",
        "meaning": "領導 (v.)"
    },
    {
        "word": "health",
        "meaning": "健康 (n.)"
    },
    {
        "word": "sell",
        "meaning": "賣 (v.)"
    },
    {
        "word": "helepful",
        "meaning": "有幫肋的 (adj.)"
    },
    {
        "word": "wage",
        "meaning": "工資 (n.)"
    },
    {
        "word": "pay",
        "meaning": "付款 (n.)"
    },
    {
        "word": "late",
        "meaning": "遲的 (adj.)"
    },
    {
        "word": "mask",
        "meaning": "口罩 (n.)"
    },
    {
        "word": "symbol",
        "meaning": "標誌 (n.)"
    },
    {
        "word": "boar",
        "meaning": "野豬 (n.)"
    },
    {
        "word": "truck",
        "meaning": "貨車 (n.)"
    },
    {
        "word": "virtual",
        "meaning": "虛疑的 (adj.)"
    },
    {
        "word": "novel",
        "meaning": "小說 (n.)"
    },
    {
        "word": "steam",
        "meaning": "蒸 (v.)"
    },
    {
        "word": "handle",
        "meaning": "處理 (v.)"
    },
    {
        "word": "trust",
        "meaning": "相信 (v.)"
    },
    {
        "word": "fashion",
        "meaning": "時裝 (n.)"
    }
]

console.log(vocabList.length);
console.log(vocabList[1].word);
// Function for creating the vocab list
const createTable = () => {
    let len = vocabList.length;
    const list = document.getElementById('wordList')

    for(let i = 0; i < len; i++) {
            // create table row
            const row = document.createElement('tr');
            for (let j = 0; j < 2; j++) {
                // create a <td> element and a text node
                const cell = document.createElement('td');
                if (j == 0) {
                    const engText = document.createTextNode(`${vocabList[i].word}`);
                    cell.appendChild(engText);
                    row.appendChild(cell);
                } else {
                    const chinText = document.createTextNode(`${vocabList[i].meaning}`);
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
    let number = Math.floor(Math.random() * vocabList.length);
    let word = [vocabList[number].word, vocabList[number].meaning];
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
        console.log(i);
        let ans = document.createElement("INPUT");
        ans.setAttribute("class", 'letter');
        ans.setAttribute("type", "input");
        ans.setAttribute("size", "1");
        ans.setAttribute("maxLength", "1");
        ans.setAttribute("name", `${i}`);
        ans.setAttribute("onKeyup", `autoTab(this, ansInput.childNodes[${i+1}])`);
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

