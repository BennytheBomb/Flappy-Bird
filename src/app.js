import Player from './player';
import Obstacle from './obstacle';

const canvas = document.getElementById('canvas');
if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    const obstacles = [];
    for (let i = 0; i < 4; i++) {
        obstacles.push(new Obstacle(800 + i * 200));
    }

    const player = new Player(150, 75);

    document.addEventListener(
        'keydown',
        function (event) {
            player.jump();
        },
        false
    );

    let animationFrameHandle = window.requestAnimationFrame(draw);
    let score = 0;
    ctx.font = "30px Arial";

    function draw() {
        if (!animationFrameHandle) return;


        ctx.clearRect(0, 0, 800, 600);

        score++;
        ctx.strokeText(Math.floor(score / 100).toString(), 20, 40);

        player.update();
        player.draw(ctx);

        for (let obstacle of obstacles) {
            obstacle.update();
            obstacle.draw(ctx);

            const pipes = obstacle.getPipes();
            const pipe1 = pipes[0];
            const pipe2 = pipes[1];
            if (player.checkOverlap(pipe1.x1, pipe1.y1, pipe1.x2, pipe1.y2) ||
                player.checkOverlap(pipe2.x1, pipe2.y1, pipe2.x2, pipe2.y2) ||
                player.y > 800) {
                window.cancelAnimationFrame(animationFrameHandle);
                animationFrameHandle = undefined;
                return;
            }
        }

        animationFrameHandle = window.requestAnimationFrame(draw);
    }
}