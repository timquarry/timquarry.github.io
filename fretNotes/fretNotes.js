
var notesSharp = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]; // octave 1
var notesSharpClefPos = [0,0,1,1,2,3,3,4,4,5,5,6];

notesSharp = notesSharp.concat(["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]); // octave 2
notesSharpClefPos = notesSharpClefPos.concat([7,7,8,8,9,10,10,11,11,12,12,13]);

notesSharp = notesSharp.concat(["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]); // octave 3
notesSharpClefPos = notesSharpClefPos.concat([14,14,15,15,16,17,17,18,18,19,19,20]);

notesSharp = notesSharp.concat(["C","C#","D","D#","E","F"]); // octave 4
notesSharpClefPos = notesSharpClefPos.concat([21,21,22,22,23,24]);


var notesFlat =  ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]; // octave 1
var notesFlatClefPos = [0,1,1,2,2,3,4,4,5,5,6,6];

notesFlat = notesFlat.concat(["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]); // octave 2
notesFlatClefPos = notesFlatClefPos.concat([7,8,8,9,9,10,11,11,12,12,13,13]);

notesFlat = notesFlat.concat(["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]); // octave 3
notesFlatClefPos = notesFlatClefPos.concat([14,15,15,16,16,17,18,18,19,19,20,20]);

notesFlat = notesFlat.concat(["C","Db","D","Eb","E","F"]); // octave 3
notesFlatClefPos = notesFlatClefPos.concat([21,22,22,23,23,24]);


// fretboard stuff

var fretBoard;
var fret_ctx;
var fretboardBG = new Image();
fretboardBG.src = "images/fretboard.png";

var Width=800;
var Height=170;
var numStrings=6;
var numFrets=15;   // including "0" fret
var fret=0;
var string=1;


var fret = new Array();
var fretNote = new Array();  

// clef stuff

var clef;
var clef_ctx;

var trebleClef = new Image();
trebleClef.src = "images/treble_clef.png";
var cross= new Image();
cross.src = "images/X.png";
var tick = new Image();
tick.src = "images/Tick.png";
var flat = new Image();
flat.src = "images/Flat.png";
var sharp = new Image();
sharp.src = "images/Sharp.png";

// global variables

var current_note=12;    // current note to process
var current_acc;      // whether or not we are using the flats or sharps arrays
var loNote=0;         // lowest note in current tuning
var hiNote=42;       // highest note in current tuning

var string = new Array(); // array to hold string/fret values

function stringClass(startNote,startValue) {    // hold the note values at each fret for a string
	this.startNote = startNote;
	this.startValue = startValue;
	this.fret = new Array();
	this.fill = function() {
		for (i=0;i<=numFrets;i++) {
			this.fret[i] = this.startValue + i;
		}
	}
}

window.onload = function() {

	var i=0;

// Fretboard stuff
	fretBoard = document.getElementById("fretBoard");
	fretBoard.width = Width;
	fretBoard.height = Height;
	fret_ctx=fretBoard.getContext("2d");
	fretboardBG.onload = fret_ctx.drawImage(fretboardBG,0,0);
	
	fretBoard.addEventListener("click",fretClick);

// clef stuff
	clef = document.getElementById("clef");
	clef.width = Width;
	clef.height = Height+160;
	clef_ctx=clef.getContext("2d");
	drawClef();

	setTuning("E");   // start with standard tuning

	randNote();
}

function setTuning(tuning) {
	
//
// fill the strings with note values
// starting at low C  as 0
//
	tuning= "E";   // start with standard tuning for the time being
	switch (tuning) {
		case("E") :
			string[1]=new stringClass("E",28);
			string[2]=new stringClass("B",23);
			string[3]=new stringClass("G",19);
			string[4]=new stringClass("D",14);
			string[5]=new stringClass("A",9);
			string[6]=new stringClass("E",4);
			loNote=4;
			hiNote=32;
			break;
		default:
	}
	
	// fill the strings/frets with appropriate values
	for (var i=1;i<=6;i++) {
		string[i].fill();
	}

}
	
function fretClick(e) {

		var rect = this.getBoundingClientRect();
		var mouseX = e.clientX-rect.left;
		var mouseY = e.clientY-rect.top;
		
		var s = Math.round( (mouseY+2)*(numStrings+1)/Height);
		var f = Math.round((mouseX-30) * numFrets/Width);
		
		var posX = f * (Width/numFrets) + 30;
		var posY = s * (Height/(numStrings+1))-2;
		
		if (string[s].fret[f] == current_note) {
			fret_ctx.drawImage(tick,posX-25,posY-20); 
		}
		else {
			fret_ctx.drawImage(cross,posX-17,posY-15);
		}
		
}
	
function randNote() {
	
// generate random note - between lonote and hinote

	current_note=Math.floor(Math.random()*(hiNote-loNote)+loNote);
	current_acc = Math.random();
	
// display it on the clef
	drawClef(); // clear the clef
	drawNoteClef(current_note,current_acc);

// clear the fretboard
	fret_ctx.drawImage(fretboardBG,0,0); 	
}

function drawClef() {

	var xStart,xEnd;
	var yStart=110;
	var ySpace=22;
	var i=0;
	
	clef_ctx.rect(0,0,Width,Height+160);
	clef_ctx.fillStyle="white";
	clef_ctx.fill();
	
	
	clef_ctx.lineWidth=2;
	clef_ctx.strokeStyle="#000000";
	// draw saff lines
	for (i=0;i<5;i++) {
		clef_ctx.beginPath();
		clef_ctx.moveTo(0,(yStart+i*ySpace));
		clef_ctx.lineTo(Width,(yStart+i*ySpace));
		clef_ctx.stroke();
	}
	
	// end bars
	clef_ctx.strokeStyle="#000000";
	clef_ctx.beginPath();
	clef_ctx.lineWidth=5;
	clef_ctx.moveTo(3,(yStart));
	clef_ctx.lineTo(3,(yStart+4*ySpace));
	clef_ctx.stroke();
	
	clef_ctx.beginPath();
	clef_ctx.lineWidth=5;
	clef_ctx.moveTo(Width-3,(yStart));
	clef_ctx.lineTo(Width-3,(yStart+4*ySpace));
	clef_ctx.stroke();
	
	clef_ctx.drawImage(trebleClef,5,yStart-37);
	
}

function drawFinger(note,string,fret) {
	//
        // draw the note on the fretboard
	// uses string and fret for position
	// note is just used for text feedback
	//
	var posX = fret * (Width/numFrets) + 30;
	var posY = string * (Height/(numStrings+1))-2;
	
	fret_ctx.fillStyle = "#CAA67E";
	fret_ctx.beginPath();
	fret_ctx.arc(posX,posY,11,0,2*Math.PI);
	fret_ctx.fill();
	fret_ctx.fillStyle = "black";
	fret_ctx.textAlign="center";
	fret_ctx.font = "15px Arial, Helvetica, sans serif";
	fret_ctx.fillText(note,posX, posY+5);
}

function drawNoteClef(note,acc) {
	//
	// draw the note on the treble staff
	//
	
	var c=clef_ctx;
	var posX=Width/2;
	var ySpace=22;
	var posY;
	var useSharps=0;
	var clefLine=0;
	var i=0;
	
	var noteName="";
	
	c.fillStyle = "black";
	c.textAlign="center";
	c.font = "30px Arial, Helvetica, sans serif";
	c.fontWight="bolder";
	c.lineWidth=2;
	
	if (acc<0.5) { // use sharps arrays
		clefLine = notesSharpClefPos[note];
		posY = 297-(clefLine*ySpace/2);
		noteName = notesSharp[note];
		if (notesSharp[note].substr(1,1)=="#") {  // draw a sharp, if we need to
			c.drawImage(sharp,posX-25, posY-19);
		}
	}            // use flats array
	else {
		clefLine = notesFlatClefPos[note];
		noteName = notesFlat[note];
		posY = 297-(clefLine*ySpace/2);
		if (notesFlat[note].substr(1,1)=="b") {  // draw a flat, if we need to
			c.drawImage(flat,posX-25, posY-25);
		}
	}
	
	// DRAW THE NOTE!
	c.beginPath();
	c.arc(posX,posY,10,0,2*Math.PI);
	c.fill();
	
	// do we need extra lines below the staff
	
	if (clefLine <= 7) {
		for (i=7;i>=clefLine;i-=2) {
			c.beginPath();
			c.moveTo(posX-17, 297-(i*ySpace/2));
			c.lineTo(posX+17, 297-(i*ySpace/2));
			c.stroke()
		}
	}
	
	// or above

	if (clefLine >= 19) {
		for (i=19;i<=clefLine;i+=2) {
			c.beginPath();
			c.moveTo(posX-15, 297-(i*ySpace/2));
			c.lineTo(posX+15, 297-(i*ySpace/2));
			c.stroke()
		}
	}
	
	// display the name of the note if checked
	var chk = document.getElementById("showName");
	if (chk.checked) {
		c.fillText(noteName,Width-80,Height+140);
		}
	
}

function showNoteCheck() {

	drawClef();
	drawNoteClef(current_note,current_acc);
	
}
