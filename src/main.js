let config = {
    type: Phaser.CANVAS,
    width: 384,
    height: 500,
    
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: -100}
        }
    },
    zoom: 1,
    scene: [Title, Tutorial, Level1, Level2]
}

let health = 100;
let healthDisplay;
let healthConfig = {
    fontFamily: 'Courier',
    fontSize: '16px',
    backgroundColor: '#8DC63F',
    color: '#FFFFFF',
    align: 'right',
    padding:{
        top: 5,
        bottom: 5,
    },
    fixedWidth: 110
}

let endConfig = {
    fontFamily: 'Courier',
    fontSize: '16px',
    backgroundColor: '#8DC63F',
    color: '#FFFFFF',
    align: 'right',
    padding:{
        top: 5,
        bottom: 5,
    },
    fixedWidth: 200
}

let game = new Phaser.Game(config);
let up, down, left, right, pressed;
let keyRIGHT, R;
let backgroundMusic;
let bubbles;
let endDisplay;
let minushealth;
let col = false;