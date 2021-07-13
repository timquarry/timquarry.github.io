//
var Width=800;
var Height=600;
var maxPoints = 20;

var blobs = new Array();
var blobCount = 5;

var floaters = new Array();
var floaterCount = 40;

var force = 2;
var damp = 0.1;
var angle = 0; // in degrees

// ************** INIT
window.onload = function() {
	canvas = document.getElementById("gumpfCanvas");
	canvas.width = Width;
	canvas.height = Height;
	context=canvas.getContext("2d");
	
	for (i=0;i<blobCount;i++) {
		blobs.push(new blob(Math.random()*Width,Math.random()*Height,6,100,20));
	}
	for (i=0;i<floaterCount;i++) {
		floaters.push(new floater(Math.random()*Width,Math.random()*Height,Math.random()*10+2));
	}
	draw();	

}


//*************** SCREEN DRAW
function draw() {
	
	var i;
	// small circle x,y,r, large circle x,y,r
	var grad=context.createRadialGradient(200,200,15,200,200,900);
	
	grad.addColorStop(0,"#FF8888");
	grad.addColorStop(1,"#121288");
	context.fillStyle=grad;
	context.fillRect(0,0,Width,Height);
	
	for (i=0;i<floaters.length;i++) {
		floaters[i].draw();
		floaters[i].updatePos();
	}
	
	for (i=0;i<blobs.length;i++) {
		blobs[i].draw();
		blobs[i].updatePos();
	}
	
	requestAnimationFrame(draw);
	
}



