class Tutorial extends Phaser.Scene {
    constructor(){
        super('tutorialScene');
    }

    
    preload(){
        this.load.image('dart', './assets/img/Dart.png');
        this.load.image('tileset', './assets/img/underwatertm.png');
        this.load.tilemapTiledJSON('tilemap', './assets/img/tutorialmap.json');
        this.load.atlas('player', './assets/img/DiverSprite.png', './assets/img/DiverSprite.json');
    }

    create(){
        //map render
        const map = this.add.tilemap('tilemap');
        const tileset = map.addTilesetImage('underwater', 'tileset');

        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const terrainLayer = map.createLayer('Collidable', tileset, 0, 0);
        const extras = map.createLayer('Extra', tileset, 0, 0);

        terrainLayer.setCollisionByProperty({
            Collision: true
        });

        console.log("in Tutorial");
        this.physics.world.gravity.y = -10;

        up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //this.p2 = this.physics.add.sprite(100, 300, 'dart', 0); 
        this.p2 = this.physics.add.sprite(100, 300, 'player', 0);
        this.p2.body.collideWorldBounds = true;  

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.p2, true, 0.3, 0.3);

        //physics
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(this.p2, terrainLayer);

        //animation
        var frameNames = this.textures.get('player').getFrameNames();
        console.log(frameNames);
        this.anims.create({
            key: 'swimLeft',
            frames: [{
                key: "player",
                frame: "Diver 0.aseprite"
                }, {
                key: "player",
                frame: "Diver 1.aseprite"
                }, {
                key: "player",
                frame: "Diver 2.aseprite"
                }, {
                key: "player",
                frame: "Diver 3.aseprite"
                }, {
                key: "player",
                frame: "Diver 4.aseprite"
                }, {
                key: "player",
                frame: "Diver 5.aseprite"
                }, {
                key: "player",
                frame: "Diver 6.aseprite"
                }, {
                key: "player",
                frame: "Diver 7.aseprite"
            }],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'swimRight',
            frames: [{
                key: "player",
                frame: "Diver 8.aseprite"
                }, {
                key: "player",
                frame: "Diver 9.aseprite"
                }, {
                key: "player",
                frame: "Diver 10.aseprite"
                }, {
                key: "player",
                frame: "Diver 11.aseprite"
                }, {
                key: "player",
                frame: "Diver 12.aseprite"
                }, {
                key: "player",
                frame: "Diver 13.aseprite"
                }, {
                key: "player",
                frame: "Diver 14.aseprite"
                }, {
                key: "player",
                frame: "Diver 15.aseprite"
            }],
            frameRate: 10,
            repeat: -1
        });

        this.p2.play("swimLeft");
    }
    
    update(){


        // movement from https://www.html5gamedevs.com/topic/7774-apply-force-to-sprite/

        if(Phaser.Input.Keyboard.JustDown(right)){
            console.log(Math.cos(0) * 100)
            this.p2.body.velocity.x = Math.cos(0) * 100;
            this.p2.play("swimRight");
        }

        if(Phaser.Input.Keyboard.JustDown(left)){
            this.p2.body.velocity.x = Math.cos(180) * 100;
            this.p2.play("swimLeft");
        }

        if(Phaser.Input.Keyboard.JustDown(up)){
            this.p2.body.velocity.y = Math.cos(90) * 100;
        }

        if(Phaser.Input.Keyboard.JustDown(down)){
            this.p2.body.velocity.y = Math.cos(0) * 100;
        }



    }
}