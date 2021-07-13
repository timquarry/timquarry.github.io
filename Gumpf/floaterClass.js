
//**************** CREATE CLASS
var floater = function(x,y,R)  {
			
			this.radius = R;
			this.x = x;
			this.y = y;
			
			maxSpeed = 0.5;
			minSpeed = 0.01;
			
			this.incX = 0;
			this.incY = 0;
			
			while (Math.abs(this.incX) <minSpeed)
				this.incX = Math.random()*maxSpeed-(maxSpeed/2);
			
			while (Math.abs(this.incY) < minSpeed)
				this.incY = Math.random()*maxSpeed-(maxSpeed/2);
				
			
}

//***************** DRAW
floater.prototype.draw = function() {
			
			context.beginPath();
			context.arc(this.x,this.y,this.radius,0,2*Math.PI);
			context.fillStyle = "rgba(200,0,100,0.2)";
			context.fill();
		//	context.stroke();
			
}


//******************* UPDATE POSITION
floater.prototype.updatePos = function() {

	this.x += this.incX;
	this.y += this.incY;
	
	if (this.x > Width) this.x = 0;
	if (this.x < 0) this.x = Width;
	if (this.y > Height) this.y = 0;
	if (this.y < 0) this.y = Height;
	
	
}
