'use strict';
class BaseGameEntity {
    constructor(entityType, position, radius, rotation) {
        //private
        this._id = this.nextValidID;
        this._entityType = entityType;
        this._bTag = false;
        //protected
        this._vecPos = position;
        this.vecScale = new Vector2D(1.0, 1.0);
        this.boundingRadius = radius;
        this._rotation = rotation;
    }
    update() {}
    render() {}
    pos() {
        return this._vecPos;
    }
    setPos(newPos) {
        this._vecPos = newPos;
    }
    scale() {
        return this.vecScale
    }
    setScale1(vec) {
        this.boundingRadius *= Math.max(vec.x, vec.y) / Math.max(this.vecScale.x, this.vecScale.y);
        this.vecScale = vec;
    }
    setScale2(number) {
        this.boundingRadius *= (number / Math.max(this.vecScale.x, this.vecScale.y));
        this.vecScale = new Vector2D(number, number);
    }
    bRadius() {
        return this.boundingRadius;
    }
    setBRadius(radius) {
        this.boundingRadius = radius;
    }
    id() {
        return this._id;
    }
    isTagged() {
        return this._bDag;
    }
    tag() {
        this._bDag = true;
    }
    unTag() {
        this._bDag = false;
    }
    entityType() {
        return this._entityType;
    }
    setEntityType() {
        this._entityType;
    }
    nextValidID() {
        return NEXT_ID++;
    }
}