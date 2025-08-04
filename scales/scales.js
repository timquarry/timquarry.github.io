
var notesSharp = new Array();  // all notes, using sharps
var notesFlat = new Array();   // all notes, using flats
var notesScale = new Array();  // notes in scale.
var notesDegree = new Array();
var showDegree= new Array();
var useSharps = true;
var scale = new Array();   // which notes of the 12 tones in an octave to use for the selected scale, relative to the root (0)
var scaleValue = new Array(); // the actual chromatic note used - absolute values based on chromatic scale
var htmlDegree = new Array();
var htmlNote = new Array();
var mode="major";
var root=0;
var letterRoot=0;
var accidental = 0;
var accidentalText = ["b","nat","#"];
var scaleRootText;
var scaleModeText;
var scaleText;
var infoText = new Array();   // for messages and info
var ic = 0;
var oldMode; // debug
var keyPressed = false; // debug

	// scale degree : just to clarify coding
var D1=0;
var D2=1;
var D3=2;
var D4=3;
var D5=4;
var D6=5;
var D7=6;

// fretboard stuff

var canvas;
var ctx;
var fretboardBG = new Image();
fretboardBG.src = "fretboard.png";

var Width=800;
var Height=170;
var numStrings=6;
var numFrets=15;   // including "0" fret
var fret=0;
var string=1;

var string = new Array();
var fret = new Array();
var fretNote = new Array();  // may not need this

window.onload = function() {

// make sure all checkboxes are turned on
	var checklist = document.getElementsByClassName("degCheck");
	for (var i = 0; i < checklist.length; i++) {
		checklist[i].checked=true;
	}


	notesSharp = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
	notesFlat = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
	notesDegree = ["R","2","3","4","5","6","7"];
	showDegree = [1,1,1,1,1,1,1];  // show note on fretboard
	scale = [0,2,4,5,7,9,11];  // notes in major scale based on note number in chromatic scale
	
	htmlDegree[0]=document.getElementById("degree1");
	htmlDegree[1]=document.getElementById("degree2");
	htmlDegree[2]=document.getElementById("degree3");
	htmlDegree[3]=document.getElementById("degree4");
	htmlDegree[4]=document.getElementById("degree5");
	htmlDegree[5]=document.getElementById("degree6");
	htmlDegree[6]=document.getElementById("degree7");

	htmlNote[0]=document.getElementById("note1");
	htmlNote[1]=document.getElementById("note2");
	htmlNote[2]=document.getElementById("note3");
	htmlNote[3]=document.getElementById("note4");
	htmlNote[4]=document.getElementById("note5");
	htmlNote[5]=document.getElementById("note6");
	htmlNote[6]=document.getElementById("note7");
	
	scaleText=document.getElementById("scaleText");

// Fretboard stuff
	canvas = document.getElementById("fretBoard");
	canvas.width = Width;
	canvas.height = Height;
	ctx=canvas.getContext("2d");
//	fretboardBG.onload = doFretboard();
	fillFretBoard();

// first time in just use C major

	infoText = [" "," "," "," "];
	infoText[0] = "Select a key, scale or mode\n";
	scaleModeText = "Major";
	setMode("Root","C");
	setMode("Mode","Major");
			
}

