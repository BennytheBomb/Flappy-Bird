import { getRandomInt } from './helper';

export default class Obstacle {
    constructor(x, holeHeight = 150, screenWidth = 800, screenHeight = 600, width = 50, velocity = -3) {
        this.x = x;
        this.startingX = x;
        this.holeHeight = holeHeight
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.level = getRandomInt(0, 5);
        this.width = width;
        this.velocity = velocity;
    }

    update() {
        this.x += this.velocity;

        if (this.x < -this.width) {
            this.x = this.screenWidth;
            this.level = getRandomInt(0, 5);
        }
    }

    getPipeCoords() {
        const upperPipeHeight = 100 + this.level * 50;
        return {
            upperPipeHeight,
            lowerPipeY: upperPipeHeight + this.holeHeight
        };
    }

    draw(ctx) {
        const { upperPipeHeight, lowerPipeY } = this.getPipeCoords();
        ctx.fillRect(this.x, 0, this.width, upperPipeHeight);
        ctx.fillRect(this.x, lowerPipeY, this.width, this.screenHeight - lowerPipeY);
    }

    getPipes() {
        const upperPipeHeight = 100 + this.level * 50;
        const lowerPipeY = upperPipeHeight + this.holeHeight;

        return [{
            x1: this.x,
            y1: 0,
            x2: this.x + this.width,
            y2: upperPipeHeight
        },
        {
            x1: this.x,
            y1: lowerPipeY,
            x2: this.x + this.width,
            y2: this.screenHeight
        }];
    }
}