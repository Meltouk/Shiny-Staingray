class GameOver extends Phaser.Scene{

    constructor(){
        super("GameOver");
    }

create(data){

let ancho = this.scale.width;
let alto = this.scale.height;

this.add.image(ancho / 2, alto / 2,"fondo")
.setDisplaySize(this.scale.width,this.scale.height);

this.add.text(ancho / 2, alto * 0.40,"Perdiste 😢",{
    fontFamily: "BubbleBobble",
    fontSize: "48px",
    color: "#ffffff",
    stroke: "#dc00f4",
    strokeThickness: 8
}).setOrigin(0.5);


this.add.text(ancho / 2, alto * 0.50,"Puntos: " + data.puntos,{ 
    fontSize:"30px",
    fill:"#ffffff",
        fontStyle: "bold",
        stroke: "#f400e8",
        strokeThickness: 6,
    backgroundColor: "rgba(40, 234, 234, 0.5)"
}).setOrigin(0.5);

this.add.text(ancho / 2, alto * 0.58,"Revive aquí a la mantarraya💜",{
    fontSize:"20px",
    fill:"#ffffff",
        fontStyle: "bold",
        stroke: "#bfa4ff",
        strokeThickness: 6,
        backgroundColor: "rgba(255, 255, 255, 0.5)"
}).setOrigin(0.5);

this.input.once("pointerdown",()=>{   
         this.scene.start("Juego");
        });
    }
}