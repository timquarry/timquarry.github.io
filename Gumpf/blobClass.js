
//**************** BLOB CREATE CLASS
var blob = function(x,y,numPoints,maxR,minR)  {
			
			this.maxR = maxR;
			this.minR = minR;
			this.x = x;
			this.y = y;
			
			this.incX = 0;
			this.incY = 0;
			
			maxSpeed = 1.3;
			minSpeed = 0.05;
			
			while (Math.abs(this.incX) <minSpeed)
				this.incX = Math.random()*maxSpeed-(maxSpeed/2);
			
			while (Math.abs(this.incY) < minSpeed)
				this.incY = Math.random()*maxSpeed-(maxSpeed/2);
				
			console.log(this.incX + " : " + this.incY);
			
			if (numPoints <= maxPoints)
				this.np = numPoints;
			else	
				this.np = maxPoints;
				
			this.curvePx = new Array();
			this.curvePy = new Array();
			this.nextPointX = new Array();
			this.nextPointY = new Array();
			
			var scaler;
			
			// divide circle into number of points
			var segLength = 2 * Math.PI / this.np;
			
			// add a point at for each segment
			// get angle, then place point out the radius
			
			for (var i= 0; i < (2*Math.PI-segLength/2); i += segLength) {
				// generate a random point in the section set by angle i
				scaler=Math.random()*(this.maxR-this.minR) + this.minR;
				px = Math.cos(i) * scaler;   // random x scale along segment
				py = Math.sin(i) * scaler;   // random y scale along segment
				this.curvePx.push(px);
				this.curvePy.push(py);
				
				// and generate a point to move towards
				scaler=Math.random()*(this.maxR-this.minR) + this.minR;
				px = Math.cos(i) * scaler;   // random x scale along segment
				py = Math.sin(i) * scaler;   // random y scale along segment
				this.nextPointX.push(px);
				this.nextPointY.push(py);
			}
}

//***************** BLOB DRAW
blob.prototype.draw = function() {
	
			var xc;  // midpoints 
			var yc;
			var dist;
			var angle;
			var speed=1;
			
			var i;
			var pl = this.np;
			
			
			// Draw the cell wall.
			var xc0 = (this.curvePx[0] + this.curvePx[pl - 1])/ 2;  // halfway between end point and start point
			var yc0 = (this.curvePy[0] + this.curvePy[pl - 1]) / 2;
			
			context.strokeStyle = "#000000";
			context.beginPath();
			context.moveTo(this.x+xc0, this.y+yc0);   // half point between first and last point
			
			for (i = 0; i < pl-1; i++)  // 
			{
				xc = (this.curvePx[i] +this.curvePx[i+1]) / 2;
				yc = (this.curvePy[i] +this.curvePy[i+1]) / 2;
				context.quadraticCurveTo(this.x+this.curvePx[i], this.y+this.curvePy[i], this.x+xc, this.y+yc);
			}
			
			// curve through the last points and xc0
			context.quadraticCurveTo(this.x+this.curvePx[pl -1], this.y+this.curvePy[pl -1], this.x+xc0, this.y+yc0);
			context.stroke();
			
			context.fillStyle = "rgba(32,45,21,0.3)";
			context.fill();
			
			// draw the "nucleus"
			// small circle x,y,r, large circle x,y,r
			var grad=context.createRadialGradient(this.x-3,this.y-3,1,this.x,this.y,15);
	
			grad.addColorStop(0,"#AAAAFF");
			grad.addColorStop(1,"#3333AA");
			context.beginPath();
			context.arc(this.x,this.y,10,0,2*Math.PI);
			context.fillStyle=grad;
			context.fill();
			// outline the nucleus
			context.strokeStyle = "#000000";
			context.beginPath();
			context.arc(this.x,this.y,10,0,2*Math.PI);
			context.stroke();
		
			var drawPoints = 0;   // debug check
			if (drawPoints) {
				context.lineWidth = 1;
				// blob center point
				context.strokeStyle = "#0000FF";
				context.beginPath();
				context.arc(this.x,this.y,5,0,2*Math.PI);
				context.stroke();
				
				// blob border curve points

				for (i =  0; i <= pl; i++)
				{
					context.strokeStyle = "#FF0000";
					context.beginPath();
					context.arc(this.x+this.curvePx[i],this.y+this.curvePy[i],5,0,2*Math.PI);
					context.stroke();	
					
					context.strokeStyle = "#00AA00";
					context.beginPath();
					context.arc(this.x+this.nextPointX[i],this.y+this.nextPointY[i],4,0,2*Math.PI);
					context.stroke();
					
					context.strokeStyle = "#AA00AA";
					context.moveTo(this.x+this.curvePx[i],this.y+this.curvePy[i]);
					context.lineTo(this.x+this.nextPointX[i],this.y+this.nextPointY[i]);
					context.stroke();
					
				}
				
			}

			
}


//******************* BLOB UPDATE POSITION
blob.prototype.updatePos = function() {


	this.x += this.incX;
	this.y += this.incY;

	var speed = 0.3;
	var dist;
	var px1,px2,px2,py2,px,py;   
	
	if (this.x > Width+this.maxR) this.x = -1*this.maxR;
	if (this.x < -1*this.maxR) this.x =this.maxR+Width;
	if (this.y > Height+this.maxR) this.y = -1*this.maxR;
	if (this.y < -1*this.maxR) this.y =this.maxR+Height;
	
	
	// now move the points closer to "nextPoint"
	// if getting too close, generate a new taget point
	//
			for (i = 0; i < this.np; i++)
			{
				px1 = this.curvePx[i];
				py1 = this.curvePy[i];
				px2 = this.nextPointX[i];
				py2 = this.nextPointY[i];
				
				X = px2 - px1;
				Y = py2 - py1;
				dist = Math.sqrt(X*X+Y*Y);
				if (dist > 5)  {
					// console.log(i + " : " + dist);
					X = X/dist;
					Y = Y/dist;
					this.curvePx[i] += X*speed;
					this.curvePy[i] += Y*speed;
				}
				else {
					// new new target points
					// and generate a point to move towards
					scaler=Math.random()*(this.maxR-this.minR) + this.minR;
					px = Math.cos(i) * scaler;   // random x scale along segment
					py = Math.sin(i) * scaler;   // random y scale along segment
					this.nextPointX[i]=px;
					this.nextPointY[i]=py;
				}
			}

}
