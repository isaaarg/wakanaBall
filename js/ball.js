
//funcion de pelota que llama al juego. 

function Ball(game){
    this.game = game //tiene todas las propiedades de game
    //propiedades de ball
    this.posX = 50
    this.posY = 50
    this.velX = 5
    this.velY = 1
    this.color = 'white'
    this.radius = 10
    this.gravity = .05
}

//funcion que pinta la pelota
Ball.prototype._draw = function(){ //_draw funcion privada patra que los demas frikis no la toquen
    this.game.ctx.beginPath()
    this.game.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
    this.game.ctx.fillStyle = this.color
    this.game.ctx.fill()
}

Ball.prototype.move = function(){
    
    this.posX += this.velX
    this.posY += this.velY
    this.velY += this.gravity //la velocidad Y se va sumanso segun su gravedd 
    
    // esta condicion hace que no se salga. 

    if(this.posY > this.game.canvas.h + this.radius*3) { //si toca el fonde looser
        this.game.gameOver()
    }
    
    if (this.posY + this.velY < 0) { //si al pelota se va parriba cambia la direcc de Y (sig linea d codig)
        this.velY *= -1 //la velocidad cambia para efecto rebote
    } 
    if (this.posX + this.velX > this.game.canvas.w || this.posX + this.velX < 0) { //si la pelota se va pa la derecha o l aizq cambia direcc
        this.velX *= -1 //efecto rebote
    }
}