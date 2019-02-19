function Player(game) {
    this.game = game
    //posicion desde el suelo
    this.x = 0
    this.y0 = this.game.canvas.height * 0.8;
    this.y = this.y0;
    this.posY = 400;
    this.color = "white"
    this.w = 150
    this.h = 2
    this.vx = 10
    this._move()
}

Player.prototype.drawRect = function () {
    this.game.ctx.fillRect(this.x, this.posY, this.w, this.h) // y = 497
    this.game.ctx.fillStyle = this.color

}

Player.prototype._move = function () {
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 39:
            if (this.x + this.w + 10 <= this.game.canvas.w) 
            { this.x += 10
                console.log("pepe") 
            }
            break
            case 37:
            if(this.x >= 0)
            {this.x -= 10}
            break
        }
    }.bind(this)
}