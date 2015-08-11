Summ.FieldController = function (level) {
    this.level = level;
    this.targetItems = this.createTargetItems(level.targets);
    this.items = []
};

Summ.FieldController.prototype = {
    setFigureToField: function (figure) {

    },

    removeFigureFromField: function (figure) {


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