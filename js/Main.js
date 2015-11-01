'use strict';
var SCREEN_WIDTH = 700;
var SCREEN_HEIGHT = 400;
var ENTITY_COUNT = 50;
var DEG_TO_RADS = Math.PI / 180
var RADS_TO_DEG = 180 / Math.PI;
var NEXT_ID = 0;
/**
 * Experiment with elements transforms
 * @author  Tarvo Tiivits
 * @date 2015 10
 */
class Main {
    constructor() {
        this._body; //html body
        this._iContainer; //container
        this._body = document.body;
        this._iContainer = document.querySelector("#innerContainer");
        this.animate = new Creator(this._iContainer);
        this.prepareResize();
        this.windowResize();
        this.prepareFPS();
    }
    prepareFPS() {
        this.rafId = window.requestAnimationFrame(this.updateAndRender.bind(this));
    }
    updateAndRender(time) {
        this.animate.updateAndRender();
        this.rafId = window.requestAnimationFrame(this.updateAndRender.bind(this));
    }
    prepareResize() {
        window.onresize = this.windowResize.bind(this);
    }
    windowResize() {
        //this.setSize();
        this.setTopLeft();
    }
    setTopLeft() {
            var x = (this._body.clientWidth - this._iContainer.clientWidth) * .5;
            var y = (this._body.scrollHeight - this._iContainer.clientHeight) * .5
            this._iContainer.style.left = x + ("px");
            this._iContainer.style.top = y + ("px");
    }
        /*setSize()
        {
            
            if((this._body.clientWidth) >= 1024) return;
            this._iContainer.style.width = (this._body.clientWidth) + ("px");
            SCREEN_WIDTH  = this._iContainer.style.width
            this._iContainer.style.height = (this._iContainer.style.width/ this.widthHeightRelation) + ("px") ;
            
        }*/
}