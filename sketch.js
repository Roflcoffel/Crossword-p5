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

  let wb;
  for (let i = 0; i < f_answers.length; i++) {
    if(i % 2 == 0) {
      wb = new WordBlock(f_answers[i], 40, 600+(i*size))
      wb.draw()
      continue
    }
    wb = new WordBlock(f_answers[i], 40+(i*size), 40)
    wb.toggleOrientation()
    wb.draw()
  }
  wordBlocks.push(wb)
}
