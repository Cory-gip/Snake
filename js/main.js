/**
 * This function sets up the window in which the game of Snake runs.
 * The scene property of config allows it to pass the SceneMain.js file
 * into the Phaser game, which in turn runs the game inside the created window.
 **/
window.onload = function () {
  let config = {
    type: Phaser.AUTO,
    width: 660,
    height: 500,
    backgroundColor: "#46c0f9",
    parent: "phaser-game",
    scene: [SceneMain],
  };

  let game = new Phaser.Game(config);
};
