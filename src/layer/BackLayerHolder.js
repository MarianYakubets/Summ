Summ.BackLayerHolder = function (game, level, map) {
    this.keys = level.keys;
    this.name = 'backLayer';
    this.game = game;
    this.map = map;
    this.layer = map.create(name, level.width, level.heigth, 128, 128);
    this.graphics;
    this.init(level);
};

Summ.BackLayerHolder.prototype = {
    init: function (level) {
        this.layer.fixedToCamera = false;
        this.layer.position.setTo(50, 200);
        this.graphics = this.game.add.graphics(0, 0);

        this.fillEmptyTile(this.map, this.layer, level.width, level.heigth);
    },

    fillEmptyTile: function (map, layer, width, heigth) {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < heigth; j++) {
                map.putTile(0, i, j, layer);
            }
        }
    },

    drawTiles: function (tiles, graphics, moveX, moveY) {

    }


};