function Obstacles(game, x, y, w, h){
    this.game = game
    this.x = x
    this.y0 = this.game.canvas.height * 0.8;
    this.y = y;
    this.color = "black"
    this.w = w
    this.h = h
    this.vx = 10
    this.dy = 3

}
Obstacles.prototype.drawRect = function () {
    this.game.ctx.fillStyle = this.color
    this.game.ctx.fillRect(this.x, this.y, this.w, this.h) 
}

Obstacles.prototype.move = function() {
    this.y += this.dy
    if(this.y>this.game.canvas.h){  
        this.y = 0
      }
  }

  