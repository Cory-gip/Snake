window.onload=function()
{
    let config = {
        type: Phaser.AUTO,
        width: 660,
        height: 500, 
        backgroundColor: '#bfcc00',
        parent: 'phaser-game',
        scene: [SceneMain]
    };

    let game = new Phaser.Game(config);
}