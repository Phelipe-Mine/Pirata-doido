const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var dcanhao
var canvas, angle, tower, ground, cannon;
var bolas = []
var barco
var barcos = []

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);
    
  angleMode (DEGREES)
  angle = 20
  cannon = new Cannon (180,110,130,100,angle) 
  
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);
  
  rect(ground.position.x, ground.position.y, width * 2, 1);

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  

  

  for (var i = 0; i < bolas.length; i = i + 1){
    mostras (bolas[i],i)
    creeper (i)
  }
  cannon.mostrar ()
  holandes ()
}

function keyReleased (){
  if (keyCode === DOWN_ARROW){
    bolas[bolas.length -1].atirar ()
  }
}

function keyPressed () {
  if (keyCode === DOWN_ARROW){
  dcanhao = new Bola (cannon.x,cannon.y);
  dcanhao.trajetoria = []
  Matter.Body.setAngle (dcanhao.body,cannon.angle)
  bolas.push (dcanhao);
  
  }
}

function mostras(bola,index) {
  if (bola) {
   bola.mostrar ()
   
   if (bola.body.position.x >= width || bola.body.position.y >= height -50 ){
    bola.remove (index)
    }
  }
}
function holandes (){
  if (barcos.length > 0  ){
    if (barcos [barcos.length - 1 ] === undefined || barcos [barcos.length - 1].body.position.x < width - 300 ){
      var position = [-50,-30,-20,-80]
      var dado = random (position)
      barco = new Barquinhos (width,height - 50,170,170,dado)
      barcos.push (barco)
    }
    for (var i = 0; i < barcos.length; i = i  +1 ){
      if (barcos [i]){
         barcos [i].mostrar ()
      Matter.Body.setVelocity (barcos [i].body,{x:-0.5,y:0})
      }else {
        barcos [i]
      }
     
    }
  }else {
    barco = new Barquinhos (width,height - 50,170,170,-70)
    barcos.push (barco)
  }
}
function creeper (index){
  for (var i = 0; i < barcos.length; i = i  +1 ){
    if (dcanhao[index]!==undefined && barcos [i]!== undefined ){
      var batida = Matter.SAT.collides (dcanhao[index].body,barcos [i].body)
      if (batida.collided) {
        barcos [i].remove (i)
        Matter.World.remove (world,dcanhao [index].body)
        delete dcanhao [index]
      }
    }

  } 
}
