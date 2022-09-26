 
let player = null;
let direction = "right"; // you start moving to the right, could make this random
let apple = null;
let id = null; 

let canChangeDir = true;

// walls // 
// there are better ways of doing this but oh well
const wallWidth = 600;
const wallHeight = 600;
let wallsWidth1 = [];
let wallsWidth2 = [];
let wallsHeight1 = [];
let wallsHeight2 = [];

let score;
let scoreDiv = null;

let walls = [];

const appleSpawnRadius = 545;

function restart() {
	for(let i = 0; i < player.getPieces().length; i++) {
		document.body.removeChild(player.getPieces()[i]);
	}
	document.body.removeChild(apple.getDiv());
	player = null;
	apple = null;
	direction = "right";
	clearTimeout(id);
	start();
}

function createBorder(width, height) { // the width and height must be % 15 = 0

	while(wallsWidth1.length * 15 < wallWidth) {
		let div = createDiv(wallsWidth1.length * 15, 0, 15, 15, "gray")
		wallsWidth1.push(div);
		walls.push(div);
	}
	while(wallsWidth2.length * 15 < wallWidth) {
		let div = createDiv(wallsWidth2.length * 15, wallHeight, 15, 15, "gray")
		wallsWidth2.push(div);
		walls.push(div);
	}
	
	while(wallsHeight1.length * 15 < wallHeight) {
		let div = createDiv(0, wallsHeight1.length * 15, 15, 15, "gray");
		wallsHeight1.push(div);
		walls.push(div);
	}
	while(wallsHeight2.length * 15 < wallHeight) {
		let div = createDiv(wallWidth, wallsHeight2.length * 15, 15, 15, "gray");
		wallsHeight2.push(div);
		walls.push(div);
	}
		
}


function Apple(x, y) {
	this.x = x + 15;
	this.y = y + 15; // can't spawn in the wall
	this.div = createDiv(parseInt((this.x/15))*15, parseInt((this.y/15))*15, 15, 15, "red");
	console.log(this.x);
	console.log(parseInt(this.x/15) * 15);
	
	
	this.getDiv = function() {
		return this.div;
	}
	
	this.getX = function() {
		return this.x;
	}
	
	this.getY = function() {
		return this.y;
	}
	
	this.eat = function() {  
		switch(direction) {
			case "right":
				player.setEndOnly(createDiv(-5000, -5000, 15, 15, "purple"));
				break;
			case "left":
				player.setEndOnly(createDiv(-5000, -5000, 15, 15, "purple"));
				break;
			case "up":
				player.setEndOnly(createDiv(-5000, -5000, 15, 15, "purple"));
				break;
			case "down":
				player.setEndOnly(createDiv(-5000, -5000 + 15, 15, 15, "purple"));
				break;
		}
		updateScore();
		document.body.removeChild(this.div);
	}
}


function createDiv(id_x, id_y, width, height, color) {
        const el = document.createElement("div");
        el.style.width =  width + "px";
        el.style.height =  height + "px";
        el.style.left = id_x + "px";
        el.style.top = id_y + "px";
        el.style.color = color;
        el.style.backgroundColor = color;
        el.style.display = "inline-block";
        el.style.position = "fixed";
        document.body.appendChild(el);
        return el;
}

