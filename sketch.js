let wordBlocks = []
let f_answers = []
const size = 64
const txt_offset = 15

function preload() {
  f_answers = loadStrings('assets/answers.txt');
}

function setup() {
  createCanvas(1920, 1080);
  
  noFill();

  textSize(40)
  textAlign(LEFT, TOP)

  for (let i = 0; i < f_answers.length; i++) {
    wb = new WordBlock(f_answers[i])
    wordBlocks.push(wb)
  }

  let tx = 200
  let ty = 400
  //if we cannot connect, cycle the wordBlocks array using splice(index,1) and then push it back at the end.
  
  connectBlock(0,1)
  connectBlock(0,4)
  connectBlock(0,8)
  connectBlock(1,2)
  connectBlock(2,3)
  
  for (let i = 0; i < 5; i++) {
    wordBlocks[i].draw(tx,ty)
  }
  wordBlocks[8].draw(tx,ty)
}

function connectBlock(parent_i, child_i) {
  if(wordBlocks[parent_i].connect(wordBlocks[child_i])) {
    console.log("Connected!")
  }
}
