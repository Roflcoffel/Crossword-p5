class Block {
	constructor(letter, index, x, y) {
		this.index = index;
		this.letter = letter;
		this.x = x;
		this.y = y;
        this.tile_point = {x: x-size/2, y: y-size/2};
	}

	draw(x,y,hidden) {
        square(this.x+x,this.y+y,size)
        fill(0,0,0)
        textSize(40)
        if(!hidden) {
            text(this.letter,this.x+x+txt_offset,this.y+y+txt_offset)
        }
        textSize(15)
        text(this.index,this.x+x+5,this.y+y+5)
        noFill();
	}
}