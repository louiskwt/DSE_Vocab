var counter = 1;

$("#addField").click(function(e) {
    let inputHTML = `
    <label class="modal-label">英文單詞 ${counter+1}</label>
    <input class="modalinput word" type="text" name="engWord" placeholder="Vocabulary" id="${counter+1}" required>
    <label class="modal-label">解釋</label>
    <input class="modalinput meaning" type="text" name="meaning" placeholder="單詞 (n.)" id="${counter+1}" required>
    `;
    $("#add-vocab-form").append(inputHTML);
    counter++;
    console.log(counter);
});
// form submission
$("#add-vocab-form").submit(function(e) {
    e.preventDefault();
    let entry;
    for(i = 0; i < counter; i++) {
        // console.log(counter);
        let addedWord;
        let addedMeaning;
        $(".word").each(function (w) {
            if(this.id == i+1) {
                addedWord = this.value;
            }
        });
        $(".meaning").each(function (m) {
            if(this.id == i+1) {
                addedMeaning = this.value
            }
        });
        entry = {"word": addedWord, "meaning": addedMeaning};
        userList.push(entry);
        localStorage.setItem("userVocab", JSON.stringify(userList));
        updateWordList();
    }
    alert("Added!");
    $("#add-vocab-form")[0].reset();
});