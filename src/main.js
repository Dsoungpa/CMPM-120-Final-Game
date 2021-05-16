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

let game = new Phaser.Game(config);
let up, down, left, right, pressed;
let keyRIGHT, R;