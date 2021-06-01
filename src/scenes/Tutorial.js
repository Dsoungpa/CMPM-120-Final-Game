class Tutorial extends Phaser.Scene {
    constructor(){
        super('tutorialScene');
    }

    
    preload(){
        this.load.image('dart', './assets/img/Dart.png');
        this.load.image('tileset', './assets/img/underwatertm.png');
        this.load.image('bubble' , './assets/img/Bubble.png');
        this.load.tilemapTiledJSON('tilemap', './assets/img/tutorialmap.json');
        this.load.atlas('player', './assets/img/DiverSprite.png', './assets/img/DiverSprite.json');
        this.load.image('restart', './assets/img/RestartText.png');
        this.load.audio('bubbles', './assets/audio/bubbles.mp3');
    }

    create(){

        //map render
        const map = this.add.tilemap('tilemap');
        const tileset = map.addTilesetImage('underwater', 'tileset');

        const bgLayer = map.createLayer('Background', tileset, 0, 0);

        const terrainLayer = map.createLayer('Collidable', tileset, 0, 0);
        const extras = map.createLayer('Extra', tileset, 0, 0);

        const chest = map.createLayer('Chest', tileset, 0, 0);

        terrainLayer.setCollisionByProperty({
            Collision: true
        });

        chest.setCollisionByProperty({
            Collision: true
        });

        //Health Display
        healthDisplay = this.add.text(265, 15, "Health: " + health, healthConfig);

        minushealth = setInterval(mhealth, 1000);

        function mhealth(){
            console.log("In here");
            if(health > 0){
                health-= 10;
            }
            healthDisplay.text = "Health:  " + health;
        }

        console.log("in Tutorial");
        this.physics.world.gravity.y = -10;

        // player movement

        up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // player physics
        this.p2 = this.physics.add.sprite(100, 250, 'player', 0);
        this.p2.body.collideWorldBounds = true;  

        //BUBBLES
        this.bubble1 = this.add.sprite(350, 300, 'bubble', 0);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.p2, true, 0.3, 0.3);

        // BOUNCE BUBBLE
        this.bouncebubble1 = this.add.sprite(250, 200, 'bubble', 0);

        //physics
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(this.p2, terrainLayer);

        // chest collision
        this.physics.add.collider(this.p2, chest, function(p2, chest){
            console.log("Got to Chest!");
            col = true;
        });

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

        R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.restartText = this.add.tileSprite(0, 0, 384, 500, 'restart').setOrigin(0, 0);
        bubbles = this.sound.add('bubbles', {volume: 0.04});
        bubbles.play();
    }
    
    update(){
        // health game conditions

        let gameOver = false;
        let movement = true;
        if(health == 0){
            gameOver = true;
            movement = false;
            this.p2.body.velocity.x = 0;
            this.p2.body.velocity.y = 0;
            health = 0;
            healthDisplay.text = "Health: " + health;
            endDisplay = this.add.text(100, 250, "Press R to Restart!", endConfig);
            //this.scene.pause("tutorialScene");
            this.game.sound.stopAll();
        }
        // chest collision check
        if (col){
            col = false;
            this.scene.start('level1Scene');
        }
        // bubble restoration
        if(this.checkCollision(this.p2, this.bubble1)){
            this.bubble1.destroy();
            health = 100;
            healthDisplay.text = "Health: " + health;
        }

        // bounce bubble
        if(this.checkCollision(this.p2, this.bouncebubble1)){

            //moves them left(when moving right)
            if (this.p2.body.velocity.y == 0 && this.p2.body.velocity.x == Math.cos(0) * 100){
                this.p2.body.velocity.x = Math.cos(180) * 500;
                this.p2.play("swimRight");
                console.log("moving right")
            }

            // moves them right(when moving left)
            else if (this.p2.body.velocity.y == 0 && this.p2.body.velocity.x == Math.cos(180) * 100){
                this.p2.body.velocity.x = Math.cos(0) * 500;
                this.p2.play("swimLeft");
                console.log("moving left")
            }

            // moves them down(when moving up) (3 CONDITIONS)
            else if (this.p2.body.velocity.y < 0 && this.p2.body.velocity.x == 0){
                this.p2.body.velocity.y = Math.cos(0) * 500;
                console.log("moving down")
            }
            
            else if (this.p2.body.velocity.y < 0 && this.p2.body.velocity.x == Math.cos(0) * 100){
                this.p2.body.velocity.y = Math.cos(0) * 500;
                this.p2.body.velocity.x = Math.cos(180) * 500;
                console.log("moving down/left")
            }

            else if (this.p2.body.velocity.y < 0 && this.p2.body.velocity.x == Math.cos(180) * 100){
                this.p2.body.velocity.y = Math.cos(0) * 500;
                this.p2.body.velocity.x = Math.cos(0) * 500;
                
                console.log("moving down/right")
            }

            // moves them up(when moving down) ( 3 CONDITIONS)
            
            else if (this.p2.body.velocity.y > 0 && this.p2.body.velocity.x == 0){
                this.p2.body.velocity.y = Math.cos(90) * 500;
                console.log("moving UP")
            }
            
            else if (this.p2.body.velocity.y > 0 && this.p2.body.velocity.x == Math.cos(0) * 100){
                this.p2.body.velocity.y = Math.cos(90) * 500;
                this.p2.body.velocity.x = Math.cos(180) * 500;
                console.log("moving UP/left")
            }

            else if (this.p2.body.velocity.y > 0 && this.p2.body.velocity.x == Math.cos(180) * 100){
                this.p2.body.velocity.y = Math.cos(90) * 500;
                this.p2.body.velocity.x = Math.cos(0) * 500;
                
                console.log("moving UP/right")
            }
            
            
            
            
        }
        // movement from https://www.html5gamedevs.com/topic/7774-apply-force-to-sprite/

        //console.log("velocity: ", this.p2.body.velocity.y);

        if(movement && Phaser.Input.Keyboard.JustDown(right)){
            this.p2.body.velocity.x = Math.cos(0) * 100;
            this.p2.play("swimRight");
            console.log("velocity(y): ", this.p2.body.velocity.y);
            console.log("velocity(x): ", this.p2.body.velocity.x);
        }

        if(movement && Phaser.Input.Keyboard.JustDown(left)){
            this.p2.body.velocity.x = Math.cos(180) * 100;
            this.p2.play("swimLeft");
            //console.log("velocity(L): ", this.p2.body.velocity.x);
        }

        if(movement && Phaser.Input.Keyboard.JustDown(up)){
            this.p2.body.velocity.y = Math.cos(90) * 100;
            // console.log("velocity(U): ", this.p2.body.velocity.y);
            // console.log("velocity(L): ", this.p2.body.velocity.x);
        }

        if(movement && Phaser.Input.Keyboard.JustDown(down)){
            this.p2.body.velocity.y = Math.cos(0) * 100;
            //console.log("velocity(U): ", this.p2.body.velocity.y);
            //console.log("velocity(L): ", this.p2.body.velocity.x);
        }


        if (gameOver && Phaser.Input.Keyboard.JustDown(R)) {
            console.log("In R");
            backgroundMusic.stop();
            bubbles.stop();
            this.sound.play('sfx_select');
            health = 100;
            endDisplay.destroy();
            clearInterval(minushealth);
            this.scene.restart(); 
            
        }
    }

    checkCollision(player, bubble){
        // simple AABB checking
        if( player.x < bubble.x + bubble.width && 
            player.x + player.width > bubble.x &&
            player.y < bubble.y + bubble.height &&
            player.height + player.y > bubble.y){
                return true
        }
        else{
            return false;
        }
    }
}