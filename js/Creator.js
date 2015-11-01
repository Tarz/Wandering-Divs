'use strict';
class Creator {
    constructor(container) {
        this.length;
        this.entitys = new Array();
        this.prepare(container);
    }
	prepare(container) {
        var x, y, angle, velo, velocity, entity, div;
        for (var i = 0; i < ENTITY_COUNT; i++) {
            div = document.createElement('div');
            div.classList.add('box');
            x = Math.round(Math.random() * (SCREEN_WIDTH - 25));
            y = Math.round(Math.random() * (SCREEN_HEIGHT - 25));
            angle = Math.round(Math.random() * 360);
            velo = 1 + Math.round(Math.random() * 4);
            velocity = new Vector2D(Math.cos(angle * DEG_TO_RADS) * velo, Math.sin(angle * DEG_TO_RADS) * velo);
            /*gameWorld,
            radius,
            rotation,
            position,
            velocity,
            mass,
            maxForce,
            maxSpeed,
            maxTurnRate,
            scale*/
            entity = new Vehicle(
                this,
                25,
                angle * DEG_TO_RADS,
                new Vector2D(x, y),
                velocity,
                1,
                3,
                velo,
                1 * DEG_TO_RADS,
                1,
                div,
                container);

            this.entitys.push(entity);
        }
        this.length = this.entitys.length;
    }

    updateAndRender() {
        var i = 0;
        for (i; i < this.length; i++) {
            this.entitys[i].update();
            this.entitys[i].render();
        }
    }
}