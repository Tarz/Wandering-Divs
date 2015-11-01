'use strict';

class Vehicle extends MovingEntity {
    constructor(
        gameWorld,
        radius,
        rotation,
        position,
        velocity,
        mass,
        maxForce,
        maxSpeed,
        maxTurnRate,
        scale,
        div,
        container
    ) {
        super(
            position,
            radius,
            velocity,
            maxSpeed,
            new Vector2D(Math.sin(rotation), -Math.cos(rotation)),
            mass,
            new Vector2D(scale, scale),
            maxTurnRate,
            maxForce,
            rotation
        );
        //new Vector2D(Math.sin(rotation),-Math.cos(rotation) heading

        this.gameWorld = gameWorld;
        this.div = div; //New HTML div (this)
        this.container = container; //HTML div
        this.style = div.style;
        this.angle = rotation;
        this.velocityX = velocity.x;
        this.velocityY = velocity.y;
        this.prepare();
        this.steering = new WanderBehavior(this);
        this.step = 0;
    }

    prepare() {
        this.container.appendChild(this.div);
    }

    update() {
        this.step++;

        //if(this.step % 60 != 0) return;

        var steeringForce = this.steering.calculate();
        var steeringForceX = steeringForce.x;
        var steeringForceY = steeringForce.y;
        var accelerationX = steeringForceX / this._mass;
        var accelerationY = steeringForceY / this._mass;
        var veloX = this.velocityX + accelerationX;
        var veloY = this.velocityY + accelerationY;
        var truncate = PolarCoordinates.truncate(veloX, veloY, this._maxSpeed);
        veloX = truncate.x;
        veloY = truncate.y;
        this._vecPos.x += veloX;
        this._vecPos.y += veloY;
        this.velocityX = veloX;
        this.velocityY = veloY;
        //update the heading if the vehicle has a non zero velocity
        if (PolarCoordinates.lengthSq(veloX, veloY) > .0001) {
            this._rotation = Math.atan2(veloY, veloX);
        }
        this.angle = this._rotation * RADS_TO_DEG;
        Vector2D.WrapAround(this._vecPos, SCREEN_WIDTH, SCREEN_HEIGHT, 25);
    }

    render() {
        var transform =
            'translateX(' + this._vecPos.x + 'px) ' +
            'translateY(' + this._vecPos.y + 'px) ' +
            'rotate(' + this.angle + 'deg) ';
        this.style.transform = transform;
    }
}