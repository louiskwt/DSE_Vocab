const myVocab = document.getElementById('myVocab');

function openList() {
    overlayList.style.width = "100%";
}

function closeList() {
    overlayList.style.width = "0%";
}

/* 

    function to generate the list

*/
const createWordList = () => {
    let len = userList.length
    console.log(len);
    // loop through the vocab list
    for (let i = 0; i < len; i++) {
        // generate the html template for the card
        const cardHtml = `
        <a class='card'> 
            <i class="fas fa-trash card-delete"></i>
            <h4 class='list-heading'>${userList[i].word}</h4>
            <p>${userList[i].meaning}</p>
        </a>
        `;
        myVocab.innerHTML += cardHtml;
    }
}

createWordList();

const updateWordList = () => {
    const updatedVocabList = JSON.parse(window.localStorage.getItem('userVocab'));
    const updatedItems = updatedVocabList.pop();
    const updatedCard = `
    <a class='card'> 
        <i class="fas fa-trash card-delete"></i>
        <h4 class='list-heading'>${updatedItems.word}</h4>
        <p>${updatedItems.meaning}</p>
    </a>
    `
    myVocab.innerHTML += updatedCard;
}

/* 
    delete function
*/

const vocabSection = document.querySelector('#myVocab');



function updatingStorage() {
    console.log(userList)
    window.localStorage.setItem('userVocab', JSON.stringify(userList));
    userList = JSON.parse(window.localStorage.getItem('userVocab'));
    alert("Deleted and Updated");
}

vocabSection.addEventListener('click', e => {
    const cardList = e.target.parentElement.childNodes;
    const updatedUserList = userList.filter(item => item.word != cardList[3].textContent);
    userList = updatedUserList;
    console.log(userList);
    if(e.target.classList.value == "fas fa-trash card-delete"){
        e.target.parentElement.remove();
        updatingStorage();
    }
})