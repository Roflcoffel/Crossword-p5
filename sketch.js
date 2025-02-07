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

  //if we cannot connect, cycle the wordBlocks array using splice(index,1) and then push it back at the end.
  if(wordBlocks[0].connect(wordBlocks[1])) {
    console.log("Connected 1")
  }
  if(wordBlocks[1].connect(wordBlocks[2])) {
    console.log("Connected 2")
  }
  wordBlocks[0].draw(200,400)
  wordBlocks[1].draw(200,400)
  wordBlocks[2].draw(200,400)
}
