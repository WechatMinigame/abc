import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class Land extends Sprite{
    landX;
    constructor() {
        const image = Sprite.getImage('land');
        super(image, 0, 0,
            image.width, image.height,
            0, window.innerHeight - image.height,
            image.width, image.height);
        this.landX = 0;
        this.landSpeed = Director.getInstance().moveSpeed;
    }

    draw(){
        this.landX += this.landSpeed;
        if (this.landX > this.img.width/* - window.innerWidth*/ - 500) {
            this.landX = 0;
        }
        super.draw(this.img, this.srcX, this.srcY, this.srcW, this.srcH,
            -this.landX, this.y, this.width, this.height)
    }
}