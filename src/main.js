let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 960,
    
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: -100}
        }
    },
    scene: [Tutorial, Menu, Level1, Level2]
}

let game = new Phaser.Game(config);
let up, down, left, right, pressed;