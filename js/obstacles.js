function Obstacles(game, x, y, w, h){
    this.game = game
    this.x = x
    this.y0 = this.game.canvas.height * 0.8;
    this.y = y;
    this.color = "white"
    this.w = w
    this.h = h
    this.vx = 10

}
Obstacles.prototype.drawRect = function () {
    this.game.ctx.fillRect(this.x, this.y, this.w, this.h) 
    this.game.ctx.fillStyle = this.color
}