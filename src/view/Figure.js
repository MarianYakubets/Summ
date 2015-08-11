Summ.Figure = function (game, tile) {
    this.tile = tile;
    Phaser.Group.call(this, game);

    var image;
    var group = this;
    var x = tile.x * 128;
    var y = tile.y * 128;
    tile.triangles.forEach(function (triangle) {
        image = new Phaser.Sprite(game, x, y, 'triangle', 0);
        image.anchor.setTo(0.5, 0);
        if (triangle.type == Summ.TriangleTypes.LEFT) {
            image.angle = 90;
        } else if (triangle.type == Summ.TriangleTypes.TOP) {
            image.angle = 180;
        } else if (triangle.type == Summ.TriangleTypes.RIGHT) {
            image.angle = 270;
        }
        group.add(image);
    });
};

Summ.Figure.prototype = Object.create(Phaser.Group.prototype);
Summ.Figure.prototype.constructor = Summ.Figure;