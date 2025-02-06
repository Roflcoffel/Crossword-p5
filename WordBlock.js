class WordBlock {
	constructor(ans, x, y) {
		this.ans = ans;
		this.x = x;
		this.y = y;
		
		this.orientation = "Horizontal";
		this.cross_points = [];
		this.invalid_points = []; //if a cross point is at 1, that makes 0 and 2 invalid points
		                          //may not need to save it in its own array hmmm...
		this.children = []; //list of WordBlock object that are connected to this block.
		                    //do not think we need to know the parent block.
		                    //May not even need this array hmmm....
	}

	toggleOrientation() {
		this.orientation = this.orientation == "Horizontal" ? "Vertical" : "Horizontal";
	}

	draw() {
		for (let i = 0; i < this.ans.length; i++) {
			if(this.orientation == "Horizontal") {
				drawBlock(this.x, this.y, i, 0, this.ans[i].toUpperCase())
			}
			else {
				drawBlock(this.x, this.y, 0, i, this.ans[i].toUpperCase())
			}
		}
	}
	// return true or false
	// if it is possible to connect the blocks
	connect(block) {}	
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