class Menu extends Phaser.Scene {
    constructor(){
        super('menuScene');
    }

    preload(){
        this.load.image('dart', './assets/img/Dart.png');
    }

    create(){
        this.physics.world.gravity.y = -10;

        // let group = this.physics.add.group({
        //     defaultKey: 'dart',
        //     bounceY: 0.25,
        //     collideWorldBounds: true
        // });
        up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        // let p1 = group.create(320, 400).setGravity(0, 0);    
        this.p2 = this.physics.add.sprite(100, 500, 'dart', 0); 
        this.p2.body.collideWorldBounds = true;  

        //group.create(500, 500).setGravity(0, 100);
    }
    
    update(){

        if(Phaser.Input.Keyboard.JustDown(right)){
            //this.p2.x +=50;
            this.p2.applyForce(50);
            //blah
        }
    }
}