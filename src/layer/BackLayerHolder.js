Summ.BackLayerHolder = function (game, level, map) {
    this.keys = level.keys;
    this.name = 'backLayer';
    this.game = game;
    this.layer = map.create(name, level.lines, level.rows, 128);
    this.graphics;
    this.init();
};

Summ.BackLayerHolder.prototype = {
    init: function () {
        this.layer.fixedToCamera = false;
        this.layer.position.setTo(50, 200);
        this.graphics = this.game.add.graphics(0, 0);
    },

    drawTiles:function(tiles, graphics, moveX,moveY){

    }


};