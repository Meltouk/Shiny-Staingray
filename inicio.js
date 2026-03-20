class Inicio extends Phaser.Scene{

constructor(){
super("Inicio");
}

preload(){
    this.load.image("fondo","ShinyFondoChico.png");
    this.load.image("fondo_big","ShinyFondoGrande.png");
    this.load.image("pipe","Pipe.png");
    this.load.image("arena", "piso.png");
    this.load.image("boton_play", "boton.png");


    //musica de fondo
    this.load.audio("Musica", "Musica.mp3");
    // sonido de perrito
    this.load.audio("burbujas", "burbujas.mp3");

    // spritesheet del perro, dimensiones de cada frame
    this.load.spritesheet("manta","ShinyStingray.png",{
    frameWidth: 330,
    frameHeight: 250
});
}

create(){

 // frames del perro
this.anims.create({
    key: "volar",
    frames: this.anims.generateFrameNumbers("manta", {start: 0, end: 4}),
    frameRate: 8,
    repeat: -1
});

// fondo
this.add.image(this.scale.width / 2,this.scale.height / 2 ,"fondo")
.setDisplaySize(this.scale.width,this.scale.height);

//titulo
this.titulo = this.add.text(30, 240, "Shiny Stingray", {
    fontFamily: "BubbleBobble",
    fontSize: "48px",
    color: "#ffffff",
    stroke: "#8600f4",
    strokeThickness: 8
});

// animacion de titulo
this.tweens.add({
    targets: this.titulo,
    scale: 1.1,           // Crece un 20%
    duration: 800,
    ease: "Back.easeInOut",
    yoyo: true,
    repeat: -1
});

// boton

    let boton = this.add.text(
        this.scale.width / 2,
        this.scale.height / 2.5 + 80,
        "Play",
            {
                fontSize: "25px",
                color: "#ab00f4",
                backgroundColor: "#b68dce",
                stroke: "#ffffff",
                fontStyle: "bold",
                strokeThickness: 3,
                padding: { x: 30, y: 10 }
            }
        ).setOrigin(0.5);

        boton.setInteractive();
        boton.on("pointerdown", () => {
            this.scene.start("Juego"); // cambia al juego
        });
    }
}