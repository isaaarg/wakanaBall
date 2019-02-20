function Background(game, url) {
    this.game = game;
  
    this.img = new Image();
    this.img.src = url
  
    this.x = 0;
    this.y = 0;
  
    
  }
  Background.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvasDom.width, this.game.canvasDom.height);
    // this.game.ctx.drawImage(this.img, this.x + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);
  };
  
 Background.prototype.newBack = function(url){
    this.img.src = url 
 }