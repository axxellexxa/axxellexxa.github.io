//counter-clockwise; from upper-left
var directions = [[-10, -10], [0, -10], [10, -10], [10, 0], [10, 10], [0, 10], [-10, 10], [-10, 0]];

var cWidth = 640;
var cHeight = 640;

var canvas = document.getElementById('canvas');
canvas.width = cWidth;
canvas.height = cHeight;
c = canvas.getContext("2d");

function reset() {
	/*c.clearRect(0, 0, cWidth, cHeight);
	for (var i = 0; i < 64; i++) {
		c.beginPath();
		c.moveTo(-1+(i*10), 0);
		c.lineTo(-1+(i*10), 640);
		c.lineWidth = 1;
		c.strokeStyle = "#aaa";
		c.stroke();
	}
	for (var i = 0; i < 64; i++) {
		c.beginPath();
		c.moveTo(0, -1+(i*10));
		c.lineTo(640, -1+(i*10));
		c.lineWidth = 1;
		c.strokeStyle = "#aaa";
		c.stroke();
	}*/
	for (var j = 0; j < 64; j++) {
		for (var i = 0; i < 64; i++) {
			c.beginPath();
			c.rect((i*10), (j*10), 10, 10);
			c.fillStyle = "#fff";
			c.fill();
			c.strokeStyle = "#aaa";
			c.stroke();
		}
	}
}

reset();

var tx;
var ty;
function getMousePosition(canvas, event) { 
	let rect = canvas.getBoundingClientRect(); 
	tx = event.clientX - rect.left; 
	ty = event.clientY - rect.top;
}

var canvasElem = document.querySelector("canvas"); 
canvasElem.addEventListener("mousedown", function(e)
{ 
	getMousePosition(canvasElem, e);
	tx = -1+Math.floor(tx/10)*10;
	ty = -1+Math.floor(ty/10)*10;

	c.beginPath();
	c.rect(tx, ty, 10, 10);
	c.fillStyle = "#000";
	c.fill();
	c.strokeStyle = "#000";
	c.stroke();
});


function step() {
	var change = [];
	var t0 = performance.now();
	for (var j = 0; j < 64; j++) {
		for (var i = 0; i < 64; i++) {
			var nData = [];
			nData.push((i*10), (j*10));
			for (var n = 0; n < 8; n++) {
				var snData = c.getImageData(2+(i*10)+directions[n][0], 2+(j*10)+directions[n][1], 1, 1);
				if (snData.data[0] == 0 && snData.data[1] == 0 && snData.data[2] == 0 && snData.data[3] == 255) {
					nData.push(snData);
				}
			}
			change.push(nData);
		}
	}
	/*if (nData.length < 4 || nData.length > 5){
				c.beginPath();
				c.rect(nData[0]-1, nData[1]-1, 10, 10);
				c.fillStyle = "#fff";
				c.fill();
				c.strokeStyle = "#aaa";
				c.stroke();
			} else if (nData.length == 4 || nData.length == 5) {
				c.clearRect(nData[0]-1, nData[1]-1, 10, 10);
				c.beginPath();
				c.rect(nData[0]-1, nData[1]-1, 10, 10);
				c.fillStyle = "#000";
				c.fill();
				c.strokeStyle = "#000";
				c.stroke();
			}*/
	var t1 = performance.now();
	change.forEach(function blink(a){
		//dead
		if (a.length < 4 || a.length > 5){
			c.beginPath();
			c.rect(a[0], a[1], 10, 10);
			c.fillStyle = "#fff";
			c.fill();
			c.strokeStyle = "#aaa";
			c.stroke();
		//alive
		} else if (a.length == 4 || a.length == 5) {
			c.clearRect(a[0], a[1], 10, 10);
			c.beginPath();
			c.rect(a[0]-1, a[1]-1, 10, 10);
			c.fillStyle = "#000";
			c.fill();
			c.strokeStyle = "#000";
			c.stroke();
		}
	});
	console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
	//console.log(change);
}


function io(){
	var text = document.getElementById("io").innerHTML;
	if (text == "Play"){
		document.getElementById("io").innerHTML = "Pause";
		var play = window.setInterval(step(), 2000);
	} else {
		document.getElementById("io").innerHTML = "Play";
		window.clearInterval(play);
	}
}

function rando(num) {
	for (var j = 0; j < 64; j++) {
		for (var i = 0; i < 64; i++) {
			if (Math.random() > num){
				c.clearRect((i*10), (j*10), 10, 10);
				c.beginPath();
				c.rect((i*10)-1, (j*10)-1, 10, 10);
				c.fillStyle = "#000";
				c.fill();
				c.strokeStyle = "#000";
				c.stroke();
			}
		}
	}
}

/*alive = [];
		document.getElementById("io").innerHTML = "Pause";
		for (var j = 0; j < 64; j++) {
			for (var i = 0; i < 64; i++) {
				var img = c.getImageData(2+(i*10), 2+(j*10), 1, 1);
				if (img.data[0] == 0 && img.data[1] == 0 && img.data[2] == 0 && img.data[3] == 255) {
					var ax = i*10;
					var ay = j*10;
					alive.push([ax, ay]);
				}
			}
		}
		nData = [];
		alive.forEach(function checkNeighbors(obj, i){
			var directions = [[-10, -10], [0, -10], [10, -10], [10, 0], [10, 10], [0, 10], [-10, 10], [-10, 0]];
			snData = [];
			directions.forEach(function loopDirections(dir, j){
				snData.push(c.getImageData(obj[0]-dir[0], obj[1]-dir[1], 1, 1));
			});
			nData.push(snData);
		});

		RIP Code 2020-2020

		*/