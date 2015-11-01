'use strict';

/**
 * @author  Tarvo Tiivits
 * @date 28.10.2015
 * Original: Mat Buckland "Programming Game AI by Example" Copyright 2005
 * Ported from C++
 * Instatiate:
 * var vec1 = new Vector2D(20, 10);
 * var vec2 = new Vector2D(1,2);
 * 
 * Method calls:
 * 
 * "Overloaded operators":
 * a) vec1["-"](vec2); 	//Object{name: Vector2D, x:19, y:8}
 * b) vec1.op("-", ve2);//Object{name: Vector2D, x:19, y:8}
 * 
 * Other methods:
 * vec2.lenght();
 * vec1.getNormailized();
 * 
 * Static methods:
 * Vector2D.WrapAround(pos, maxX, maxY);
 *
 * API
 *
 * vec.op(operator,vector:Vector2D);
 * vec["+="](vector:Vector2D);
 * vec["-="](vector:Vector2D);
 * vec["*="](vector:Vector2D);
 * vec["*="](vector:Vector2D);
 * vec["*="](vector:Vector2D);
 * vec["*="](vector:Vector2D);
 * vec["*="](vector:Vector2D);
 * vec["*="](vector:Vector2D);
 * vec["*="](number:Number);
 * vec["*="](vector:Vector2D);
 * vec.length();
 * vec.lengthSq();
 * vec.zero();
 * vec.isZero();
 * vec.normalize();
 * vec.getNormalizedV();
 * vec.dot(vector:Vector2D);
 * vec.angleBetween(vector:Vector2D);
 * vec.sign(vector:Vector2D);
 * vec.perp(); 
 * vec.truncate(max:Number);
 * vec.distance(vector:Vector2D);
 * vec.distanceSq(vector:Vector2D);
 * vec.reflect(normV:vector:Vector2D);
 * vec.getReverse();
 * Vector2D.NotInsideRegionVec(p:Vector2D, topLeft:Vector2D, botRight:Vector2D);
 * Vector2D.InsideRegionVec(p:Vector2D, topLeft:Vector2D, botRight:Vector2D);
 * Vector2D.InsideRegionNum(p:Vector2D, left:Number, top:Number, right:Number, bottom:Number);
 * Vector2D.IsSecondInFOVofFirst(posFirst:Vector2D, facingFirst:Vector2D, posSecond:Vector2D, fov:Number); //fov: Field of View in radians
 * Vector2D.Vec2DNormalize(v:Vector2D);
 * Vector2D.WrapAround(pos:Vector2D, maxX:Number, maxY:Number, border);
 */
/**
 * SLOW! DONT use!
 */
