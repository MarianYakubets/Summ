Summ.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game = game;      //  a reference to the currently running game (Phaser.Game)
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
    this.mask;
    this.selectGraphics;
    this.graphics;

    this.level;
    this.backLayer;

    this.moveX = 50;
    this.moveY = 200;
    this.tileSize = 128;
    this.halfTileSize = this.tileSize / 2;

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Summ.Game.prototype = {
    init: function (level) {
        this.level = level;
        console.log(level.number);
    },

    create: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.add.sprite(0, 0, 'green');
        this.map = this.game.add.tilemap();
        this.map.addTilesetImage('square', 'square', this.tileSize, this.tileSize);

        this.backLayer = new Summ.BackLayerHolder(this.game, this.level, this.map);

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
            this.selectGraphics.x = 900;
            this.selectGraphics.y = 900;
            return;
        }
        x = this.backLayer.layer.getTileX(x);
        y = this.backLayer.layer.getTileY(y);

        if (x > 1 || y > 2) {
            this.selectGraphics.x = 900;
            this.selectGraphics.y = 900;
            return;
        }


        x *= this.tileSize;
        y *= this.tileSize;

        x += this.moveX;
        y += this.moveY;

        this.selectGraphics.x = x;
        this.selectGraphics.y = y;
    },

    drawTiles: function () {
        this.map.putTile(0, 0, 0, this.backLayer.layer);
        this.map.putTile(0, 1, 0, this.backLayer.layer);

        this.map.putTile(0, 0, 1, this.backLayer.layer);
        this.map.putTile(0, 1, 1, this.backLayer.layer);

        this.map.putTile(0, 0, 2, this.backLayer.layer);
        this.map.putTile(0, 1, 2, this.backLayer.layer);


        var figure = new Summ.Figure([new Summ.Tile([new Summ.Triangle(Summ.TriangleTypes.TOP, Summ.Colors.BLUE), new Summ.Triangle(Summ.TriangleTypes.LEFT, Summ.Colors.BLUE), new Summ.Triangle(Summ.TriangleTypes.RIGHT, Summ.Colors.BLUE)], 0, 0)]);
        this.triangle = new Summ.FigureGroup(this.game, figure);
        this.triangle.position.setTo(100, 100);
        var state = this;
        this.triangle.forEach(function (item) {
            item.inputEnabled = true;
            item.events.onInputDown.add(state.inputDownListener, state);
            item.events.onInputUp.add(state.inputUpListener, state);
        });

        // drawFigure();
    },

    inputDownListener: function () {
        this.chosen = this.triangle;
        this.selectGraphics.clear();
        this.selectGraphics.position.setTo(900, 900);
        var selectGraphics = this.selectGraphics;
        this.chosen.figure.tiles.forEach(function (tile) {
            selectGraphics.beginFill(0xFFFFE0, 0.4);
            tile.triangles.forEach(function (triangle) {
                selectGraphics.drawPolygon(Utils.polyForTriangle(tile, triangle.type, 128, 0, 0));
            });
            selectGraphics.endFill();
        })

    },

    inputUpListener: function () {
        this.chosen.x = this.selectGraphics.x + this.halfTileSize;
        this.chosen.y = this.selectGraphics.y + this.halfTileSize;
        this.chosen = null;
        this.selectGraphics.clear();
    },

    updateFigureLocation: function () {
        if (this.chosen) {
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
