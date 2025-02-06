class WordBlock {
	constructor(ans) {
		this.ans = ans;
		this.x = 0;
		this.y = 0;
		
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
		this.x = x
		this.y = y
		if(this.children != 0) {
			this.orientation = "Horizontal"
			this.y = y+this.children[0].cross_points[this.ans]*size
			this.children[0].x = x+this.cross_points[this.children[0].ans]*size
			this.children[0].orientation = "Vertical"
		}
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
	connect(block) {
		for (let i = 0; i < this.ans.length; i++) {
			for (let j = 0; j < block.ans.length; j++) {
				if(this.ans[i] == block.ans[j]) {
					//May need boths cross points...
					//and now comes the question of how to store them
					//in the best way
					this.cross_points[block.ans] = i
					block.cross_points[this.ans] = j
				}
			}
		}

		if(this.cross_points.length == 0) {
			return false
		}
		
		this.children.push(block)
		return true
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