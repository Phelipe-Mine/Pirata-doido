class Bola {
    constructor (x,y){
        var options = {
            isStatic: true
         }
         this.raio = 30
         this.body = Bodies.circle (x,y,this.raio,options)
         this.image = loadImage ("assets/cannonball.png")
         this.trajetoria = []
         World.add (world,this.body)
    }
        mostrar () {
        var pose = this.body.position
        push ()
        imageMode (CENTER)
        image (this.image,pose.x,pose.y,this.raio,this.raio)
        pop ()
    
         if (this.body.velocity.x > 0 && pose.x > 10){
             var posicao = [pose.x,pose.y]
            this.trajetoria.push (posicao)
        }
         for (var i = 0; i < this.trajetoria.length; i = i + 1){
            image (this.image,this.trajetoria [i][0],this.trajetoria[i][1],5,5)
         }
    }
    atirar (){
        Matter.Body.setStatic (this.body,false)
        var newangle = cannon.angle -28
        newangle = newangle* (3.14/180)
        var velocidade = p5.Vector.fromAngle (newangle)
        velocidade.mult (0.5)
        Matter.Body.setVelocity (this.body,{x:velocidade.x*(180/3.14),y:velocidade.y*(180/3.14)})
        
    }
    remove (index){
        Matter.Body.setVelocity (this.body, {
            x:0,y:0
        
        })
        setTimeout(() => {
            Matter.World.remove (world,this.body)
            delete dcanhao [index]
        }, 1000);
    }
}
