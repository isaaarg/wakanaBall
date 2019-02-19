function Ball(game){
    this.game = game

    this.posX = 50
    this.posY = 50
    this.velX = 5
    this.velY = 1
    this.color = 'white'
    this.radius = 10
    this.gravity = .05
}


Ball.prototype._draw = function(){
    this.game.ctx.beginPath()
    this.game.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
    this.game.ctx.fillStyle = this.color
    this.game.ctx.fill()
}

Ball.prototype.move = function(){
    this.posX += this.velX
    this.posY += this.velY
    this.velY += this.gravity
    // esta condicion hace que no se salga. 
    
    if (this.posY + this.velY > this.game.canvas.h || this.posY + this.velY < 0) {
        this.velY *= -1; //la velocidad cambia para efecto rebote
    } 
    if (this.posX + this.velX > this.game.canvas.w || this.posX + this.velX < 0) {
        this.velX *= -1;
    }
}