function setMode(type, t)
{

	if (type == "Root")
		scaleRootText = t;
	else if (type="Mode")
		scaleModeText = t;

					// ************** now deal with modes
	switch(scaleModeText) {

		case "Major":
		case "Ionian":           // major and ionian
			scale=[0,2,4,5,7,9,11];
			notesDegree = ["R","2","3","4","5","6","7"];
			infoText[ic] = "Ionian = Major";
			ic++;
			infoText[ic] = "Use over IMaj7";
			ic++;
			infoText[ic] = "Feel: Upbeat, Positive";
			ic++;
			break;

		case "Natural Minor":   
		case "Aeolian":
			scale=[0,2,3,5,7,8,10];
			notesDegree = ["R","2","b3","4","5","b6","b7"];
			infoText[ic] =  "Aeolian = Natural Minor";
			ic++;
			infoText[ic] = "Use over VIm7";
			ic++;
			infoText[ic] = "Feel: Sad";
			ic++;
			break;

		case "Harmonic Minor":            
			scale=[0,2,3,5,7,8,11];
			notesDegree = ["R","2","b3","4","5","b6","7"];
			infoText[ic] =  "Use over minor chords";
			ic++;
			break;

		case "Melodic Minor":            
			scale=[0,2,3,5,7,9,11];
			notesDegree = ["R","2","b3","4","5","6","7"];
			infoText[ic] = "Use when ascending; use Harmonic minor when descending.";
			ic++;
			infoText[ic] =  "Use over minor chords";
			ic++;
			break;

		case "Dorian":           // dorian
			scale=[0,2,3,5,7,9,10];
			notesDegree = ["R","2","b3","4","5","6","b7"];
			infoText[ic]= "Use over IIm7";
			ic++;
			infoText[ic] = "Feel: Minor Jazz, Country";
			ic++;
			break;

		case "Phrygian":           // phrygian
			scale=[0,1,3,5,7,8,10];
			notesDegree = ["R","b2","b3","4","5","b6","b7"];
			infoText[ic]= "Use over IIIm7";
			ic++;	
			infoText[ic]= "Feel: Spanish, Classic Metal";
			ic++;			
			break;

		case "Lydian":           // lydian
			scale=[0,2,4,6,7,9,11];
			notesDegree = ["R","2","3","#4","5","6","7"];
			infoText[ic]= "Use over IVmaj7";
			ic++;
			infoText[ic] = "Feel: Happy, Airy";
			ic++;
			break;

		case "Mixolydian":           // mixolydian
			scale=[0,2,4,5,7,9,10];
			notesDegree = ["R","2","3","4","5","6","b7"];
			infoText[ic]= "Use over V7";
			ic++;
			infoText[ic]= "Feel: Bluesy";
			ic++;
			break;

		case "Locrian":           // locrian
			scale=[0,1,3,5,6,8,10];
			notesDegree = ["R","b2","b3","4","b5","b6","b7"];
			infoText[ic]= "Use over VIIm7b5";
			ic++;
			infoText[ic]= "Feel: Sinister, Tension";
			ic++;
			break;

		default: 
			console.log("Mode Logic Error");
	}
	
	switch(scaleRootText) {
		case "C":
			root=0;
			switch(scaleModeText) {
				case("Major"):
				case("Ionian"):
				case("Lydian"):
					buildScale("sharp");
					break;					
				default: 
					buildScale("flat");
				}
			break;
		case "C#":
			root=1;
			buildScale("sharp");
			switch(scaleModeText) {
				case("Major"):
				case("Ionian"):
					notesScale[D3]="E#";
					notesScale[D7]="B#";
					break;
				case("Harmonic Minor"):
				case("Melodic Minor"):
					notesScale[D7]="B#";
					break;
				case("Lydian"):
					notesScale[D7]="B#";
					notesScale[D3]="E#";
					notesScale[D4]="F##";
					break;
				case("Mixolydian"):
					notesScale[D3]="E#";
					notesScale[D7]="B#";
					break;
				case("Dorian"):
					notesScale[D3]="E#";
					break;
				default: 
				}
			break;

		case "Db": 
			root=1;
			buildScale("flat");
			switch(scaleModeText) {
				case("Natural Minor"):
				case("Aeolian"):
					notesScale[D3]="Fb";
					notesScale[D6]="Bbb";
					notesScale[D7]="Cb";
					break;
				case("Harmonic Minor"):
					notesScale[D3]="Fb";
					notesScale[D6]="Bbb";
					break;
				case("Melodic Minor"):
					notesScale[D3]="Fb";
					break;
				case("Dorian"):
					notesScale[D6]="Bbb";
					notesScale[D7]="Cb";
					break;
				case("Phrygian"):
					notesScale[D2]="Ebb";
					notesScale[D3]="Fb";
					notesScale[D6]="Bbb";
					notesScale[D7]="Cb";
					break;
				case("Mixolydian"):
					notesScale[D3]="Fb";
					notesScale[D6]="Bbb";
					notesScale[D7]="Cb";
					break;
				case("Locrian"):
					notesScale[D2]="Ebb";
					notesScale[D3]="Fb";
					notesScale[D5]="Abb";
					notesScale[D6]="Bbb";
					notesScale[D7]="Cb";
					break;
				default: 
				}
			break;

		case "D": 
			root=2;
			buildScale("sharp");
			switch(scaleModeText) {
				case("Natural Minor"):
				case("Harmonic Minor"):
				case("Aeolian"):
					notesScale[D6] = "Bb";
					break;
				case ("Phrygian"):
				case ("Locrian"):
					buildScale("flat");
					break;
				default: 
				}
			break;

		case "D#": 
			root=3;
			buildScale("sharp");
			infoText[ic] ="D# is a theoretical key. Use Eb.";
			ic++;
			switch(scaleModeText) {
				case("Major"):
				case("Ionian"):
					notesScale[D2]="E#";
					notesScale[D3]="F##";
					notesScale[D6]="B#";
					notesScale[D7]="C##";
					break;
				case("Natural Minor"):
				case("Aeolian"):
					notesScale[D2]="E#";
					break;
				case("Harmonic Minor"):
					notesScale[D2]="E#";
					notesScale[D7]="C##";
					break;
				case("Melodic Minor"):
					notesScale[D2]="E#";
					notesScale[D6]="B#";
					notesScale[D7]="C##";
					break;
				case("Dorian"):
					notesScale[D2]="E#";
					notesScale[D6]="B#";
					notesScale[D7]="C#";			
					break;
				case("Lydian"):
					notesScale[D2]="E#";
					notesScale[D3]="F##";
					notesScale[D4]="G##";
					notesScale[D6]="B#";
					notesScale[D7]="C##";
					break;
				case("Mixolydian"):
					notesScale[D2]="E#";
					notesScale[D3]="F##";
					notesScale[D6]="B#";
					break;
					
				default:
			}
			break;

		case "Eb": 
			root=3;
			buildScale("flat");
			switch(scaleModeText) {
				case("Natural Minor"):
				case("Harmonic Minor"):
				case("Aeolian"):
					notesScale[D6]="Cb";
					break;
				case("Phrygian"):
					notesScale[D2]="Fb";
					notesScale[D6]="Cb";
					break;
				case("Locrian"):
					notesScale[D2]="Fb";
					notesScale[D5]="Bbb";
					notesScale[D6]="Cb";
					break;
				default:
			}
			break;

		case "E":
			root=4;
			buildScale("sharp");
			switch(scaleModeText) {
				case("Locrian"):
					notesScale[D5]="Bb";
					break; 
				default:
			}
			break;

		case "F":
			root=5;
			buildScale("flat");
			switch(scaleModeText) {
				case("Locrian"):
					notesScale[D5]="Cb";
					break; 
				default:
			}
			break;

		case "F#":
			root=6;
			buildScale("sharp");
			switch(scaleModeText) {
				case("Major"):
				case("Ionian"):
					notesScale[D7]="E#";
					break;
				case("Harmonic Minor"):
				case("Melodic Minor"):
					notesScale[D7]="E#";
					break;
				case("Lydian"):
					notesScale[D4]="B#";
					notesScale[D7]="E#";
					break;
				default:
			}
			break;

		case "Gb":
			root=6;
			buildScale("flat");
			switch(scaleModeText) {
				case("Major"):
				case("Ionian"):
					notesScale[D4]="Cb";
					break;
				case("Natural Minor"):
				case("Aeolian"):
					notesScale[D3]="Bbb";
					notesScale[D4]="Cb";
					notesScale[D6]="Ebb";		
					notesScale[D7]="Fb";		
					break;
				case("Harmonic Minor"):
					notesScale[D3]="Bbb";
					notesScale[D4]="Cb";
					notesScale[D6]="Ebb";				
					break;
				case("Melodic Minor"):
					notesScale[D3]="Bbb";
					notesScale[D4]="Cb";   			
					break;
				case("Dorian"):
					notesScale[D3]="Bbb";
					notesScale[D4]="Cb";		
					notesScale[D7]="Fb";		
					break;
				case("Phrygian"):
					notesScale[D2]="Abb";
					notesScale[D3]="Bbb";
					notesScale[D4]="Cb";
					notesScale[D6]="Ebb";				
					notesScale[D7]="Fb";		
					break;
				case("Mixolydian"):
					notesScale[D4]="Cb";
					notesScale[D7]="Fb";
					break;
				case("Mixolydian"):
					notesScale[D4]="Cb";
					notesScale[D7]="Fb";
					break;
				case("Locrian"):
					notesScale[D2]="Abb";
					notesScale[D3]="Bbb";
					notesScale[D4]="Cb";
					notesScale[D5]="Dbb";
					notesScale[D6]="Ebb";				
					notesScale[D7]="Fb";		
					break;
				default:
			}
			break;

		case "G":
			root=7;
			buildScale("sharp");
			switch(scaleModeText) {
				case("Natural Minor"):
				case("Aeolian"):
					buildScale("flat");	
					break;
				case("Harmonic Minor"):	
					buildScale("flat");
					notesScale[D7]="F#";			
					break;
				case("Melodic Minor"):
				case("Dorian"):
					notesScale[D3]="Bb";			
					break;
				case("Phrygian"):
					buildScale("flat");	
					break;
				case("Locrian"):
					buildScale("flat");		
					break;
				default:
			}
			break;

		case "G#":
			root=8;
			buildScale("sharp");
			infoText[ic] ="G# is a theoretical key. Use Ab.\n";
			ic++;
			switch(scaleModeText) {
				case("Major"):
				case("Ionian"):
					notesScale[D3]="B#";
					notesScale[D6]="E#";
					notesScale[D7]="F##";
					break;
				case("Harmonic Minor"):
					notesScale[D7]="F##";
					break;
				case("Melodic Minor"):
					notesScale[D6]="E#";
					notesScale[D7]="F##";
					break;
				case("Dorian"):	
					notesScale[D6]="E##";		
					break;
				case("Lydian"):
					notesScale[D3]="B#";	
					notesScale[D4]="C##";
					notesScale[D6]="E##";
					notesScale[D7]="F##";	
					break;
				case("Mixolydian"):
					notesScale[D3]="B#";	
					notesScale[D6]="E##";	
					break;
				default:
			}	
			break;

		case "Ab":
			root=8;
			buildScale("flat");
			switch(scaleModeText) {
				case("Natural Minor"):
				case("Harmonic Minor"):
				case("Aeolian"):
					notesScale[D3]="Cb";
					notesScale[D6]="Fb";
					break;
				case("Melodic Minor"):
				case("Dorian"):
					notesScale[D3]="Cb";
					break;
				case("Phrygian"):
					notesScale[D2]="Bbb";
					notesScale[D3]="Cb";
					notesScale[D6]="Fb";
					break;
				case("Locrian"):
					notesScale[D2]="Bbb";
					notesScale[D3]="Cb";
					notesScale[D5]="Ebb";
					notesScale[D6]="Fb";
					break;
				default:
			}
			break;

		case "A":
			root=9;
			buildScale("sharp");
			switch(scaleModeText) {
				case("Phrygian"):
				case("Locrian"):
					buildScale("flat");
				break;
				default:
			}
			break;

		case "A#":
			root=10;
			buildScale("sharp");
			infoText[ic] ="A# is a theoretical key. Use Bb.\n";
			ic++;
			switch(scaleModeText) {
				case("Major"):
				case("Ionian"):
					notesScale[D2]="B#";
					notesScale[D3]="C##";
					notesScale[D5]="E#";
					notesScale[D6]="F##";
					notesScale[D7]="G##";
					break;
				case("Natural Minor"):
				case("Aeolian"):
					notesScale[D2]="B#";
					notesScale[D5]="E#";
					break;
				case("Harmonic Minor"):
					notesScale[D2]="B#";
					notesScale[D5]="E#";
					notesScale[D7]="G##";
					break;
				case("Melodic Minor"):
					notesScale[D2]="B#";
					notesScale[D5]="E#";
					notesScale[D6]="F##";
					notesScale[D7]="G##";
					break;
				case("Dorian"):
					notesScale[D2]="B#";
					notesScale[D5]="E#";
					notesScale[D6]="F##";
					break;
				case("Phrygian"):
					notesScale[D5]="E#";
					break;
				case("Lydian"):
					notesScale[D2]="B#";
					notesScale[D3]="C##";
					notesScale[D4]="E##";
					notesScale[D5]="E#";
					notesScale[D6]="F##";
					notesScale[D7]="G##";
					break;
				case("Mixolydian"):
					notesScale[D2]="B#";
					notesScale[D3]="C##";
					notesScale[D5]="E#";
					notesScale[D6]="F##";
					break;
				default:
			}
			break;

		case "Bb":
			root=10;
			buildScale("flat");
			switch(scaleModeText) {
			case("Phrygian"):
					notesScale[D2]="Cbb";
					break;
			case("Locrian"):
					notesScale[D2]="Cbb";
					notesScale[D5]="Fb";
					break;
			default:
			}
		break;

		case "B":
			root=11;
			buildScale("sharp");
			switch(scaleModeText) {
			case("Lydian"):
				notesScale[D4]="E#";
				break;
			default:
			}
			break;
		
		default:
	}

	
	doFretboard();
	updateHtml();
		
}

