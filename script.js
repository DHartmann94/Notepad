let titles = [];
let notes = [];
let titlesDelete = [];
let notesDelete = [];
load(); // load local Storage


function render(){
    resetFieldsAndButtons();
    for (let i=0; i<titles.length; i++){
        let title = titles[i];
        let note = notes[i];
        document.getElementById('noteContent').innerHTML += renderTemplate(title, note, i);
    }
}

function resetFieldsAndButtons() {
    document.getElementById('title').value = '';
    document.getElementById('note').value = '';
    document.getElementById('error').innerHTML = '';
    document.getElementById('noteContent').innerHTML = '';
    document.getElementById("title").classList.remove(`active`);
    document.getElementById("button").classList.remove(`active`);
}

function renderDelete() {
    document.getElementById('deleteContent').innerHTML = '';
    for (let i=0; i<titlesDelete.length; i++){
        let titleDelete = titlesDelete[i];
        let noteDelete = notesDelete[i];
        document.getElementById('deleteContent').innerHTML += deleteTemplate(titleDelete, noteDelete, i);
    }
}

/* --- Note --- */
function addnote(){
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;

    if (title == ''){
        document.getElementById('error').innerHTML = "Bitte einen Titel eintragen!";
        return false;
    }
    if (note == ''){
        document.getElementById('error').innerHTML = "Bitte eine Notiz eintragen!";
        return false;
    }

    titles.push(title);
    notes.push(note);
    render();
    save();
}

function deleteNote(i){
    titlesDelete.push(titles[i]);
    notesDelete.push(notes[i]);

    titles.splice(i, 1);
    notes.splice(i, 1);
    render();
    renderDelete();
    save();
}

function deleteDelete(i){
    titlesDelete.splice(i, 1);
    notesDelete.splice(i, 1);
    renderDelete();
    save();
}

function restore(i) {
    titles.push(titlesDelete[i]);
    notes.push(notesDelete[i]);

    titlesDelete.splice(i, 1);
    notesDelete.splice(i, 1);
    render();
    renderDelete();
    save();
}

/* --- Local Storage --- */
function save() {
    let tiltesAsText = JSON.stringify(titles);
    localStorage.setItem('titles', tiltesAsText);
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);  

    let tiltesDeleteAsText = JSON.stringify(titlesDelete);
    localStorage.setItem('titlesDelete', tiltesDeleteAsText);
    let notesDeleteAsText = JSON.stringify(notesDelete);
    localStorage.setItem('notesDelete', notesDeleteAsText); 
}

function load(){
    let titlesAsText = localStorage.getItem("titles");
    let notesAsText = localStorage.getItem("notes");
    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }

    let tiltesDeleteAsText = localStorage.getItem("titlesDelete");
    let notesDeleteAsText = localStorage.getItem("notesDelete");
    if (tiltesDeleteAsText && notesDeleteAsText) {
        titlesDelete = JSON.parse(tiltesDeleteAsText);
        notesDelete = JSON.parse(notesDeleteAsText);
    }
}

/* --- Show Title and Button --- */
function showTitleButton() {
    document.getElementById("title").classList.add(`active`);
    document.getElementById("button").classList.add(`active`);
}

/* --- Toogle-Button Header --- */
function active() {
    document.getElementById("show").classList.toggle(`active`);
}

/* --- Show Notes or Trash/Delete --- */
function showNotes() {
    document.getElementById("deleteContent").classList.remove(`active`);
    document.getElementById("noteContent").classList.add(`active`);
    document.getElementById("button-notes").classList.remove(`button-colour`);
    document.getElementById("button-delete").classList.add(`button-colour`);
}

function showDelete() {
    document.getElementById("noteContent").classList.remove(`active`);
    document.getElementById("noteContent").classList.add(`dnoneND`);
    document.getElementById("deleteContent").classList.add(`active`);
    document.getElementById("button-delete").classList.remove(`button-colour`);
    document.getElementById("button-notes").classList.add(`button-colour`);
}

/* --- Templates --- */
function renderTemplate(title, note, i) {
    return /*html*/`
    <div class="note-box">
    <div><b>${title}</b></div>
    <div>${note}</div>
    <a href="#" onclick="deleteNote(${i})"><img class="delete-img" src="img/delete.jpg" alt="trash"></a>
    </div>
    `;
}

function deleteTemplate(titleDelete, noteDelete, i) {
    return /*html*/`
    <div class="note-box">
        <div><b>${titleDelete}</b></div>
        <div>${noteDelete}</div>
        <div><a href="#" onclick="deleteDelete(${i})"><img class="delete-img" src="img/delete.jpg" alt="trash"></a>
        <a href="#" onclick="restore(${i})"><img class="delete-img" src="img/restore-window-32.jpg" alt="restore"></a></div>
        </div>
    `;
}