import '../css/style.css';
import { Actor, Engine, Vector, DisplayMode } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        });
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("start de game!");
        const fish = new Actor();
        fish.graphics.use(Resources.Fish.toSprite());
        fish.pos = new Vector(500, 300);
        fish.vel = new Vector(-10, 0);
        fish.events.on("exitviewport", (e) => this.fishLeft(e));
        this.add(fish);

        for (let i = 0; i < 100; i++) {
            this.createBubble();
        }
    }

    fishLeft(e) {
        e.target.pos = new Vector(1350, 300);
    }

    createBubble() {
        const bubble = new Actor();
        bubble.graphics.use(Resources.Bubble.toSprite());

        const randomX = Math.random() * this.drawWidth;
        const randomY = Math.random() * 1000 + (this.drawHeight + Resources.Bubble.height);
        bubble.pos = new Vector(randomX, randomY);

        const randomVelY = Math.random() * 10 + 10;
        bubble.vel = new Vector(0, -randomVelY);

        this.add(bubble);
    }
}

new Game();
