class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/audio/KeyboardAudio.wav');
        this.load.image('menuArt', './assets/img/MainMenu.png');
        this.load.audio('bkmusic', './assets/audio/Dylan_Water.mp3');
    }

    create() {

        this.menuArt = this.add.tileSprite(0, 0, 384, 500, 'menuArt').setOrigin(0, 0);

        // menu text configuration
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
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        backgroundMusic = this.sound.add('bkmusic', {volume: 0.0});
        backgroundMusic.loop = true;
        backgroundMusic.play();
    }

    update() {
        // if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //   this.sound.play('sfx_select');
        //   this.scene.start('playScene');    
        // }
        if (Phaser.Input.Keyboard.JustDown(space)) {
            backgroundMusic.volume = 0.08
            this.sound.play('sfx_select');
            this.scene.start('tutorialScene'); 
        }

      }
    }