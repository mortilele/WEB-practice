// The keys and notes variables store the piano keys
const keys = ['c-key', 'd-key', 'e-key', 'f-key', 'g-key', 'a-key', 'b-key', 's-key', 'C-sharp-key', 'D-sharp-key', 'F-sharp-key', 'G-sharp-key', 'A-sharp-key'];
const notes = [];
const notesMelody = [];
const baseLocation = './assets/notes/';
const format = '.wav';
const keysAvailable = ['c', 'd',  'e', 'f', 'g', 'a', 'b', 's'];
var state = 0;
let prevKey = 0;

keys.forEach(function(key){
  notes.push(document.getElementById(key));
})

// Write named functions that change the color of the keys below
let keyPlay = function(event) {
  event.target.style.backgroundColor = 'grey';
  playAudio(baseLocation+event.target.id+format);
}

let keyReturn = function(event) {
  event.target.style.backgroundColor = '';
}

function playAudio(url) {
  var audio = new Audio(url);
  audio.play();
}

let keyDown = function(event) {
  if (event.key == 'Shift') {
    prevKey = 'Shift';
    return;
  }
  else if (event.code == 'Space') {
    console.log('Space');
    if (state == 0) nextOnClick();
    else if (state == 1) nextTwoClick();
    else if (state == 2) nextThreeClick();
    else startOverClick();
    prevKey='0';
  }
  else if (prevKey == 'Shift') {
    playAudio(baseLocation+event.key+'-sharp-key'+format);
    console.log(baseLocation+event.key+'-sharp-key'+format);
    document.getElementById(event.key+'-sharp-key').style.backgroundColor = 'grey';
    prevKey='0';
  }
  else {
    console.log(baseLocation+event.key+'-key'+format);
    playAudio(baseLocation+event.key+'-key'+format);
    document.getElementById(event.key+'-key').style.backgroundColor = 'grey';
    prevKey='0';
  }
}

let keyPress = function(event) {

  document.getElementById(event.key+'-key').style.backgroundColor = '';
  document.getElementById(event.key+'-sharp-key').style.backgroundColor = '';
}

// Write a named function with event handler properties
let assign = (note) => {
  note.onmousedown = keyPlay;
  note.onmouseup = keyReturn;
}
// Write a loop that runs the array elements through the function
notes.forEach(assign);

document.onkeydown = keyDown;
document.onkeyup = keyPress;

// These variables store the buttons that progress the user through the lyrics
let nextOne = document.getElementById('first-next-line');
let nextTwo = document.getElementById('second-next-line');
let nextThree = document.getElementById('third-next-line');
let startOver = document.getElementById('fourth-next-line');

// This variable stores the '-END' lyric element
let lastLyric = document.getElementById('column-optional');

// These statements are "hiding" all the progress buttons, but the first one
nextTwo.hidden = true;
nextThree.hidden = true;
startOver.hidden= true;

// Write anonymous event handler property and function for the first progress button
let nextOnClick = function() {
    nextTwo.hidden = false;
    nextOne.hidden = true;
    document.getElementById('letter-note-five').innerHTML = 'D';
    document.getElementById('letter-note-six').innerHTML = 'C';
    state = 1;
}

// Write anonymous event handler property and function for the second progress button
let nextTwoClick = function() {
    nextThree.hidden = false;
    nextTwo.hidden = true;
    document.getElementById('word-five').innerHTML = 'DEAR';
    document.getElementById('word-six').innerHTML = 'FRI-';
    lastLyric.style.display = 'inline-block';
    document.getElementById('letter-note-three').innerHTML = 'G';
    document.getElementById('letter-note-four').innerHTML = 'E';
    document.getElementById('letter-note-five').innerHTML = 'S';
    document.getElementById('letter-note-six').innerHTML = 'B';
    state = 2;
  }
// Write anonymous event handler property and function for the third progress button
let nextThreeClick = function() {
    startOver.hidden = false;
    nextThree.hidden = true;
    document.getElementById('word-one').innerHTML = 'HAP-';
    document.getElementById('word-two').innerHTML = 'PY';
    document.getElementById('word-three').innerHTML = 'BIRTH';
    document.getElementById('word-four').innerHTML = 'DAY';
    document.getElementById('word-five').innerHTML = 'TO';
    document.getElementById('word-six').innerHTML = 'YOU!';
    document.getElementById('letter-note-one').innerHTML = 'F';
    document.getElementById('letter-note-two').innerHTML = 'F';
    document.getElementById('letter-note-three').innerHTML = 'E';
    document.getElementById('letter-note-four').innerHTML = 'C';
    document.getElementById('letter-note-five').innerHTML = 'D';
    document.getElementById('letter-note-six').innerHTML = 'C';
    lastLyric.style.display='none';
    state = 3;
  }

// This is the event handler property and function for the startOver button
let startOverClick = function() {
  nextOne.hidden = false;
  startOver.hidden = true;
  document.getElementById('word-one').innerHTML = 'HAP-';
  document.getElementById('letter-note-one').innerHTML = 'G';
  document.getElementById('word-two').innerHTML = 'PY';
  document.getElementById('letter-note-two').innerHTML = 'G';
  document.getElementById('word-three').innerHTML = 'BIRTH-';
  document.getElementById('letter-note-three').innerHTML = 'A';
  document.getElementById('word-four').innerHTML = 'DAY';
  document.getElementById('letter-note-four').innerHTML = 'G';
  document.getElementById('word-five').innerHTML = 'TO';
  document.getElementById('letter-note-five').innerHTML = 'S';
  document.getElementById('word-six').innerHTML = 'YOU!';
  document.getElementById('letter-note-six').innerHTML = 'B';
  state = 0;
}

nextOne.onclick = nextOnClick;
nextTwo.onclick = nextTwoClick;
nextThree.onclick = nextThreeClick;
startOver.onclick = startOverClick;