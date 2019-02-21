function Player(game) {
    this.game = game
    //posicion desde el suelo
    this.x = 0
    this.y0 = this.game.canvas.height * 0.8;
    this.y = this.y0;
    this.posY = 490;
    this.color = "white"
    this.w = 150
    this.h = 2
    this.vx = 10
    this.listener()
    this.canMove= {
        left :false,
        right:false
    }
}

Player.prototype.drawRect = function () {
    this.game.ctx.fillStyle = this.color
    this.game.ctx.fillRect(this.x, this.posY, this.w, this.h) // y = 497

}

Player.prototype.listener = function () {
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 39:
            if (this.canMove.left = true)
            
            break
            case 37:
            if(this.canMove.right = true)
            break
        }
    }.bind(this)

    document.onkeyup = function (event) {
        switch (event.keyCode) {
            case 39:
            if (this.canMove.left = false)
            
            break
            case 37:
            if(this.canMove.right = false)
            break
        }
    }.bind(this)

}

Player.prototype._move = function(){
    if(this.canMove.left)
    if (this.x + this.w + 10 <= this.game.canvas.w) 
    { this.x += 10} 

    if(this.canMove.right)
    if(this.x >= 0)
     {this.x -= 10}
            
}