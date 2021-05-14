class Tutorial extends Phaser.Scene {
    constructor(){
        super('tutorialScene');
    }

    
    preload(){
        this.load.image('dart', './assets/img/Dart.png');
    }

    create(){
        console.log("in Tutorial");
        this.physics.world.gravity.y = -10;

        up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        this.p2 = this.physics.add.sprite(100, 500, 'dart', 0); 
        this.p2.body.collideWorldBounds = true;  

    }
    
    update(){


        // movement from https://www.html5gamedevs.com/topic/7774-apply-force-to-sprite/

        if(Phaser.Input.Keyboard.JustDown(right)){
            console.log(Math.cos(0) * 100)
            this.p2.body.velocity.x = Math.cos(0) * 100;
        }

        if(Phaser.Input.Keyboard.JustDown(left)){
            this.p2.body.velocity.x = Math.cos(180) * 100;
        }

        if(Phaser.Input.Keyboard.JustDown(up)){
            this.p2.body.velocity.y = Math.cos(90) * 100;
        }

        if(Phaser.Input.Keyboard.JustDown(down)){
            this.p2.body.velocity.y = Math.cos(0) * 100;
        }



    }
}