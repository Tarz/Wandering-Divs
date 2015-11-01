'use strict';

class WanderBehavior {
    constructor(agent) {
        //super(agent);
        this.vehicle = agent;
        this.steeringForceX = 0;
        this.steeringForceY = 0;
        this._wanderRadius = 3;
        this._wanderDistance = 50;
        this.jitter = 80;
        this.wanderX = 0;
        this.wanderY = 0;
    }
    calculate() {
        this.steeringForceX = 0;
        this.steeringForceY = 0;
        this.steeringForce = this.calculateWeightedSum();
        return this.steeringForce;
    }
    calculateWeightedSum() {
        var wander = this.wander();
        this.steeringForceX += this.wander().x;
        this.steeringForceY += this.wander().y;
        return {
            x: this.steeringForceX,
            y: this.steeringForceY
        };
    }
    wander() {
        var randomAngle = this.randomClamped();
        this.wanderX += Math.cos(randomAngle)
        this.wanderY += Math.sin(randomAngle)
        var normalize = PolarCoordinates.normalize(this.wanderX, this.wanderY);
        this.wanderX = normalize.x * this._wanderRadius;
        this.wanderY = normalize.y * this._wanderRadius;
        var targetX = this.wanderX + this._wanderDistance;
        var targetY = this.wanderY;
        var localToGlobal = PolarCoordinates.localToGlobal(
            targetX, targetY,
            this.vehicle.pos().x, this.vehicle.pos().y,
            this.vehicle.velocityX, this.vehicle.velocityY
        )
        var toTargetX = localToGlobal.x - this.vehicle.pos().x;
        var toTargetY = localToGlobal.y - this.vehicle.pos().y;
        return {
            x: toTargetX,
            y: toTargetY
        };
    }
    randomClamped() {
        return Math.round((Math.random() * 359));
    }
}