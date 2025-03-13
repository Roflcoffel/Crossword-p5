let wordBlocks = {}
let qna_data = {}
const size = 64
const txt_offset = 15

//Crossword Start Position
let tx = 100
let ty = 300

function preload() {
  qna_data = loadJSON('assets/qna_data.json');
}

function setup() {
  createCanvas(1920, 1300);
  
  noFill();
  textAlign(LEFT, TOP)

  let i = 0
  for (const answer in qna_data) {
    wb = new WordBlock(answer,i,false)
    wordBlocks[answer.toLowerCase()] = wb
    i += 1
  }

  connectBlock("arbetsinriktad","fontän")
  connectBlock("arbetsinriktad","nyk")
  connectBlock("arbetsinriktad","fontänflödet")
  connectBlock("arbetsinriktad","riktlinjer")
  connectBlock("riktlinjer","redaktion","e")
  connectBlock("riktlinjer","kul","l")
  connectBlock("fontän","ohälsa")
  connectBlock("ohälsa","hus")
  connectBlock("hus", "ängelholmen")
  connectBlock("fontänflödet","nybesök")
  connectBlock("nybesök","reg")
  connectBlock("fontänflödet","riksförbund","ö")
  connectBlock("fontänflödet","enhetsmöte","e")

  // Draw Crossword
  for (const block in wordBlocks) {
    wordBlocks[block].draw(tx,ty)
  }

  fill(0,0,0)
  textSize(30)
  
  // Draw Questions
  drawQuestions(tx+1000,ty-400)
  noFill();
}

function drawQuestions(x, y) {
  i = -1;
  // Vertical
  text("Lodrätt", x, y-50+250)
  // Horizontal
  text("Vågrätt", x+400, y-50+250)
  for (const answer in qna_data) {
    i += 1
    let question = qna_data[answer]
    if(question == "None") continue
    if(i % 2 == 0) {
      text(i + ". " + question, x, y+(i*20)+250)
    }
    else {
      text(i + ". " + question, x+400, y+((i-1)*20)+250)
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