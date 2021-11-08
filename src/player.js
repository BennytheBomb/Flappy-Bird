export default class Player {
    constructor(x, y, radius = 20, gravity = 0.4, jumpForce = -7) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.gravity = gravity;
        this.jumpForce = jumpForce;

        this.velocity = 0;
    }

    checkOverlap(X1, Y1, X2, Y2) {
        // Find the nearest point on the
        // rectangle to the center of
        // the circle
        let Xn = Math.max(X1, Math.min(this.x, X2));
        let Yn = Math.max(Y1, Math.min(this.y, Y2));

        // Find the distance between the
        // nearest point and the center
        // of the circle
        // Distance between 2 points,
        // (x1, y1) & (x2, y2) in
        // 2D Euclidean space is
        // ((x1-x2)**2 + (y1-y2)**2)**0.5
        let Dx = Xn - this.x;
        let Dy = Yn - this.y;
        return (Dx * Dx + Dy * Dy) <= this.radius * this.radius;
    }

    jump() {
        if (this.y <= 0) return;
        this.velocity = this.jumpForce;
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}