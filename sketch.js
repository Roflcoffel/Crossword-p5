let wordBlocks = {}
let qna_data = {}
const size = 64
const txt_offset = 15

let tx = 100
let ty = 400

function preload() {
  qna_data = loadJSON('assets/qna_data.json');
}

function setup() {
  createCanvas(1920, 1080);
  
  noFill();
  textAlign(LEFT, TOP)

  let i = 0
  for (const answer in qna_data) {
    wb = new WordBlock(answer,i,false)
    wordBlocks[answer.toLowerCase()] = wb
    i += 1
  }

  //if we cannot connect, cycle the wordBlocks array using splice(index,1) and then push it back at the end.
  //the length of a word divided by 2, gives us how many max possible connected word we can have.
  //if we reach this number when trying to connect block or run out of words we are done.
  connectBlock("arbetsinriktad","fontän")
  connectBlock("arbetsinriktad","nyk")
  connectBlock("arbetsinriktad","fontänflödet")
  connectBlock("fontän","ohälsa")
  connectBlock("ohälsa","hus")
  connectBlock("hus", "ängelholmen")

  for (const block in wordBlocks) {
    wordBlocks[block].draw(tx,ty)
  }

  fill(0,0,0)
  textSize(30)
  
  i = -1; //Starts at -1 so i can count before the mod operation but also
          //count the questions with None in them
  for (const answer in qna_data) {
    i += 1
    let question = qna_data[answer]
    if(question == "None") continue
    if(i % 2 == 0) {
      text(i + ". " + question, tx, ty+(i*20)+250)
    }
    else {
      text(i + ". " + question, tx+350, ty+((i-1)*20)+250)
    }
  }
  noFill();
}

function mousePressed() {
  for (const block in wordBlocks) {
    if(wordBlocks[block].isPointInWordBlock(mouseX-tx, mouseY-ty)) {
      console.log("Highlight: ", wordBlocks[block].ans)
    }
  }
}

function connectBlock(parent_ans, child_ans, letter = "") {
  if(letter == "") {
    if(wordBlocks[parent_ans].connect(wordBlocks[child_ans])) {
      console.log("Connected!")
    }
  }
  else {
    if(wordBlocks[parent_ans].connectAt(wordBlocks[child_ans], letter)) {
      console.log("Connected at " + letter)
    }
  }
}