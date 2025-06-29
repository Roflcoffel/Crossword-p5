class WordBlock {
	constructor(ans, id, hidden) {
		this.id = id;
		this.ans = ans;
		this.x = 0
		this.y = 0
		this.hidden = hidden
		this.connected = false

		this.orientation = "Vertical";
		this.used_letters = []; // Keeps track of all used letters with the letter index in a wordblock
	}
	
	// sets the opposite orientation of the wordblock passed in.
	setOppositeOrientation(wordblock) {
		this.orientation = wordblock.orientation == "Horizontal" ? "Vertical" : "Horizontal";
	}

	toggleOrientation() {
		this.orientation = this.orientation == "Horizontal" ? "Vertical" : "Horizontal";
	}

	toggleHidden() {
		this.hidden = !this.hidden
	}

	draw(x, y) {
		for (let i = 0; i < this.ans.length; i++) {
			let x_offset = this.orientation == "Horizontal" ? i*size : 0
			let y_offset = this.orientation == "Vertical" ? i*size : 0
			drawBlock(this.x+x+x_offset, this.y+y+y_offset, this.ans[i].toUpperCase(), this.hidden)
			if(i == 0) {
				textSize(15)
				text(this.id,this.x+x+x_offset+5,this.y+y+y_offset+5)
			}
			noFill();
		}
	}

	// if it is possible to connect the blocks, returns true on the first match
	// skip, is a number, which indicates how many correct matches to skip
	// an example of when to skip is if we have the same letter and want to connect it at the end.
	connect(block, skip) {
		for (let i = 0; i < this.ans.length; i++) {
			if(this.used_letters.length != 0) {
				if(this.used_letters.some(v => v == i)) {
					console.log("Skipped", i)
					continue
				}
			}
			for (let j = 0; j < block.ans.length; j++) {
				if(this.ans[i] == block.ans[j]) {
					if(skip == 0) {		
						block.setOppositeOrientation(this)
						block.x = block.orientation == "Horizontal" ? this.x-j*size : this.x+i*size
						block.y = block.orientation == "Horizontal" ? this.y+i*size : this.y-j*size

						this.used_letters.push(i-1,i,i+1)
						block.used_letters.push(j-1,j,j+1)

						this.connected = true
						block.connected = true
						return true
					}
					skip = skip - 1
				}
			}
		}
		return false
	}

	//Connects at a specific letter
	connectAt(block, letter) {
		let i = this.ans.indexOf(letter)
		let j = block.ans.indexOf(letter)
		if(i == -1 || j == -1) {
			console.log("Could not find the letter!")
			return false
		}

		if(this.used_letters.some(v => v == i)) {
			return false
		}

		block.setOppositeOrientation(this)
		block.x = block.orientation == "Horizontal" ? this.x-j*size : this.x+i*size
		block.y = block.orientation == "Horizontal" ? this.y+i*size : this.y-j*size
		this.used_letters.push(i-1,i,i+1)
		block.used_letters.push(j-1,j,j+1)

		this.connected = true
		block.connected = true

		return true
	}

	// Checks if a point is within the Wordblock.
	isPointInWordBlock(point_x, point_y) {
		let x = this.orientation == "Horizontal" ? this.ans.length*size : size
		let y = this.orientation == "Vertical" ? this.ans.length*size : size

		return this.x < point_x && point_x < this.x+x && this.y < point_y && point_y < this.y+y
	}
}

function drawBlock(x, y, letter, hidden) {
	square(x,y,size)
	fill(0,0,0)
	textSize(40)
	if(!hidden) {
		text(letter,x+txt_offset,y+txt_offset)
	}
}