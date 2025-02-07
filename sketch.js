let wordBlocks = {}
let f_answers = []
let f_questions = []
const size = 64
const txt_offset = 15

function preload() {
  f_answers = loadStrings('assets/answers.txt');
  f_questions = loadStrings('assets/questions.txt')
}

function setup() {
  createCanvas(1920, 1080);
  
  noFill();
  textAlign(LEFT, TOP)

  for (let i = 0; i < f_answers.length; i++) {
    wb = new WordBlock(f_answers[i], i, true)
    wordBlocks[f_answers[i].toLowerCase()] = wb
  }

  let tx = 200
  let ty = 400
  //if we cannot connect, cycle the wordBlocks array using splice(index,1) and then push it back at the end.
  connectBlock("arbetsinriktad","fontän")
  connectBlock("arbetsinriktad","struktur")
  connectBlock("arbetsinriktad","nyk")
  connectBlock("arbetsinriktad","fontänflödet")
  connectBlock("fontän","ohälsa")
  connectBlock("ohälsa","hus")
  connectBlock("hus", "ängelholmen")
  
  for (const block in wordBlocks) {
    if(wordBlocks[block].id < 8) {
      wordBlocks[block].draw(tx,ty)
    }
  }

  fill(0,0,0)
  textSize(30)
  for (let i = 0; i < f_questions.length; i++) { 
    if(i % 2 == 0) {
      text(i + ". " + f_questions[i], tx, ty+(i*20)+420)
    }
    else {
      text(i + ". " + f_questions[i], tx+400, ty+((i-1)*20)+420)
    }
  }
  noFill();
}

function connectBlock(parent_ans, child_ans) {
  if(wordBlocks[parent_ans].connect(wordBlocks[child_ans])) {
    console.log("Connected!")
  }
}
