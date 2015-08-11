Summ.BackLayerHolder = function (game, level, map) {
    this.aims = level.aims;
    this.name = 'backLayer';
    this.game = game;
    this.map = map;
    this.layer = map.create(name, level.width, level.heigth, 128, 128);
    this.graphics = this.game.add.graphics(0, 0);
    this.init(level);
};

Summ.BackLayerHolder.prototype = {
    init: function (level) {
        this.layer.fixedToCamera = false;
        this.layer.position.setTo(50, 200);

        this.fillEmptyTile(this.map, this.layer, level.width, level.heigth);
        this.drawTiles(level.targets, this.graphics, 50, 200);
    },

    fillEmptyTile: function (map, layer, width, heigth) {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < heigth; j++) {
                map.putTile(0, i, j, layer);
            }
        }
    },

    drawTiles: function (tiles, graphics, moveX, moveY) {
        tiles.forEach(function (tile) {
            graphics.beginFill(0xFFFFE0, 1);
            tile.triangles.forEach(function (triangle) {
                graphics.drawPolygon(Utils.polyForTriangle(tile, triangle.type, 128, moveX, moveY));
            });
            graphics.endFill();
        });
    }
};