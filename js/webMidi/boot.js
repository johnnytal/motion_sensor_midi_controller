window.onload = start;

function start(){
    WIDTH = 850; 
    HEIGHT = 1100;

    w = window.innerWidth * window.devicePixelRatio;
    h = window.innerHeight * window.devicePixelRatio;

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "game");    
      
    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("mainState", mainState);
    
    game.state.start("Boot");  
};

var boot = function(game){};
  
boot.prototype = {
    create: function(){
        game.stage.backgroundColor = '#f7f7f7';
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.maxWidth = w;
        this.scale.maxHeight = h;
        
        this.scale.forceOrientation(true, false);

        game.state.start('Preloader');
    }
};