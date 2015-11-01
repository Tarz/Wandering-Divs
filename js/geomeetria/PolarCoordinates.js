'use strict';

class PolarCoordinates
{
	static truncate(x,y, max)
	{	
		var length = PolarCoordinates.length(x,y);

		if(length > max){
			var normalize = PolarCoordinates.normalize(x,y);
        	
        	x  = normalize.x * max;
        	y  = normalize.y * max;
        }
        
        return {x,y};
	}

	static normalize(x, y)
	{
		//console.log(x)
		var length = PolarCoordinates.length(x,y);
        
        if (length > 0.0) {
            x /= length;
            y /= length;
        }
        
        return {x,y};
   	}

   	static length(x,y)
   	{
   		return Math.sqrt(x*x + y*y);
   	}

   	static lengthSq(x,y)
   	{
   		return x*x + y*y;
   	}

   	static localToGlobal(targetX, targetY, posX, posY, headingX, headingY)
   	{
   		//console.log(targetX, targetY, posX, posY, headingX, headingY)
   		var angle =   Math.atan2(headingY,headingX);
        var x =   Math.round(Math.cos(angle) * targetX - Math.sin(angle) * targetY) + posX;
        var y =   Math.round(Math.cos(angle) * targetY + Math.sin(angle) * targetX) + posY;  
        return {x,y};  
   	}
   	static globalToLoacal()
   	{
   		//x2' = (x2-x1)cosθ + (y2-y1)sinθ
		//y2' = -(x2-x1)sinθ + (y2-y1)cosθ
   	}
}