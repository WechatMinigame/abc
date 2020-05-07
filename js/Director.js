import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    isGameOver;
    constructor() {
        this.datastore = DataStore.getInstance();
        this.moveSpeed = 2;
    }

    createPencil(){
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.datastore.get('pencils').push(new UpPencil(top));
        this.datastore.get('pencils').push(new DownPencil(top));
    }


    static getInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }

    birdsEvent(){
        for(let i = 0; i <= 2; i++){
            this.datastore.get('birds').y[i] =
                this.datastore.get('birds').birdsY[i];
        }
        this.datastore.get('birds').time = 0;
    }

    static isStrike(bird, pencil){
        let s = false;
        if(bird.top > pencil.bottom ||
           bird.bottom < pencil.top ||
           bird.right < pencil.left ||
           bird.left > pencil.right){
            s = true;
        }
        return !s;
    }

    check() {
        const birds = this.datastore.get('birds');
        const land = this.datastore.get('land');
        const pencils = this.datastore.get('pencils');
        const score = this.datastore.get('score');

        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            this.isGameOver = true;
            return;
        }

        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.y[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        }
        const length = pencils.length;
        for (let i = 0; i < length; i++){
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };
            if(Director.isStrike(birdsBorder, pencilBorder)){
                this.isGameOver = true;
                return;
            }
        }

        if(birds.birdsX[0] > pencils[0].x + pencils[0].width
        && score.isScore){
            score.isScore = false;
            score.scoreNumber++;
        }
    }

    run(){
        this.check();
        if(!this.isGameOver){
            this.datastore.get('background').draw();

            const pencils = this.datastore.get('pencils');
            if(pencils[0].x + pencils[0].width <= 0 && pencils.length === 4){
                pencils.shift();
                pencils.shift();
                this.datastore.get('score').isScore = true;
            }

            if(pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 && pencils.length === 2){
                this.createPencil();
            }

            this.datastore.get('pencils').forEach(function (value) {
                value.draw();
            });
            this.datastore.get('land').draw();
            this.datastore.get('score').draw();
            this.datastore.get('birds').draw();

            let timer = requestAnimationFrame(()=> this.run());
            this.datastore.put('timer', timer);
        }else{
            console.log('gameover');
            this.datastore.get('startButton').draw();
            cancelAnimationFrame(this.datastore.get('timer'));
            this.datastore.destroy();
        }
    }
}