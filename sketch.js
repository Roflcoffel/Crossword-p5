let wordBlocks = {}
let qna_data = {}

let hori_ans = {}
let vert_ans = {}

const size = 64
const txt_offset = 15

let hide_words = false

//Crossword Start Position
let tx = 500
let ty = 500

//Question Position
let qx = 50
let qy = 60

function preload() {
  qna_data = loadJSON('assets/qna_data.json');
}

function setup() {
  createCanvas(2000, 1350);

  background(255,255,255)
  
  noFill();
  textAlign(LEFT, TOP)

  let i = 0
  for (const answer in qna_data) {
    wb = new WordBlock(answer,i,hide_words)
    wordBlocks[answer.toLowerCase()] = wb
    i += 1
  }

  connectBlock("arbetsinriktad","fontän", 3)
  connectBlock("arbetsinriktad","riktlinjer", 0, "i")
  connectBlock("fontän","ohälsa")
  connectBlock("ohälsa","hus")
  connectBlock("hus", "ängelholm")
  connectBlock("riktlinjer", "fontänflödet", 3)
  connectBlock("riktlinjer", "enhetsmöte", 3)
  connectBlock("fontänflödet", "nybesök", 0, "e")
  connectBlock("nybesök", "nyk", 1)
  connectBlock("enhetsmöte", "reg")
  connectBlock("arbetsinriktad","träning")
  connectBlock("fontänflödet", "frön", 2)
  connectBlock("riktlinjer", "medlem")
  connectBlock("arbetsinriktad", "sfr")
  connectBlock("träning", "styrelsen")
  connectBlock("styrelsen", "studier", 0, "t")
  connectBlock("studier", "fikar")
  connectBlock("styrelsen", "städ")

  // Draw Crossword
  for (const block in wordBlocks) {
    if (wordBlocks[block].connected) {
      wordBlocks[block].draw(tx,ty)
    }
  }

  fill(0,0,0)
  textSize(30)
  
  // Draw Questions
  drawQuestions(qx,qy)
  noFill();
}

function drawQuestions(x, y) {
  i = -1;
  // Vertical
  text("Lodrätt", x+400, y-50)
  // Horizontal
  text("Vågrätt", x, y-50)
  for (const answer in qna_data) {
    i += 1
    let question = qna_data[answer]
    if(question == "None") continue
    if(i % 2 == 0) {
      text(i + ". " + question, x, y+(i*20))
    }
    else {
      text(i + ". " + question, x+400, y+((i-1)*20))
    }
  }
}

function mousePressed() {
  for (const block in wordBlocks) {
    if(wordBlocks[block].isPointInWordBlock(mouseX-tx, mouseY-ty)) {
      console.log("Highlight: ", wordBlocks[block].ans)
    }
  }
}

function connectBlock(parent_ans, child_ans, skip = 0, letter = "") {
  if(letter == "") {
    if(wordBlocks[parent_ans].connect(wordBlocks[child_ans], skip)) {
      console.log("Connected!")
    }
  }
  else {
    if(wordBlocks[parent_ans].connectAt(wordBlocks[child_ans], letter)) {
      console.log("Connected at " + letter)
    }
  }
}