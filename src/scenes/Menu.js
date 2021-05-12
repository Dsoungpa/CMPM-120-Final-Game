class Menu extends Phaser.Scene {
    constructor(){
        super('menuScene');
    }

    preload(){

    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(500, 500, 'SEA TOWER', menuConfig).setOrigin(0.5);
        console.log("In Menu Scene");
    }

    update(){

    }
}