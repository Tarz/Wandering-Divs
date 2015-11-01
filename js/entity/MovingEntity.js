'use strict';

class MovingEntity extends BaseGameEntity {
    constructor(
        position,
        radius,
        velocity,
        maxSpeed,
        heading,
        mass,
        scale,
        turnRate,
        maxForce,
        rotation
    ) {
        //entitytype, position,radius
        super(0, position, radius, rotation);

        //Protected
        this._vecVelocity = velocity;

        //A normalized vector pointing in the direction the entity is heading.
        this._vecHeading = heading;

        //A vector perpendicular to the heading vector
        this._vecSide = this._vecHeading.perp();
        this._mass = mass;
        this._maxSpeed = maxSpeed;
        this._maxForce = maxForce;

        //The maximum rate (radians per second)this vehicle can rotate         
        this._maxTurnRate = turnRate;
        this._scale = scale;
    }

    setVelocity(newVel) {
        this._vecVelocity = newVel;
    }
    mass() {
        return this._mass;
    }
    side() {
        return this._side;
    }
    maxSpeed() {
        return this._maxSpeed;
    }
    setMaxSpeed(newSpeed) {
        this._maxSpeed = newSpeed;
    }
    maxForce() {
        return this._maxForce;
    }
    setMaxForce(mf) {
        this._maxForce = mf;
    }
    isSpeedMaxedOut() {
        return this._maxSpeed * this._maxSpeed >= this._vecVelocity.lengthSq();
    }
    speed() {
        return this._vecVelocity.length();
    }
    speedSq() {
        return this._vecVelocity.lengthSq();
    }
    heading() {
        return this._vecHeading;
    }
    maxTurnRate() {
        return this._maxTurnRate;
    }
    setMaxTurnRate(val) {
        this._maxTurnRate = val;
    }

    //setHeading(newHeading);

    rotateHeadingToFacePosition(targetPos) {
        var angle = this._vecHeading.angleBetween(targetPos);
        if (angle < 0.00001) return true;
        if (angle > this._maxTurnRate) angle = this._maxTurnRate;
        var lenght = _vecVelocity.length();
        this._vecVelocity.x = Math.cos(angle) * length;
        this._vecVelocity.y = Math.sin(angle) * length;
        this._rotation = angle;
        this._side = this._vecHeading.perp();
        return false;
    }
}