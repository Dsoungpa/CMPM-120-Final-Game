let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 960,
    scene: [Menu, Tutorial, Level1, Level2]
}

let game = new Phaser.Game(config);