class Vector2D {
    constructor(x, y) {
        var _x = x;
        var _y = y;
        if (x == null) _x = 0;
        if (y == null) _y = 0;
        this._vector = {};
        this._vector.name = "Vector2D";
        this._vector.x = _x;
        this._vector.y = _y;
        

        //For chrome, safari do not support
        this._vector.op = (o, v) => {
            return this.checkOperator(o, v);
        }
        this._vector["+="] = (v) => {
            return this.plusplus(v);
        }
        this._vector["-="] = (v) => {
            return this.minusminus(v);
        }
        this._vector["*="] = (v) => {
            return this.multiplymultiply(v);
        }
        this._vector["/="] = (v) => {
            return this.dividedivide(v);
        }
        this._vector["=="] = (v) => {
            return this.isEqual(v);
        }
        this._vector["+"] = (v) => {
            return this.plus(v);
        }
        this._vector["-"] = (v) => {
            return this.minus(v);
        }
        this._vector["*"] = (v) => {
            return this.multiply(v);
        }
        this._vector["*n"] = (number) => {
            return this.multiplyWithNumber(number);
        }
        this._vector["*n="] = (number) => {
            return this.multiplyMultiplyWithNumber(number);
        }
        this._vector["/"] = (v) => {
            return this.divide(v);
        }
        this._vector.length = () => {
            return this.length();
        }
        this._vector.lengthSq = () => {
            return this.lengthSq();
        }
        this._vector.zero = () => {
            return this.zero();
        }
        this._vector.isZero = () => {
            return this.isZero();
        }
        this._vector.normalize = () => {
            return this.normalize();
        }
        this._vector.getNormalizedV = () => {
            return this.getNormalizedV();
        }
        this._vector.dot = (v) => {
            return this.dot(v);
        }
        this._vector.angleBetween = (v) => {
            return this.angleBetween(v);
        }
        this._vector.sign = (v) => {
            return this.sign(v);
        }
        this._vector.perp = () => {
            return this.perp();
        }
        this._vector.truncate = (max) => {
            return this.truncate(max);
        }
        this._vector.distance = (v) => {
            return this.distance(v);
        }
        this._vector.distanceSq = (v) => {
            return this.distanceSq(v);
        }
        this._vector.reflect = (normV) => {
            return this.reflect(normV);
        }
        this._vector.getReverse = () => {
            return this.getReverse();
        }


        /*this._vector.op  	= 			(function(o, v)	{ return 	this.checkOperator(o,v); }).bind(this);
        this._vector["+="]  =  			(function(v)	{ return 	this.plusplus(v); }).bind(this);
        this._vector["-="]  =  			(function(v)	{ return 	this.minusminus(v); }).bind(this);
        this._vector["*="]  =  			(function(v)	{ return 	this.multiplymultiply(v); }).bind(this);
        this._vector["/="]  =  			(function(v) 	{ return 	this.dividedivide(v); }).bind(this);
        this._vector["=="]  =  			(function(v) 	{ return 	this.isEqual(v); }).bind(this);
        this._vector["+"]   =  			(function(v) 	{ return 	this.plus(v); }).bind(this);
        this._vector["-"]   =  			(function(v) 	{ return 	this.minus(v); }).bind(this);
        this._vector["*"]   =  			(function(v) 	{ return 	this.multiply(v); }).bind(this);
        this._vector["*n"]  =  			(function(number){ return 	this.multiplyWithNumber(number); }).bind(this);
        this._vector["*n="]	= 			(function(number){ return	this.multiplyMultiplyWithNumber(number);}).bind(this);		
        this._vector["/"]   =  			(function(v) 	{ return 	this.divide(v); }).bind(this);
        this._vector.length = 			(function() 	{ return 	this.length(); }).bind(this);
        this._vector.lengthSq = 		(function() 	{ return 	this.lengthSq();}).bind(this);
        this._vector.zero  	= 			(function() 	{ return	this.zero();}).bind(this);
        this._vector.isZero  = 			(function() 	{ return 	this.isZero();}).bind(this);
        this._vector.normalize =		(function() 	{ return	this.normalize();}).bind(this);
        this._vector.getNormalizedV =	(function() 	{ return	this.getNormalizedV();}).bind(this);
        this._vector.dot  	= 			(function(v) 	{ return 	this.dot(v);}).bind(this);
        this._vector.angleBetween = 	(function(v) 	{ return 	this.angleBetween(v);}).bind(this);
        this._vector.sign  	= 			(function(v) 	{ return 	this.sign(v);}).bind(this);
        this._vector.perp  	= 			(function() 	{ return 	this.perp();}).bind(this); 
        this._vector.truncate = 		(function(max) 	{ return 	this.truncate(max);}).bind(this);
        this._vector.distance = 		(function(v) 	{ return 	this.distance(v);}).bind(this);
        this._vector.distanceSq =		(function(v)	{ return 	this.distanceSq(v);}).bind(this);
        this._vector.reflect =			(function(normV) { return	this.reflect(normV);}).bind(this);
        this._vector.getReverse =		(function()		{ return 	this.getReverse();}).bind(this);*/

        return this._vector;

    }
    checkOperator(op, vec) {
        switch (op) {
            case "+=":
                return this.plusplus(vec);
            case "-=":
                return this.minusminus(vec);
            case "*=":
                return this.multiplymultiply(vec);
            case "/=":
                return this.dividedivide(vec);
            case "==":
                return this.isEqual(vec);
            case "+":
                return this.plus(vec);
            case "-":
                return this.minus(vec);
            case "*":
                return this.multiply(vec);
            case "*n":
                return this.multiplyWithNumber(vec);
            case "/":
                return this.divide(vec);
            default:
                throw new Error("Vector object don't use such kind of operator");
        }
    }
    zero() {
        this._vector.x = 0;
        this._vector.y = 0;
        return this._vector;
    }
    isZero() {
        return (this._vector.x * this._vector.x + this._vector.y * this._vector.y) == 0;
    }
    length() {
        return Math.sqrt(this._vector.x * this._vector.x + this._vector.y * this._vector.y);
    }
    lengthSq() {
        return this._vector.x * this._vector.x + this._vector.y * this._vector.y;
    }
    normalize() {
        var length = this.length();
        if (length > 0.0) {
            this._vector.x /= length;
            this._vector.y /= length;
        }
        return this._vector;
    }
    getNormalizedV() {
        var vec = new Vector2D(this._vector.x, this._vector.y);
        var length = this.length();
        if (length > 0.0) {
            vec.x /= length;
            vec.y /= length;
        }
        return vec;
    }
    dot(v) {
        return (this._vector.x * v.x) + (this._vector.y * v.y);
    }

