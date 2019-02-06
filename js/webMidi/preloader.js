var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
    	
    	game.load.image('next', 'next.png');
    	
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px', fill: 'green', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
    },
    
    create: function(){
        game.state.start('mainState'); 
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
     this.progress.text = progress+"%";
};
