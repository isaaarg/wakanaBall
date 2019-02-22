
// FUNCION CONSTRUCTORA
function Game(){
    this.version = '1.0'
    this.name = 'Bouncing ball'
    this.canvasDom = undefined
    this.ctx = undefined
    this.fps = 60
    this.level = 1
    this.canvas = {
        w: undefined,
        h: undefined
    }
   
}
    // INICIALIZACION DEL CANVAS. el init le da valor al canvasDom y ctx
    Game.prototype.init = function(id){
        
        // llamamos / seleccionamos el id del index.html
        this.canvasDom = document.getElementById(id) 

        // contexto del canvas
        this.ctx = this.canvasDom.getContext('2d')

        // llamamos a las dimensiones del canvas
        this._setDimensions()
        
        // llamo a la funcion start
        this.start() //ejecuta el juego
        loadedAudios.nivel1.play()
    }

    //dimensiones de mi juego(canvas)
    Game.prototype._setDimensions = function(){
        this.canvas.w = 300 //ancho
        this.canvas.h = 500 //alto
        this.canvasDom.setAttribute('width', this.canvas.w) //manipulacion del Dom. setAttribute metodo de Dom q es una funcion (atributo, valor)
        this.canvasDom.setAttribute('height', this.canvas.h)
    } 

    //la funcion que actualiza mi juego
    Game.prototype._update = function(){
        this.ctx.clearRect(0,0, this.canvas.w, this.canvas.h)
        this.drawAll()
        this.moveAll()
        

        // ScoreBoard.update("pepe",this.ctx)
        //this.obstacles.drawRect()

        if (this.isCollision()) { //esto ejecuta la puta cfuncion
            console.log('colisión!!!')
            this.ball.vy *= -1 //se multiplica por -1 para cambiar de direcc
            this.player.w -=50 //hace que mi linea-player disminuya su ancho acada vez qu ela pelota colisiona con ella
        } //cambiarlo a 0 para comprobar q en el tercer nivel me va la img y la musica

        if (this.isCollisionWithObstacles()){
            this.ball.vy *= -1 //velocidad con la que mi pelota choca con los demás obstaculos que son mas putas lineas
        }

        if (this.player.w <= 0){
            if (this.level == 1){
            this.background.newBack('images/game2.jpg')
            this.player.w = 150 
            this.player.x = 0
            this.level = 2 //me sube el nivel
            this.createObstacles()

            loadedAudios.nivel2.play()
            loadedAudios.nivel1.pause()

            }else if(this.level == 2){
            this.background.newBack('images/vacawaka.jpg')
            this.player.w = 150
            this.player.x = 0
            this.level = 3
            this.createObstacles()
            this.ball.vy -= 8
            this.ball.vx = 7

            loadedAudios.nivel3.play()
            loadedAudios.nivel2.pause()
            }
            
        } 

    } 

    //primero resetea el juego (volver a los valores predeterminados del juegos)
    Game.prototype.start = function(){
        this.reset() 

        //motor del juego
        this.interval= setInterval( function(){ 
            this._update() }.bind(this), 1000 / this.fps)

        
    }

    // ejecuta las funciones controladoras xa accedeer a ellas. a todas ellas se les pasa el this q es el propio juego y asi acceder al mismo
    Game.prototype.reset = function (){
        this.background = new Background(this, 'images/game1.jpg')
        // this.ball = new Ball (this)
        this.ball = new BallMio(this)
        this.player = new Player (this)
        
        this.obstacles = []
      
    }

    //esta funcion lo pinta todo
    Game.prototype.drawAll = function(){
        this.background.draw()
        this.ball._draw()
        //recorre el array de obstaculos 
        this.player.drawRect()
        this.obstacles.forEach(function(obstacle){
            obstacle.drawRect() //pinta cada uno de los obstaculos
        })
        
    }

    //esta funcion mueve todo en mi juego
    Game.prototype.moveAll = function (){
        this.ball.move() //llama a los movimientos de la pelota
        this.player._move() //llama a que mueva la rceta
        this.obstacles.forEach(function (obstacle) { obstacle.move()}) //llama al movimiento de  cada uno de mis obstaculos

    }

    Game.prototype.isCollision = function(){
        var distX = Math.abs(this.ball.x - this.player.x-this.player.w/2)
        var distY = Math.abs(this.ball.y - this.player.posY-this.player.h/2)

        if (distX > (this.player.w/2 + this.ball.radius)) { return false } // la distancia de x es mayor que (el ancho del jugador/2 mas la bola del radio --- false
        if (distY > (this.player.h/2 + this.ball.radius)) { return false } // la distancia de y es mayor que (la altura de mi jugador mas el radio de la bola --- false

        if (distX <= (this.player.w/2)) { return true } 
        if (distY <= (this.player.h/2)) { return true }

        var dx=distX-this.player.w/2
        var dy=distY-this.player.h/2
        return (dx*dx+dy*dy<=(this.ball.radius*this.ball.radius))
    }

    Game.prototype.stop = function (){
        clearInterval(this.interval)
    }

    Game.prototype.gameOver = function(){
        this.stop()
        loadedAudios.nivel1.pause()
        loadedAudios.nivel2.pause()
        loadedAudios.nivel3.pause()
        
        document.getElementsByClassName("game-over")[0].style.display = "block"
        document.getElementsByClassName("game-over")[0].style.position = "absolute"
        document.getElementsByClassName("game-over")[0].style.marginLeft = "215px"
        document.querySelector('.start').onclick = function() {
            document.querySelector('.instructions').style.display = "none" //ocultamos instructios
            app.init('canvasExp')
            document.getElementsByClassName("game-over")[0].style.display = "none"
            document.querySelector('.start').onclick = null

        }
    }

    //hace que la pelota se cuele por abajo del canvas
    Game.prototype.collisionDown = function (){
        console.log(this.ball.posY)
        if(this.ball.posY >= this.canvas.h - this.ball.radius){
            this.gameOver()
        }
    }

    Game.prototype.isCollisionWithObstacles = function(){
        
        //https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/some   
        return this.obstacles.some(function(obstacle){ //this.obstacles son el array de mis obstacles
         //similar al forEach. recorre todo el array y a diferencia el FE nos devuelve true false 
        var distX = Math.abs(this.ball.x - obstacle.x-obstacle.w/2)
        var distY = Math.abs(this.ball.y - obstacle.y-obstacle.h/2)

        if (distX > (obstacle.w/2 + this.ball.radius)) { return false }
        if (distY > (obstacle.h/2 + this.ball.radius)) { return false }

        if (distX <= (obstacle.w/2)) { return true } 
        if (distY <= (obstacle.h/2)) { return true }

        var dx=distX-obstacle.w/2
        var dy=distY-obstacle.h/2
        return (dx*dx+dy*dy<=(this.ball.radius*this.ball.radius))
        }.bind(this))
    }
    
    // Game.prototype.secondLevel = function (){
    //     this.background.img.src = 'images/game2.jpg'
    // }

    Game.prototype.createObstacles = function(){
        this.obstacles = [
            new Obstacles(this, 0, 10, 50, 3),
            new Obstacles(this, 250, 100, 70, 3), 
            // new Obstacles(this, 110, 200, 70, 3),
            new Obstacles(this, 0, 330, 70, 3)
        ]
    }