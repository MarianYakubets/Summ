Summ.MainMenu = function (game) {
	this.playButton = null;
};

Summ.MainMenu.prototype = {

	create: function () {
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
		//this.add.sprite(0, 0, 'green');
		//var pom = this.add.sprite(30,30,"square");
		this.startGame();
	},

	update: function () {
		//	Do some nice funky main menu effect here
	},

	startGame: function (pointer) {
		//	And start the actual game
		this.state.start('Game',true, false, new Summ.Level(1,2,3));
	}

};
