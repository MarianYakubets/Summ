Summ.FieldController = function (level) {
    this.level = level;
    this.targetItems = this.createTargetItems(level);
};

Summ.FieldController.prototype = {
    setFigureToField: function (figure) {

    },

    removeFigureFromField: function (figure) {


    },

    createTargetItems: function (level) {
        var items =[];
        var targets = level.targets;
        targets.forEach(function (figure) {
            figure.tiles[0].triangles.forEach(function(triangle){
               items.push([tile.x,tile.y,triangle.type],triangle.color) ;
            });
        });
    }

};