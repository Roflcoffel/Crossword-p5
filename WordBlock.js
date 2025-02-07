class WordBlock {
	constructor(ans, id, hidden) {
		this.id = id; // used when hidden so we know which question this answer is connected to.
		this.ans = ans;
		
		this.x = 0
		this.y = 0
		this.hidden = hidden

		this.orientation = "Horizontal";
		this.used_points = []; // Keeps track of all used points in a wordblock
		this.children = []; //list of WordBlock object that are connected to this block.
	}

	toggleOrientation() {
		this.orientation = this.orientation == "Horizontal" ? "Vertical" : "Horizontal";
	}

	toggleHidden() {
		this.hidden = !this.hidden
	}

	draw(x, y) {
		for (let i = 0; i < this.ans.length; i++) {
			if(this.orientation == "Horizontal") {
				drawBlock(this.x+x, this.y+y, i, 0, this.ans[i].toUpperCase(), this.id, this.hidden)
			}
			else {
				drawBlock(this.x+x, this.y+y, 0, i, this.ans[i].toUpperCase(), this.id, this.hidden)
			}
		}
	}
	// return true or false
	// if it is possible to connect the blocks, returns true on the first match
	connect(block) {
		for (let i = 0; i < this.ans.length; i++) {
			if(this.used_points.length != 0) {
				if(this.used_points.some(v => v == i)) {
					console.log("Skipped", i)
					continue
				}
			}
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
					this.used_points.push(i-1,i,i+1) //This will give me i values outside the range
					                                 //We can savely ignore those.
					block.used_points.push(j-1,j,j+1)
					this.children.push(block)
					return true
				}
			}
		}
		return false
	}
}

function drawBlock(x, y, x_i, y_i, letter, id, hidden) {
	square(x+(x_i*size),y+(y_i*size),size)
	fill(0,0,0)
	textSize(40)
	if(!hidden) {
		text(
			letter, 
			x+(x_i*size)+txt_offset, 
			y+(y_i*size)+txt_offset
		)
	}
	textSize(15)
	text(id,x+5,y+5)
	noFill();
}