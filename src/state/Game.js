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
    this.map;
    this.layer;
    this.mask;
    this.selectGraphics;
    this.graphics;
    this.selectedTriangles = [];

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Summ.Game.prototype = {
    create: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.add.sprite(0, 0, 'green');
        this.map = this.game.add.tilemap();
        this.map.addTilesetImage('triangle', 'triangle', 128, 128);

        this.layer = this.map.create('layer', 5, 5, 128, 128);
        this.mask = this.map.createBlankLayer('mask', 5, 5, 128, 128);

        this.graphics = this.game.add.graphics(0, 0);
        this.selectGraphics = this.game.add.graphics(0, 0);

        this.drawTiles();

        this.game.input.addMoveCallback(this.updateMarker, this);
    },

    updateMarker: function () {
        var x = this.layer.getTileX(this.game.input.activePointer.worldX);
        var y = this.layer.getTileY(this.game.input.activePointer.worldY);
        x *= 128;
        y *= 128;

        var poly = new Phaser.Polygon([new Phaser.Point(x, y), new Phaser.Point(x, y + 128), new Phaser.Point(x + 64, y + 64)]);
        this.drawTriangle(poly);
        poly = new Phaser.Polygon([new Phaser.Point(x, y), new Phaser.Point(x + 128, y), new Phaser.Point(x + 64, y + 64)]);
        this.drawTriangle(poly);
        poly = new Phaser.Polygon([new Phaser.Point(x + 128, y), new Phaser.Point(x + 128, y + 128), new Phaser.Point(x + 64, y + 64)]);
        this.drawTriangle(poly);
        poly = new Phaser.Polygon([new Phaser.Point(x, y + 128), new Phaser.Point(x + 128, y + 128), new Phaser.Point(x + 64, y + 64)]);
        this.drawTriangle(poly);
    },

    drawTriangle: function (poly) {
        if (poly.contains(this.game.input.x, this.game.input.y)) {
            this.selectGraphics.clear();
            this.selectGraphics.beginFill(0xFFFFF, 0.5);
            this.selectGraphics.drawPolygon(poly.points);
            this.selectGraphics.endFill();
            if (this.game.input.mousePointer.isDown) {
                this.selectTriangle(poly);
            }
        }
    },

    selectTriangle: function (poly) {
        var graphics = this.graphics;
        this.selectedTriangles.push(poly);
        this.selectedTriangles.forEach(function (poly) {
            graphics.beginFill(0xFFFFE0);
            graphics.drawPolygon(poly.points);
            graphics.endFill();
        });
    },

    drawTiles: function () {
        this.map.putTile(0, 0, 0, this.layer);
        this.map.putTile(0, 1, 0, this.layer);
        this.map.putTile(0, 2, 0, this.layer);
        this.map.putTile(0, 3, 0, this.layer);
        this.map.putTile(0, 4, 0, this.layer);

        this.map.putTile(0, 0, 1, this.layer);
        this.map.putTile(0, 1, 1, this.layer);
        this.map.putTile(0, 2, 1, this.layer);
        this.map.putTile(0, 3, 1, this.layer);
        this.map.putTile(0, 4, 1, this.layer);

        this.map.putTile(0, 0, 2, this.layer);
        this.map.putTile(0, 1, 2, this.layer);
        this.map.putTile(0, 2, 2, this.layer);
        this.map.putTile(0, 3, 2, this.layer);
        this.map.putTile(0, 4, 2, this.layer);

        this.map.putTile(0, 0, 3, this.layer);
        this.map.putTile(0, 1, 3, this.layer);
        this.map.putTile(0, 2, 3, this.layer);
        this.map.putTile(0, 3, 3, this.layer);
        this.map.putTile(0, 4, 3, this.layer);

        this.map.putTile(0, 0, 4, this.layer);
        this.map.putTile(0, 1, 4, this.layer);
        this.map.putTile(0, 2, 4, this.layer);
        this.map.putTile(0, 3, 4, this.layer);
        this.map.putTile(0, 4, 4, this.layer);
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
