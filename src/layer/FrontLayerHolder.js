Summ.FrontLayerHolder = function (game, level, map) {
    this.figures = level.figures;
    this.name = 'frontLayer';
    this.game = game;
    this.map = map;
    this.layer = map.create(name, level.width, level.heigth, 128, 128);
    this.marker = this.game.add.graphics(0, 0);

    this.moveX = 50;
    this.moveY = 200;
    this.tileSize = 128;
    this.halfTileSize = this.tileSize / 2;
    this.currentFigure = null;

    this.init(level);
};

Summ.FrontLayerHolder.prototype = {
    init: function (level) {
        this.layer.fixedToCamera = false;
        this.layer.position.setTo(50, 200);
        var symbol = this.drawTile(level.figures[0], this);
        symbol.x = 100;
        symbol.y = 100;
        this.game.input.addMoveCallback(this.updateMarker, this);
    },

    drawTile: function (tile, listener) {
        var figure = new Summ.Figure(this.game, tile);
        figure.forEach(function (item) {
            item.inputEnabled = true;
            item.events.onInputDown.add(listener.inputDownListener(figure), listener);
            item.events.onInputUp.add(listener.inputUpListener, listener);
        });
        return figure;
    },

    inputDownListener: function (figure) {
        var holder = this;
        var marker = this.marker;
        return function () {
            holder.currentFigure = figure;
            marker.clear();
            marker.position.setTo(900, 900);
            marker.beginFill(0x000000, 0.2);
            holder.currentFigure.tile.triangles.forEach(function (triangle) {
                marker.drawPolygon(Utils.polyForTriangle(holder.currentFigure.tile, triangle.type, 128, 0, 0));
            });
            marker.endFill();
        }

    },

    inputUpListener: function () {
        this.marker.clear();
        if (this.currentFigure == null) {
            return;
        }
        this.currentFigure.x = this.marker.x + this.halfTileSize;
        this.currentFigure.y = this.marker.y + this.halfTileSize;
        this.currentFigure = null;
    },

    updateMarker: function () {
        this.updateFigureLocation();

        var x = this.game.input.activePointer.worldX - this.moveX;
        var y = this.game.input.activePointer.worldY - this.moveY;

        if (x < 0 || y < 0) {
            this.marker.x = 900;
            this.marker.y = 900;
            return;
        }
        x = this.layer.getTileX(x);
        y = this.layer.getTileY(y);

        if (x > 1 || y > 2) {
            this.marker.x = 900;
            this.marker.y = 900;
            return;
        }

        this.marker.x = x * this.tileSize + this.moveX;
        this.marker.y = y * this.tileSize + this.moveY;
    },

    updateFigureLocation: function () {
        if (this.currentFigure) {
            this.currentFigure.x = this.game.input.activePointer.worldX;
            this.currentFigure.y = this.game.input.activePointer.worldY;
        }
    }
};