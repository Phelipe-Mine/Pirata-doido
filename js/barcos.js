class Barquinhos {
    constructor (x,y,width,height,prebarco){
        this.body = Bodies.rectangle (x,y,width,height);
        this.width = width;
        this.height = height;
        this.prebarco = prebarco ;
        this.image = loadImage ("assets/Piratinha.png");
        World.add (world,this.body);
        
    }
    mostrar (){
        var pose = this.body.position
        var angle = this.body.angle
        push ()
        translate (pose.x,pose.y)
        rotate (angle)
        imageMode (CENTER)
        image (this.image,0,this.prebarco,this.width,this.height)
        pop ()
    }
    remove (index){
        setTimeout(() => {
            Matter.World.remove (world,barcos [index].body)
            delete barcos [index]
        }, 2000);
    }
}