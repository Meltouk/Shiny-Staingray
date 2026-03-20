class Juego extends Phaser.Scene {

constructor(){
    super("Juego");
}

create(){

    // pantalla 
    this.ancho = this.scale.width;
    this.alto = this.scale.height; 

    // fondo
  this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, "fondo_big").setOrigin(0, 0);
    let altoImagenFondo = this.textures.get("fondo_big").getSourceImage().height;
    let escalaFondo = this.alto / altoImagenFondo;
    this.fondo.tileScaleX = escalaFondo; 
    this.fondo.tileScaleY = escalaFondo;


    // piso
    this.suelo = this.add.tileSprite(
    this.ancho / 2,
    this.alto - 0.5,   // posición abajo (ajústalo si quieres)
    this.ancho,
    200,              // altura del piso
    "arena");
    this.suelo.setDepth(10); // para que esta encima de todo
   
   //tamano del sprite
    this.manta = this.physics.add.sprite(100, this.alto/2, "manta") .setScale(0.50);

   // gravedad y volar
   this.manta.play("volar");
   this.manta.body.gravity.y = 900;

   this.sonido = this.sound.add("burbujas", {
    volume: 0.5}); // sonido de mantarraya

    // musica de fondo
    this.bgMusic = this.sound.add("Musica", {
    loop: true,
    volume: 0.5
});

this.bgMusic.play();

    // hitbox mantarraya
    this.manta.body.setSize(this.manta.width * 0.6, this.manta.height * 0.6);

    //tubos , grupo creado
    this.pipes = this.physics.add.group();

    // puntuaje
    // puntuaje
    this.puntos = 0;
    this.textoPuntos = this.add.text(20, 20, "0", {
      fontSize: "40px",
      fill: "#fff5c6",
      fontStyle: "bold",
      stroke: "#ff82a6",
      strokeThickness: 6,
    });

    // controles
    this.input.on("pointerdown", this.saltar, this);
    this.input.keyboard.on("keydown-SPACE", this.saltar, this);

    // genera tubos
    this.time.addEvent({
        delay: 2500, // aumente/disminuye el tiempo de creacion de tubos
        callback:this.crearTubos,
        callbackScope:this,
        loop:true
    });

    // collisiones
    this.physics.add.collider(this.manta,this.pipes,this.gameOver,null,this);

    // hitbox
    this.debugGraphics = this.add.graphics();
    this.physics.world.createDebugGraphic();

}

update(){

    this.verificarCaida();
    this.verificarPuntos();
    this.fondo.tilePositionX += 1;
    this.suelo.tilePositionX += 4;
    this.manta.x = 100;

}

// salto
saltar(){
    this.manta.setVelocityY(-350);
}

// verificar caida
verificarCaida(){

    if(this.manta.y > this.alto){
        this.gameOver();
    }

}


// contador puntos
verificarPuntos(){

    this.pipes.getChildren().forEach(pipe=>{

        if(pipe.getData("tipo") == "arriba"){

            if(pipe.x < this.manta.x && !pipe.getData("pasado")){

                pipe.setData("pasado",true);
                this.puntos++;
                this.textoPuntos.setText(this.puntos);

                this.sonido.play({ volume: 0.5 });
            }
        }
    });
    this.debugGraphics.clear();
    this.physics.world.drawDebug = true;
}

//  tubos creado
crearTubos(){

    let espacio = 200; //Aumenta o disminuye el espacio entre los tubos
    let posicion = Phaser.Math.Between(this.alto * 0.3, this.alto * 0.7);

    // tubo arriba
    let arriba = this.pipes.create(this.ancho, posicion-espacio,"pipe");

    arriba.setFlipY(true);

    arriba.setOrigin(0,1);
    arriba.body.allowGravity = false;
    arriba.setVelocityX(-200);

    arriba.setData("tipo","arriba");
    arriba.setData("pasado",false);


    // ajusta el tamaño de la colision tubo arriba
    arriba.body.setSize(arriba.width * 0.8, arriba.height);
    arriba.body.setOffset(arriba.width * 0.10, 0);



    // tubo abajo
    let abajo = this.pipes.create(this.ancho,posicion,"pipe");


    abajo.setOrigin(0,0);
    abajo.body.allowGravity = false;
    abajo.setVelocityX(-200);

    abajo.setData("tipo","abajo");

    
    // ajusta el tamaño de la colision tubo abajo
    abajo.body.setSize(abajo.width * 0.8, abajo.height);
    abajo.body.setOffset(abajo.width * 0.10, 0);

    this.pipes.getChildren().forEach(pipe=>{
        if(pipe.x < -100){
            pipe.destroy();
        }
    });
}

// gameover scene
gameOver(){
        this.sound.stopByKey("Musica"); 
        this.scene.start("GameOver",{puntos:this.puntos});
    }
}