function Snake(head, end) {
	this.head = head;
	this.end = end;
	this.pieces = [];
	
	this.getPieces = function() {
		return this.pieces;
	}
	
	this.getHead = function() {
		return this.head;
	}
	
	this.setHead = function(newHead) {
		this.pieces.unshift(newHead);
		this.head = newHead;
	}
	
	this.getEnd = function() {
		return this.end;
	}
	
	this.setEnd = function(newEnd) {
		let newHead = this.pieces.pop();
		this.end = newEnd;
		this.setHead(newHead);
	}
	
	this.setEndOnly = function(newEnd) {
		this.end = newEnd;
		this.pieces.push(newEnd);
	}
	
	this.getPieces = function() {
		return this.pieces;
	}
	
	this.move = function() {
		switch(direction) {
			case "right":
				this.getEnd().style.left = parseInt(this.getHead().style.left) + 15 + "px";
				this.getEnd().style.top = this.getHead().style.top;
				break;
			case "left":
				this.getEnd().style.left = parseInt(this.getHead().style.left) - 15 + "px";
				this.getEnd().style.top = this.getHead().style.top;
				break;
			case "up":
				this.getEnd().style.top = parseInt(this.getHead().style.top) - 15 + "px";
				this.getEnd().style.left = this.getHead().style.left;
				break;
			case "down":
				this.getEnd().style.top = parseInt(this.getHead().style.top) + 15 + "px";
				this.getEnd().style.left = this.getHead().style.left;
				break;
		}
		let head = this.getHead(); // hopefully not a pointer
		//this.setHead(this.end);
		console.log(this.getPieces());
		this.setEnd(this.getPieces()[this.getPieces().length - 2]);
		
		
		console.log(parseInt(this.getHead().style.left));
		console.log(parseInt(apple.getX()));
		
		if(parseInt(this.getHead().style.left) == parseInt(apple.getX()) && parseInt(this.getHead().style.top) == parseInt(apple.getY())) {
			apple.eat();
			apple = new Apple(parseInt((Math.random() * appleSpawnRadius)/15)*15, parseInt((Math.random() * appleSpawnRadius)/15)*15);
			console.log("a;lskjdflajksd;lfjas;ldkfj;lsdkjf");
		}
		
		for(let i = 1; i < this.getPieces().length; i++) {
			let piece = this.getPieces()[i];
			if(parseInt(this.getHead().style.left) == parseInt(piece.style.left) && parseInt(this.getHead().style.top) == parseInt(piece.style.top)) {
				restart();
			}
		}
		
		for(let i = 0; i < walls.length; i++) {
			let wall = walls[i];
			if(parseInt(this.getHead().style.left) == parseInt(wall.style.left) && parseInt(this.getHead().style.top) == parseInt(wall.style.top)) {
				restart();
			}
			
		}
		
		canChangeDir = true;
		
	}
	
	this.add = function(newSnakePiece) {
		// this will probably get more complex
		this.pieces.push(newSnakePiece);
	}
}

function press(ev) {
	if(canChangeDir) {
        switch(ev.key) {
            case "ArrowLeft":
            case "A":
            case "a":
                if(direction !== "right") {
                    direction = "left";
					canChangeDir = false;
                }
                break;
            case "ArrowRight":
            case "D":
            case "d":
                if(direction !== "left") {
                    direction = "right";
					canChangeDir = false;
                }
                break;
            case "ArrowUp":
            case "W":
            case "w":
                if(direction !== "down") {
                    direction = "up";
					canChangeDir = false;
                }
                break;
            case "ArrowDown":
            case "S":
            case "s":
                if(direction !== "up") {
                    direction = "down";
					canChangeDir = false;
                }
                break;
            default:
                break;
        }
	}
}

function updateScore() {
	score = player.getPieces().length;
	if(scoreDiv == null) {
	console.log("creating score");
	const el = document.createElement("h1");
        el.style.left = 500 + "px";
        el.style.top =  25 + "px";
        el.style.color = "black";
		el.style.fontSize = "16px";
        el.style.display = "inline-block";
		el.style.position = "fixed"
		el.innerText = "Score : " + score;
		el.style.zIndex = 3;
        document.body.appendChild(el);
		scoreDiv = el;
		console.log(scoreDiv);
	}
	scoreDiv.innerText = "Score : " + score;
}

function logic() {
	player.move();	
	updateScore();
}

function start() {
	console.log("The game has started!");
	createBorder();
	let firstHead = createDiv(75, 15, 15, 15, "purple");
	let mid1 = createDiv(60, 15, 15, 15, "purple");
	let mid2 = createDiv(45, 15, 15, 15, "purple");
	let mid3 = createDiv(30, 15, 15, 15, "purple");
	let firstEnd = createDiv(15, 15, 15, 15, "purple");
	player = new Snake(firstHead, firstEnd);
	player.add(firstHead);
	player.add(mid1);
	player.add(mid2);
	player.add(mid3);
	player.add(firstEnd);
	score = player.getPieces().length;
	apple = new Apple(parseInt((Math.random() * appleSpawnRadius)/15)*15,  parseInt((Math.random() * appleSpawnRadius)/15)*15);
	id = setInterval(logic, 66.6667); // about 15 fps, this is fine for snake
}

