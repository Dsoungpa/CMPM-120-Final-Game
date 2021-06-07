class Level1 extends Phaser.Scene {
    constructor(){
        super('level1Scene');
    }

    
    preload(){
        this.load.spritesheet('geyser', './assets/img/BubbleAnimation.png', {frameWidth: 120, frameHeight: 24, startFrame: 0, endFrame: 8});
        this.load.image('dart', './assets/img/Dart.png');
        this.load.image('tileset', './assets/img/underwatertm.png');
        this.load.image('bubble' , './assets/img/Bubble.png');
        this.load.tilemapTiledJSON('tilemap2', './assets/img/level1map.json');
        this.load.atlas('player', './assets/img/DiverSprite.png', './assets/img/DiverSprite.json');
        this.load.image('restart', './assets/img/RestartText.png');
        this.load.image('geyserCol', './assets/img/GeyserCol.png');
        this.load.audio('bubbles', './assets/audio/bubbles.mp3');
        // this.load.image('fin', './assets/img/GameOver.png');
        // this.load.image('fin2', './assets/img/WonGame.png');
    }

    create(){

        won = this.add.image(0, 0, 'fin2').setOrigin(0, 0);
        lost = this.add.image(0, 0, 'fin').setOrigin(0, 0);

        //map render
        const map = this.add.tilemap('tilemap2');
        const tileset = map.addTilesetImage('underwater', 'tileset');
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const wall = map.createLayer('CastleWall', tileset, 0, 0);
        const t1 = map.createLayer('CastleTop', tileset, 0, 0);
        const t2 = map.createLayer('CastleFloor', tileset, 0, 0);
        const t3 = map.createLayer('CastleSides', tileset, 0, 0);

        const extras = map.createLayer('Extra', tileset, 0, 0);

        const chest = map.createLayer('Chest', tileset, 0, 0);

        t1.setCollisionByProperty({
            Collision: true
        });
        t2.setCollisionByProperty({
            Collision: true
        });
        t3.setCollisionByProperty({
            Collision: true
        });
        chest.setCollisionByProperty({
            Collision: true
        });

        //geysers
            //config
            var config2 = {
                key: 'geyserAnim',
                frames: this.anims.generateFrameNumbers('geyser', { start: 0, end: 8, first: 0 }),
                frameRate: 8,
                repeat: -1
            };

            //spawn
            this.anims.create(config2);
                //leftgeyser
                var g1 = this.add.sprite(90, 680, 'geyser').play('geyserAnim');
                var g2 = this.add.sprite(90, 1736, 'geyser').play('geyserAnim');
                //rightgeyser
                var g4 = this.add.sprite(300, 504, 'geyser').play('geyserAnim');
                g4.scale *= -1;
                var g5 = this.add.sprite(700, 1464, 'geyser').play('geyserAnim');
                g5.scale *= -1;
                var g6 = this.add.sprite(300, 1824, 'geyser').play('geyserAnim');
                g6.scale *= -1;

        //Health Display
        //healthDisplay = this.add.text(260, 15, "Health: " + health, healthConfig).setScrollFactor(0);
        
        minushealth = setInterval(mhealth, 1000);

        function mhealth(){
            //console.log("In here");
            if(health > 0){
                health-= 0;
            }
            //healthDisplay.text = "Health:  " + health;
        }

        console.log("in level1");
        this.physics.world.gravity.y = -10;

        // player movement

        up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // player physics
        this.p2 = this.physics.add.sprite(100, 300, 'player', 0);
        this.p2.body.collideWorldBounds = true;    

        //BUBBLES
        this.b1 = this.add.sprite(240, 330, 'bubble', 0);
        //this.bubble1.alpha = 0;
        this.b2 = this.add.sprite(130, 820, 'bubble', 0);
        this.b3 = this.add.sprite(655, 1140, 'bubble', 0);
        this.b4 = this.add.sprite(352, 1416, 'bubble', 0);
        this.b5 = this.add.sprite(175, 1925, 'bubble', 0);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.p2, true, 0.3, 0.3);

        // BOUNCE BUBBLE
        this.bb1 = this.add.sprite(90, 680, 'geyserCol', 0);
        this.bb2 = this.add.sprite(90, 1736, 'geyserCol', 0);
        this.bb4 = this.add.sprite(300, 504, 'geyserCol', 0);
        this.bb5 = this.add.sprite(700, 1464, 'geyserCol', 0);
        this.bb6 = this.add.sprite(300, 1824, 'geyserCol', 0);

            //alpha
            this.bb1.alpha = 0;
            this.bb2.alpha = 0;
            this.bb4.alpha = 0;
            this.bb5.alpha = 0;
            this.bb6.alpha = 0;

        //physics
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(this.p2, t1);
        this.physics.add.collider(this.p2, t2);
        this.physics.add.collider(this.p2, t3);

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
                frame: "DiverFinal 0.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 1.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 2.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 3.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 4.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 5.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 6.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 7.aseprite"
            }],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'swimRight',
            frames: [{
                key: "player",
                frame: "DiverFinal 8.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 9.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 10.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 11.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 12.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 13.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 14.aseprite"
                }, {
                key: "player",
                frame: "DiverFinal 15.aseprite"
            }],
            frameRate: 10,
            repeat: -1
        });

        this.p2.play("swimLeft");

        R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //this.restartText = this.add.tileSprite(0, 0, 384, 500, 'restart').setOrigin(0, 0);
        backgroundMusic 
        bubbles = this.sound.add('bubbles', {volume: 0.02});
        bubbles.loop = true;
        bubbles.play();

        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        this.makeBar(97, 57, 0x061e2f, 206, 14).setScrollFactor(0);
        healthBar = this.makeBar(100, 60, 0x3aafff, 200, 8).setScrollFactor(0);
        
        //this.setValue(healthBar,100);
        healthBar.scaleX = health/100;
    }

    makeBar(x, y,color, a, b) {
        //draw the bar
        let bar = this.add.graphics();

        //color the bar
        bar.fillStyle(color, 1);

        //fill the bar with a rectangle
        bar.fillRect(0, 0, a, b);
        
        //position the bar
        bar.x = x;
        bar.y = y;

        //return the bar
        return bar;
    }
    
    update(){

        if (Phaser.Input.Keyboard.JustDown(keyT)) {
            this.scene.start('titleScene'); 
        }

        console.log(this.p2.x, " : ", this.p2.y);
        healthBar.scaleX = health/100;
        // health game conditions
        let gameOver = false;
        let movement = true;
        if(health == 0){
            gameOver = true;
            movement = false;
            this.p2.body.velocity.x = 0;
            this.p2.body.velocity.y = 0;
            health = 0;
            this.game.sound.stopAll();
            this.add.image(0, 0, 'fin').setOrigin(0, 0);
            clearInterval(minushealth);
            if (Phaser.Input.Keyboard.JustDown(R)) {
                health = 100;
                this.scene.restart();
            }
            if (Phaser.Input.Keyboard.JustDown(keyT)) {
                health = 100;
                this.scene.start("titleScene");
            }
        }
        // chest collision check
        if (col){
            col = false;
            this.game.sound.stopAll();
            this.add.image(0, 0, 'fin2').setOrigin(0, 0);
            clearInterval(minushealth);
        }
        // bubble restoration
        if(this.checkCollision(this.p2, this.b1) || 
        this.checkCollision(this.p2, this.b2) ||
        this.checkCollision(this.p2, this.b3) ||
        this.checkCollision(this.p2, this.b4) ||
        this.checkCollision(this.p2, this.b5)){
            health = 100;
        }

        this.bubblebounceCollision(this.p2, this.bb1);
        this.bubblebounceCollision(this.p2, this.bb2);
        this.bubblebounceCollision(this.p2, this.bb4);
        this.bubblebounceCollision(this.p2, this.bb5);
        this.bubblebounceCollision(this.p2, this.bb6);
        

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

    bubblebounceCollision(player, bouncebubble){
        // bounce bubble
        if(this.checkCollision(this.p2, bouncebubble)){

            //moves them left(when moving right)
            if (this.p2.body.velocity.y == 0 && this.p2.body.velocity.x == Math.cos(0) * 100){
                this.p2.body.velocity.x = Math.cos(180) * 110;
                this.p2.play("swimRight");
                console.log("moving right")
            }

            // moves them right(when moving left)
            else if (this.p2.body.velocity.y == 0 && this.p2.body.velocity.x == Math.cos(180) * 100){
                this.p2.body.velocity.x = Math.cos(0) * 110;
                this.p2.play("swimLeft");
                console.log("moving left")
            }

            // moves them down(when moving up) (3 CONDITIONS)
            else if (this.p2.body.velocity.y < 0 && this.p2.body.velocity.x == 0){
                this.p2.body.velocity.y = Math.cos(0) * 110;
                console.log("moving down")
            }
            
            else if (this.p2.body.velocity.y < 0 && this.p2.body.velocity.x == Math.cos(0) * 100){ //Math.cos(0)*100 = 100
                //this.p2.body.velocity.y = Math.cos(0) * 110;
                //this.p2.body.velocity.x = Math.cos(180) * 110;
                this.p2.body.velocity.y = -(this.p2.body.velocity.y);
                this.p2.body.velocity.x = -(this.p2.body.velocity.x);
                console.log("moving down/left")
            }

            else if (this.p2.body.velocity.y < 0 && this.p2.body.velocity.x == Math.cos(180) * 100){
                //this.p2.body.velocity.y = Math.cos(0) * 110;
                //this.p2.body.velocity.x = Math.cos(0) * 110;
                this.p2.body.velocity.y = -(this.p2.body.velocity.y);
                this.p2.body.velocity.x = -(this.p2.body.velocity.x);
                
                console.log("moving down/right")
            }

            // moves them up(when moving down) ( 3 CONDITIONS)
            
            else if (this.p2.body.velocity.y > 0 && this.p2.body.velocity.x == 0){
                this.p2.body.velocity.y = Math.cos(90) * 110;
                console.log("moving UP")
            }
            
            else if (this.p2.body.velocity.y > 0 && this.p2.body.velocity.x == Math.cos(0) * 100){
                this.p2.body.velocity.y = -(this.p2.body.velocity.y);
                this.p2.body.velocity.x = -(this.p2.body.velocity.x);
                console.log("moving UP/left")
            }

            else if (this.p2.body.velocity.y > 0 && this.p2.body.velocity.x == Math.cos(180) * 100){
                this.p2.body.velocity.y = -(this.p2.body.velocity.y);
                this.p2.body.velocity.x = -(this.p2.body.velocity.x);
                console.log("moving UP/right")
            } 
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