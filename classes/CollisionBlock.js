/** Classe pour le sblocks de collisions des plateformes */
class CollisionBlock {
    x;
    y;
    width;
    height;
    number;
    constructor(
        x,
        y,
        width,
        height,
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}