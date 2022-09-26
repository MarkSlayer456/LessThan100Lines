function createDiv(id_x, id_y, width, height, color) {
	const el = document.createElement("div");
	el.style.width = width + "px";
	el.style.height = height + "px";
	el.style.left = id_x + "px";
	el.style.top = id_y + "px";
	el.style.position = "fixed";
	el.style.backgroundColor = color;
	document.body.appendChild(el);
	return el;
}
let width = 50; // default height for everything
let height = 50; // default width for everything
let dir = "right"; // direction we are moving in
let canChangeDir = true;
function Object(x, y, color) {
	this.div = createDiv(parseInt(x), parseInt(y), width, height, color);
}
let i = 0;
while(1000 >= width * i) {
	let el = new Object(i*width, 0, "grey");
	let el2 = new Object(i*width, 550, "grey");
	i++;
}
i = 0;
while(500 >= height * i) {
	let el = new Object(0, i*height, "grey");
	let el2 = new Object(1050, i*height, "grey");
	i++;
}
function press(ev) {
	if(canChangeDir) {
		if(ev.key == "ArrowLeft") {
			if(dir !== "right") {
				dir = "left";
				canChangeDir = false;
			}
		} else if(ev.key == "ArrowRight") {
			if(dir !== "left") {
                    dir = "right";
					canChangeDir = false;
                }
		} else if(ev.key == "ArrowUp") {
			if(dir !== "down") {
				dir = "up";
				canChangeDir = false;
			}
		} else if(ev.key == "ArrowDown") {
			if(dir !== "up") {
				dir = "down";
				canChangeDir = false;
			}
		}
	}
}
let player;
function restart() {
	if(player != null) {
		for(let i = 0; i < player.length; i++) {
			document.body.removeChild(player[i].div);
		}
		document.body.removeChild(apple.div);
	}
	player = [new Object(250, 50, "purple"), new Object(200, 50, "purple"), new Object(150, 50, "purple"), new Object(100, 50, "purple"), new Object(50, 50, "purple")];
	apple = new Object(400, 400, "red");
	dir = "right";
}
restart();
function logic() {
	player[player.length-1].div.style.left = (parseInt(player[0].div.style.left)) + "px";
	player[player.length-1].div.style.top = (parseInt(player[0].div.style.top)) + "px";
	if(dir == "left") {
		player[player.length-1].div.style.left = (parseInt(player[0].div.style.left) - width) + "px";
	} else if(dir == "right") {
		player[player.length-1].div.style.left = (parseInt(player[0].div.style.left) + width) + "px";
	} else if(dir == "up") {
		player[player.length-1].div.style.top = (parseInt(player[0].div.style.top) - height) + "px";
	} else if(dir == "down") {
		player[player.length-1].div.style.top = (parseInt(player[0].div.style.top) + height) + "px";
	}
	last = player.pop();
	player.unshift(last);
	canChangeDir = true;
	if(apple.div.style.left == player[0].div.style.left && apple.div.style.top == player[0].div.style.top) {
		player.push(new Object(-1000, -1000, "purple"));
		apple.div.style.left = parseInt((Math.random()*1000)/50) * 50 + 50 + "px";
		apple.div.style.top = parseInt((Math.random()*500)/50) * 50 + 50 + "px";
	}
	if(parseInt(player[0].div.style.left) > 1000 || parseInt(player[0].div.style.top) > 500 || parseInt(player[0].div.style.left) < 50 || parseInt(player[0].div.style.top) < 50) {
		restart();
	}
	for(let i = 1; i < player.length; i++) {
		if(player[0].div.style.left == player[i].div.style.left && player[0].div.style.top == player[i].div.style.top) {
			restart();
		}
	}
}
id = setInterval(logic, 66.6667); // about 7.5 fps, this is fine for snake
