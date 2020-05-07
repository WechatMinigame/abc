import {DataStore} from "../base/DataStore.js";

export class Score{
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;
        this.isScore = true;
    }

    draw(){
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = 'rgba(1,36,170,0.39)';
        this.ctx.fillText(
            this.scoreNumber,
            window.innerWidth / 10,
            window.innerHeight / 18,
            1000
        )
    }
}