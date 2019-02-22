function BallMio(game){
    this.game = game
    this.x = 50
    this.y = 50
    this.vx = 5
    this.vy = 1
    this.color = 'white'
    this.radius = 10
    this.gravity = .05

}


//pinntar la pelota
BallMio.prototype._draw = function(){
    this.game.ctx.beginPath()
    this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.game.ctx.fillStyle = this.color
    this.game.ctx.fill()
}

//mover la pelota
BallMio.prototype.move = function(){
    this.x += this.vx
    this.y += this.vy
    this.vy += this.gravity

    //ahora hay quehacer que la pelota no se sala de la pantalla y rebote
    if(this.y > this.game.canvas.h + this.radius*3) { //si toca 
        this.game.gameOver() //pierdes!!!!!
    }

    if (this.y + this.vy < 0) { //esto dice que si la pelota va hacia arriba
       this.vy *= -1 //cambia la direccion de y 
    } 

    if (this.x + this.vx > this.game.canvas.w || this.x + this.vx < 0){ //si la pelota se va hacia dcha o izq cambia direcc
        this.vx *=-1 //efecto rebote
    }
}