function updateHtml()
{
	scaleText.innerHTML=scaleRootText + " " + scaleModeText;
	infoBox1.innerHTML=infoText[0];
	infoBox2.innerHTML=infoText[1];
	infoBox3.innerHTML=infoText[2];
	infoBox4.innerHTML=infoText[3];

	for (i=0;i<=6;i++) {
		htmlNote[i].innerHTML=notesScale[i];
		htmlDegree[i].innerHTML=notesDegree[i];
	}

	infoText = [" "," "," "," "];
	ic=0;
}

function buildScale(acc) {
		var i;
		for (i=0;i<=6;i++) {
			j = (root + scale[i]) % 12;
			scaleValue[i]=j;   // to be used when mapping fretboard
			if (acc=="flat")
				notesScale[i] = notesFlat[j];
			else
				notesScale[i] = notesSharp[j];
		}
}

function doFretboard() {
	var s,f,d;
	ctx.drawImage(fretboardBG,0,0);
//      for each string
	for (s=1;s<=numStrings;s++) {
	// for each fret
		for (f=0;f<numFrets;f++) {
	// for each scale degree
			for (d=0;d<=6;d++) {
				if (fretNote[(s-1)*numFrets+f] == scaleValue[d]) {
					if (showDegree[d]) {
					      drawFinger(notesDegree[d],s,f);
					}
				}
			}
		}
	}
}

