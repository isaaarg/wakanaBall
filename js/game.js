function Game(){
    this.version = '1.0'
    this.name = 'Bouncing ball'
    this.canvasDom = undefined
    this.ctx = undefined
    this.fps = 60
    this.canvas = {
        w: undefined,
        h: undefined
    }
}

    Game.prototype.init = function(id){
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this._setDimensions()				
        this.start()
       
        
    }
    Game.prototype._setDimensions = function(){
        this.canvas.w = 300
        this.canvas.h = 500
        this.canvasDom.setAttribute('width', this.canvas.w)
        this.canvasDom.setAttribute('height', this.canvas.h)
    } 

    Game.prototype._update = function(){
        this.ctx.clearRect(0,0, this.canvas.w, this.canvas.h)
        this.drawAll()
        this.moveAll()
        this.player.drawRect()
        // ScoreBoard.update("pepe",this.ctx)
        //this.obstacles.drawRect()

        this.obstacles.forEach(function(obstacle){
            obstacle.drawRect()
        })

        

        if (this.isCollision()) {
            console.log('colisión!!!')
            this.ball.velY *= -1
            this.player.w -=90
        }



    } 

    Game.prototype.start = function(){
        this.reset() 
        setInterval( function(){ 
            this._update() }.bind(this), 1000 / this.fps)

        
    }


    Game.prototype.reset = function (){
        this.background = new Background(this)
        this.ball = new Ball (this)
        this.player = new Player (this)
        this.obstacles = [
            new Obstacles(this, 10, 100, 50, 31), 
            new Obstacles(this, 10, 10, 50, 31)
        ]
      
    }

    Game.prototype.drawAll = function(){
        this.background.draw()
        this.ball._draw()
        
    }

    Game.prototype.moveAll = function (){
        this.ball.move()
        this.player.drawRect()

    }


    Game.prototype.isCollision = function(){
        var distX = Math.abs(this.ball.posX - this.player.x-this.player.w/2);
        var distY = Math.abs(this.ball.posY - this.player.posY-this.player.h/2);

        if (distX > (this.player.w/2 + this.ball.radius)) { return false; }
        if (distY > (this.player.h/2 + this.ball.radius)) { return false; }

        if (distX <= (this.player.w/2)) { return true; } 
        if (distY <= (this.player.h/2)) { return true; }

        var dx=distX-this.player.w/2;
        var dy=distY-this.player.h/2;
        return (dx*dx+dy*dy<=(this.ball.radius*this.ball.radius));
    }

    // Game.prototype.stop = function (){
    //     clearInterval(this.interval)
    // }

    // Game.prototype.gameOver = function(){
    //     this.stop()
    //     if (confirm("GAME OVER")) {
    //         this.reset()
    //         this.start()
    //       }
    // }

    // Game.prototype.collisionDown = function (){
    //     console.log(this.ball.posY)
    //     if(this.ball.posY >= this.canvas.h - this.ball.radius){
    //         this.gameOver()
    //     }
    // }

    