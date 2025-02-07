class WordBlock {
	constructor(ans) {
		this.ans = ans;
		this.x = 0
		this.y = 0

		this.orientation = "Horizontal";
		this.cross_points = {};
		this.invalid_points = []; //if a cross point is at 1, that makes 0 and 2 invalid points
		                          //may not need to save it in its own array hmmm...
		this.children = []; //list of WordBlock object that are connected to this block.
		                    //do not think we need to know the parent block.
		                    //May not even need this array hmmm....
	}

	toggleOrientation() {
		this.orientation = this.orientation == "Horizontal" ? "Vertical" : "Horizontal";
	}

	draw(x, y) {
		for (let i = 0; i < this.ans.length; i++) {
			if(this.orientation == "Horizontal") {
				drawBlock(this.x+x, this.y+y, i, 0, this.ans[i].toUpperCase())
			}
			else {
				drawBlock(this.x+x, this.y+y, 0, i, this.ans[i].toUpperCase())
			}
		}
	}
	// return true or false
	// if it is possible to connect the blocks, returns true on the first match
	connect(block) {
		for (let i = 0; i < this.ans.length; i++) {
			for (let j = 0; j < block.ans.length; j++) {
				if(this.ans[i] == block.ans[j]) {
					block.orientation = this.orientation == "Horizontal" ? "Vertical" : "Horizontal"
					if(block.orientation == "Horizontal") {
						//this now works but my brain needed to melt in order to get it to work
						//need to add the previous connected blocks position i think
						//otherwise we start over at 0x and 0y.
						block.x = this.x-j*size
						block.y = this.y+i*size
					} else {
						block.y = this.y-j*size
						block.x = this.x+i*size
					}
					this.children.push(block)
					return true
				}
			}
		}
		return false
	}
}

function drawBlock(x, y, x_i, y_i, letter) {
	square(x+(x_i*size),y+(y_i*size),size)
	fill(0,0,0)
	text(
		letter, 
		x+(x_i*size)+txt_offset, 
		y+(y_i*size)+txt_offset
	)
	noFill();
}