    //Normalized vectors cos angle between (dot product) in radians
    angleBetween(v) {
        var vec1 = this.getNormalizedV();
        var vec2 = v.getNormalizedV();
        var dot = vec1.dot(vec2);
        return Math.acos(dot);
    }

    //returns positive if v is clockwise of this vector minus, if not (y axis pointing down, a axis to right)
    sign(v) {
        if (this._vector.y * v.x > this._vector.x * v.y) {
            return -1;
        } else {
            return 1;
        }
    }
    perp() {
        return new Vector2D(-this._vector.y, this._vector.x);
    }
    truncate(max) {

        if (this._vector.length() > max) {
            this.normalize();
            this._vector.x *= max;
            this._vector.y *= max;
        }
        return this._vector;
    }
    distance(v) {
        var xSep = v.x - this._vector.x;
        var ySep = v.y - this._vector.y;
        return Math.sqrt(xSep * xSep + ySep * ySep);
    }
    distanceSq(v) {
            var xSep = v.x - this._vector.x;
            var ySep = v.y - this._vector.y;
            return xSep * xSep + ySep * ySep;
        }
        //Given a normalized vector, this method reflects the vector it is operating upon. Like the path of a ball bouncing off a wall.
    reflect(normV) {
        var reverse = normV.getReverse();
        var dot = this.dot(normV);
        this._vector.x += 2.0 * dot * reverse.x;
        this._vector.y += 2.0 * dot * reverse.y;
        return this._vector;
    }
    getReverse() {
            return new Vector2D(-this._vector.x, -this._vector.y)
        }
        // +=
    plusplus(v) {
            this._vector.x += v.x;
            this._vector.y += v.y;
            return this._vector;
        }
        // -=
    minusminus(v) {
            this._vector.x -= v.x;
            this._vector.y -= v.y;
            return this._vector;
        }
        // *=
    multiplymultiply(v) {
            this._vector.x *= v.x;
            this._vector.y *= v.y;
            return this._vector;
        }
        // /=
    dividedivide(v) {
            this._vector.x /= v.x;
            this._vector.y /= v.y;
            return this._vector;
        }
        // ==
    isEqual(v) {
            return this._vector.x == v.x && this._vector.y == v.y;
        }
        // *
    multiply(v) {
            return new Vector2D(this._vector.x * v.x, this._vector.y * v.y);
        }
        // *n
    multiplyWithNumber(number) {
            return new Vector2D(this._vector.x * number, this._vector.y * number);
        }
        // -
        // *n=
    multiplyMultiplyWithNumber(number) {
            this._vector.x *= number;
            this._vector.y *= number;
            return this._vector;
        }
        // -
    minus(v) {
            return new Vector2D(this._vector.x - v.x, this._vector.y - v.y);
        }
        // +
    plus(v) {
            return new Vector2D(this._vector.x + v.x, this._vector.y + v.y);
        }
        // /
    divide(v) {
            return new Vector2D(this._vector.x / v.x, this._vector.y / v.y);
        }
        //if point p is not inside the region defined by top_legt and bot_right
    static NotInsideRegionVec(p, topLeft, botRight) {
        return (p.x < topLeft.x) || (p.x > botRight.x) || (p.y < topLeft.y) || (p.y > botRight.y);
    }
    static InsideRegionVec(p, topLeft, botRight) {
        return !((p.x < topLeft.x) || (p.x > botRight.x) || (p.y < topLeft.y) || (p.y > botRight.y));
    }
    static InsideRegionNum(p, left, top, right, bottom) {
            return !(p.x < left) || (p.x > right) || (p.y < top) || (p.y > bottom);
        }
        //return true if target position is in the field of view of entity positioned a posFirst, facing in facingFirst
    static IsSecondInFOVofFirst(posFirst, facingFirst, posSecond, fov) {
        var toTarget = Vector2D.Vec2DNormalize(posSecond["-"](posFirst));
       return facingFirst.dot(toTarget) >= Math.cos(fov / 2.0);
    }
    static Vec2DNormalize(v) {
            var vec = new Vector2D(v.x, v.y);
            var length = vec.length();
            if (length > 0.000) {
                vec.x /= length;
                vec.y /= length;
            }
            return vec;
        }
        //Treats window as toroid
    static WrapAround(pos, maxX, maxY, border) {
        if (pos.x > maxX + border) pos.x = 0 - border;
        if (pos.x < 0 - border) pos.x = maxX + border;
        if (pos.y > maxY + border) pos.y = 0 - border;
        if (pos.y < 0 - border) pos.y = maxY + border;
    }
}