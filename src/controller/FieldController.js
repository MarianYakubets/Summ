Summ.FieldController = function (level) {
    this.level = level;
    this.targetItems = this.createTargetItems(level.targets);
    this.items = []
};

Summ.FieldController.prototype = {
    removeFigureFromField: function (tile) {
        var index;
        var items = this.items;
        tile.triangles.forEach(function (triangle) {
            index = items.indexOf(new Summ.Item([tile.x, tile.y, triangle.type], triangle.color));
            if (index != -1) {
                items.splice(index, 1);
            }
        });
    },

    setFigureToField: function (tile) {
        tile.triangles.forEach(function (triangle) {
            this.items.push(new Summ.Item([tile.x, tile.y, triangle.type], triangle.color));
        });
    },

    createTargetItems: function (tiles) {
        var items = [];
        tiles.forEach(function (tile) {
            tile.triangles.forEach(function (triangle) {
                items.push(new Summ.Item([tile.x, tile.y, triangle.type], triangle.color));
            });
        });
        console.log(items.toString());
        return items;
    }

};