

var string = new Array();
var note = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];  

window.onload = function() 
{

	doRandom();
	rClick = document.getElementById("rButton");
	rClick.addEventListener("click",doRandom);

}

function doRandom()
{

	s = Math.floor(Math.random()*6)+1;
	n = Math.floor(Math.random()*12);
	//window.alert("In here "+s+" "+note[n]);
	document.getElementById('rString').textContent=s.toString();
	document.getElementById('rNote').textContent=note[n];

	return(s,n);

}





