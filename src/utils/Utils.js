function Utils() {
}
Utils.polyForTriangle = function (tile, type, size, moveX, moveY) {
    var x = tile.x * size + moveX;
    var y = tile.y * size + moveY;
    var halfSize = size / 2;

    if (type == Summ.TriangleTypes.LEFT)
        return new Phaser.Polygon([new Phaser.Point(x, y), new Phaser.Point(x, y + size), new Phaser.Point(x + halfSize, y + halfSize)]);

    if (type == Summ.TriangleTypes.TOP)
        return new Phaser.Polygon([new Phaser.Point(x, y), new Phaser.Point(x + size, y), new Phaser.Point(x + halfSize, y + halfSize)]);

    if (type == Summ.TriangleTypes.RIGHT)
        return new Phaser.Polygon([new Phaser.Point(x + size, y), new Phaser.Point(x + size, y + size), new Phaser.Point(x + halfSize, y + halfSize)]);

    if (type == Summ.TriangleTypes.BOTTOM)
        return new Phaser.Polygon([new Phaser.Point(x, y + size), new Phaser.Point(x + size, y + size), new Phaser.Point(x + halfSize, y + halfSize)]);

};