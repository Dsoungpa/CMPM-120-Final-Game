class Menu extends Phaser.Scene {
    constructor(){
        super('menuScene');
    }

    preload(){

    }

    create(){
        let menuConfig = {
            fontFamily: 'Roboto',
            fontSize: '28px',
            backgroundColor: '#189AB4',
            color: '#05445E',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(300, 500, 'SEA TOWER', menuConfig).setOrigin(0.5);
        console.log("In Menu Scene");
    }

    update(){

    }
}