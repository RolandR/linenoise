

var canvasContainer = document.getElementById("canvasContainer");

var canvas = document.getElementById("renderCanvas");
var context = canvas.getContext("2d");

var height = ~~(canvasContainer.clientHeight);
var width = ~~(canvasContainer.clientWidth);

canvas.height = height;
canvas.width = width;

var seed = Math.random();
noise.seed(seed);

var maxLife = 100;
var lineCount = 10000;
var linesAdded = Math.floor(lineCount/maxLife);

lineCount = linesAdded*maxLife;

var lines = new Float32Array(lineCount*2);
var offset = 0;

lines = lines.map(Math.random);

var pos = 0;
var posIncrement = 0.0001;

var sin = Math.sin;
var cos = Math.cos;

step();

function step(){
	render();
	addLines();
	requestAnimationFrame(step);
}

function addLines(){
	for(var i = 0; i < linesAdded; i++){
		lines[((i+offset)%lineCount)*2  ] = Math.random();
		lines[((i+offset)%lineCount)*2+1] = Math.random();
	}
	offset = (offset + linesAdded) % lineCount;
}

function render(){
	
	context.strokeStyle = "#FFFFFF";
	context.lineWidth = 0.8;

	//context.clearRect(0, 0, width, height);
	context.fillStyle = "rgba(0, 0, 0, 0.15)";
	context.fillRect(0, 0, width, height);
	
	pos += posIncrement;
	
	var x;
	var y;
	var res;
	var m;
	var value;
	var angle;
	var age;
	var length;
	var s;
	var c;
	var dx;
	var dy;
	var crop = 50;
	var baseLength = 10;
	
	context.beginPath();
	
	for(var i = 0; i < lines.length; i += 2){
		
		x = lines[i] * (width+2*crop) - crop;
		y = lines[i+1] * (height+2*crop) - crop;
		
		if(!(x >= -crop && x <= width+crop && y >= -crop && y <= height+crop)){
			continue;
		}
		
		res = ((width+height)/2)*10;
		var factor = 0.5;
		var factorFactor = 0.9;
		value = 0;
		
		value += (noise.simplex3(x/res, y/res, pos)/2+0.5) * factor;
		res = res/2;
		factor = factor*factorFactor;
		value += (noise.simplex3(x/res, y/res, pos)/2+0.5) * factor;
		res = res/2;
		factor = factor*factorFactor;
		value += (noise.simplex3(x/res, y/res, pos)/2+0.5) * factor;
		res = res/2;
		factor = factor*factorFactor;
		value += (noise.simplex3(x/res, y/res, pos)/2+0.5) * factor;
		res = res/2;
		factor = factor*factorFactor;
		value += (noise.simplex3(x/res, y/res, pos)/2+0.5) * factor;
		res = res/2;
		factor = factor*factorFactor;
		value += (noise.simplex3(x/res, y/res, pos)/2+0.5) * factor;
		res = res/2;
		factor = factor*factorFactor;
		
		angle = value*3*Math.PI;
		age = ((lineCount+offset-i/2)%lineCount)/lineCount;
		
		length = baseLength*(1-Math.pow(age*2-1, 2));
		
		s = sin(angle);
		c = cos(angle);
		
		dx = s * (length/2);
		dy = c * (length/2);
		
		
		context.moveTo(x-dx, y-dy);
		context.lineTo(x+dx, y+dy);
		
		var speed = 0.7;
		
		lines[i]   += s / width * speed;
		lines[i+1] += c / height * speed;
	}
	context.stroke();
	
}

window.addEventListener("resize", function(e){
	height = ~~(canvasContainer.clientHeight);
	width = ~~(canvasContainer.clientWidth);

	canvas.height = height;
	canvas.width = width;
	
}, false);