function drawFinger(degree,string,fret) {
	var posX = fret * (Width/numFrets) + 30;
	var posY = (7-string) * (Height/(numStrings+1))-2;
	if (degree=="R")
		ctx.fillStyle = "#B57A38";
	else
		ctx.fillStyle = "#CAA67E";
		
		ctx.beginPath();
		ctx.arc(posX,posY,11,0,2*Math.PI);
		ctx.fill();
		ctx.fillStyle = "black";
		ctx.textAlign="center";
		ctx.font = "15px Arial, Helvetica, sans serif";
		ctx.fillText(degree,posX, posY+5);
}

function fillFretBoard() {
// fill the fretboard with appropriate note values
	var i,j;
	var fretCounter = 0;
	var fretNoteValue;
	
        for ( i = 0; i <numStrings; i++) {
							// create a string ROW
		if (i < 4)                          
			fretNoteValue = i*5+4;      // give each fret a note "value" - 0 is C , so start with 4 (E)
		else
			fretNoteValue = i*5+3;      // B and high E string	
	
		for (  j = 0; j < numFrets; j++) {
							       // give each fret a note "value" - 0 is C so fill accordingly
				fretNote[fretCounter]=fretNoteValue%12;
				fretCounter++;
				fretNoteValue++;
			}
	}
}


function showNoteCheck(d) {
	showDegree[d]=!(showDegree[d]);
	doFretboard();
}