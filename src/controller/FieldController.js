Summ.FieldController = function (level) {
    this.level = level;
   // this.targetItems = this.createTargetItems(level.targets);
    this.items = new Summ.Map();
};

Summ.FieldController.prototype = {
    removeFigureFromField: function (tile) {
        var index;
        var items = this.items;
        tile.triangles.forEach(function (triangle) {
            items.remove(Utils.coordinateToKey(tile.x, tile.y, triangle.type));
        });
    },

    setFigureToField: function (x, y, tile) {
        var items = this.items;
        var taken = false;
        tile.triangles.forEach(function (triangle) {
            taken = items.get(Utils.coordinateToKey(x, y, triangle.type)) == triangle.color;
        });
        if (taken) {
            tile.x = 0;
            tile.y = -1;
            return;
        }
        this.removeFigureFromField(tile);

        tile.triangles.forEach(function (triangle) {
            items.put(Utils.coordinateToKey(x, y, triangle.type), triangle.color);
        });
        tile.x = x;
        tile.y = y;
    },

    createTargetItems: function (tiles) {
        var items = new Summ.Map();
        tiles.forEach(function (tile) {
            tile.triangles.forEach(function (triangle) {
                items.put(Utils.coordinateToKey(tile.x, tile.y, triangle.type), triangle.color);
            });
        });
        return items;
    }

};