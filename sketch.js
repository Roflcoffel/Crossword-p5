let wordBlocks = []
let f_answers = []
const size = 64
const txt_offset = 15

function preload() {
  f_answers = loadStrings('assets/answers.txt');
}

function setup() {
  createCanvas(1000, 1200);
  
  noFill();

  textSize(40)
  textAlign(LEFT, TOP)

  for (let i = 0; i < 2; i++) {
    let wb;
    if(i % 2 == 0) {
      wb = new WordBlock(f_answers[i])
      //wb.draw(40, 600+(i*size))
      wordBlocks.push(wb)
      continue
    }
    wb = new WordBlock(f_answers[i])
    wb.toggleOrientation()
    //wb.draw(40+(i*size), 40)
    wordBlocks.push(wb)
  }
  if(wordBlocks[0].connect(wordBlocks[1])) {
    wordBlocks[1].draw(100,100)
    wordBlocks[0].draw(100,100)
    console.log("Connected")
  }
}
