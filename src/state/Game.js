Summ.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    //Own
    this.utils = new Summ.Utils();
    this.map;
    this.layer;
    this.mask;
    this.selectGraphics;
    this.graphics;
    this.selectedTriangles = [];

    this.moveX = 50;
    this.moveY = 200;
    this.tileSize = 128;
    this.halfTileSize = this.tileSize / 2;

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Summ.Game.prototype = {
    create: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.add.sprite(0, 0, 'green');
        this.map = this.game.add.tilemap();
        this.map.addTilesetImage('square', 'square', this.tileSize, this.tileSize);

        this.layer = this.map.create('layer', 2, 3, this.tileSize, this.tileSize);
        this.layer.fixedToCamera = false;
        this.layer.position.setTo(this.moveX, this.moveY);
        //this.mask = this.map.createBlankLayer('mask', 5, 5, 128, 128);

        this.graphics = this.game.add.graphics(0, 0);
        this.selectGraphics = this.game.add.graphics(0, 0);

        this.drawTiles();

        this.game.input.addMoveCallback(this.updateMarker, this);
    },

    updateMarker: function () {
        this.updateFigureLocation();

        var x = this.game.input.activePointer.worldX - this.moveX;
        var y = this.game.input.activePointer.worldY - this.moveY;

        if (x < 0 || y < 0) {
            return;
        }

        x = this.layer.getTileX(x);
        y = this.layer.getTileY(y);

        x *= this.tileSize;
        y *= this.tileSize;

        x += this.moveX;
        y += this.moveY;

        this.selectGraphics.clear();

        var poly = new Phaser.Polygon([new Phaser.Point(x, y), new Phaser.Point(x, y + this.tileSize), new Phaser.Point(x + this.halfTileSize, y + this.halfTileSize)]);
        this.drawTriangleOnDown(poly);
        poly = new Phaser.Polygon([new Phaser.Point(x, y), new Phaser.Point(x + this.tileSize, y), new Phaser.Point(x + this.halfTileSize, y + this.halfTileSize)]);
        this.drawTriangleOnDown(poly);
        poly = new Phaser.Polygon([new Phaser.Point(x + this.tileSize, y), new Phaser.Point(x + this.tileSize, y + this.tileSize), new Phaser.Point(x + this.halfTileSize, y + this.halfTileSize)]);
        this.drawTriangleOnDown(poly);
        poly = new Phaser.Polygon([new Phaser.Point(x, y + this.tileSize), new Phaser.Point(x + this.tileSize, y + this.tileSize), new Phaser.Point(x + this.halfTileSize, y + this.halfTileSize)]);
        this.drawTriangleOnDown(poly);
    },

    drawTriangleOnDown: function (poly) {
        if (poly.contains(this.game.input.x, this.game.input.y)) {
            this.selectGraphics.beginFill(0xFFFFF, 0.5);
            this.selectGraphics.drawPolygon(poly.points);
            this.selectGraphics.endFill();
            /*if (this.game.input.mousePointer.isDown) {
                this.selectTriangle(poly);
            }*/
        }
    },

    drawFigure: function (figure, image) {
        var poly;
        var size = this.tileSize;
        var x = this.moveX;
        var y = this.moveY;
        var utils = this.utils;
        figure.tiles.forEach(function (tile) {
            tile.triangles.forEach(function (triangle) {
                image.beginFill(triangle.color);
                image.drawPolygon(utils.polyForTriangle(tile, triangle.type, size, 0, 0));
                image.endFill();
            });
        });
        return image;
    },

    selectTriangle: function (poly) {
        var graphics = this.graphics;
        this.selectedTriangles.push(poly);
        this.selectedTriangles.forEach(function (poly) {
            graphics.beginFill(0xFFFFE0, 1);
            graphics.drawPolygon(poly.points);
            graphics.endFill();
        });
    },

    drawTiles: function () {
        this.map.putTile(0, 0, 0, this.layer);
        this.map.putTile(0, 1, 0, this.layer);

        this.map.putTile(0, 0, 1, this.layer);
        this.map.putTile(0, 1, 1, this.layer);

        this.map.putTile(0, 0, 2, this.layer);
        this.map.putTile(0, 1, 2, this.layer);

        /*var figure = new Summ.Figure([new Summ.Tile([new Summ.Triangle(Summ.TriangleTypes.TOP, Summ.Colors.BLUE)], 0, 0)]);
         this.triangle = this.drawFigure(figure, this.game.add.graphics(0, 0));*/
        this.triangle = this.add.sprite(0, 0, 'triangle');
        this.triangle.inputEnabled = true;
        this.triangle.anchor.setTo(0.5, 0.5);
        this.triangle.events.onInputDown.add(this.inputDownListener, this);
        this.triangle.events.onInputUp.add(this.inputUpListener, this);
    },

    inputDownListener: function () {
        this.chosen = this.triangle;
    },

    inputUpListener:function(){
        this.chosen = null;
    },

    updateFigureLocation:function(){
        if(this.chosen){
            this.chosen.x = this.game.input.activePointer.worldX;
            this.chosen.y = this.game.input.activePointer.worldY;
        }
    },

    update: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
    },

    quitGame: function (pointer) {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        //  Then let's go back to the main menu.
        this.state.start('MainMenu');
    }
};
