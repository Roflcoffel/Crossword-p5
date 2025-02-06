
let answers = []
const size = 64
const txt_offset = 15

function preload() {
  answers = loadStrings('assets/answers.txt');
}


function setup() {
  createCanvas(1000, 1200);
  
  noFill();

  textSize(40)
  textAlign(LEFT, TOP)

  for (let i = 0; i < answers.length; i++) {
    if(i % 2 == 0) {
      for (let j = 0; j < answers[i].length; j++) {
        square(40+(j*size),600+(i*size),size)
        fill(0,0,0)
        text(
          answers[i][j].toUpperCase(), 
          40+(j*size)+txt_offset, 
          600+(i*size)+txt_offset
        )
        noFill();
      }  
      continue
    }

    for (let j = 0; j < answers[i].length; j++) {
      square(40+(i*size),40+(j*size),size)
      fill(0,0,0)
      text(
        answers[i][j].toUpperCase(), 
        40+(i*size)+txt_offset,
        40+(j*size)+txt_offset
      )
      noFill();
    }
  }
}
