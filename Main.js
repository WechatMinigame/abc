
//入口
import {Resources} from "./js/base/Resources.js";
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {Background} from "./js/runtime/Background.js";
import {DataStore} from "./js/base/DataStore.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor() {
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.datastore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map=>this.OnResourceFirstLoaded(map))


        }

        OnResourceFirstLoaded(map){
            this.datastore.ctx = this.ctx;
            this.datastore.res = map;
            this.init();
        }

        init(){
            this.director.isGameOver = false;

            this.datastore
                .put('pencils', [])
                .put('background', Background)
                .put('land', Land)
                .put('birds', Birds)
                .put('score', Score)
                .put('startButton', StartButton);
            this.registerEvent();
            this.director.createPencil();
            this.director.run();
        }

        registerEvent(){
            this.canvas.addEventListener('touchstart', e=>{
               e.preventDefault();
               if(this.director.isGameOver){
                   console.log('begin');
                   this.init();
               }else{
                    this.director.birdsEvent();
               }
            });
        }

    }

