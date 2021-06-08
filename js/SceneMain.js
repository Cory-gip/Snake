let total = 0;
let totalText;

let snake;
let food;
let food_2;
let cursors;

/**
 * This class handles the running of the game of Snake.
 * The methods herein manage the frame-by-frame calculations
 * which allow the snake, the food, and the score to update and respond to user input.
 **/
class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  //This method preloads the images which will be used during the game.//
  preload() {
    this.load.image("flower", "images/flower.png");
    this.load.image("body", "images/body.png");
    this.load.image("candy", "images/candy.png");
    this.load.image("fruit", "images/fruit.png");
  }
  //This method renders the score, the snake, and the food to the window when the game loads.//
  create() {
    this.add.text(30, 20, "SCORE:", {
      font: "bold 12px sans-serif",
      fill: "#bfcc00",
      align: "center",
    });

    totalText = this.add.text(80, 19, total, {
      font: "bold 14px sans-serif",
      fill: "#bfcc00",
      align: "center",
    });

     food = new Food(this, 3, 4);
     food_2 = new Food(this, 12, 5);

     snake = new Snake(this, 8, 8);

    //This creates the keyboard controls.
     cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    //Ends the game if the snake is no longer alive.
    if (!snake.alive) {
      return;
    }

    /**
     * Check which key is pressed, and then change the direction the snake
     * is heading based on that. The checks ensure the user does not double-back
     * on their self. For example, if the user is moving to the right and presses
     * the LEFT cursor, it is ignored, because the only valid directions which
     * can be moved in at that time are up and down.
     */
    if (cursors.left.isDown) {
      snake.faceLeft();
    } else if (cursors.right.isDown) {
      snake.faceRight();
    } else if (cursors.up.isDown) {
      snake.faceUp();
    } else if (cursors.down.isDown) {
      snake.faceDown();
    }

    if (snake.update(time)) {
      //If the snake updated, check for collision against food.
      if (snake.collideWithFood(food) || snake.collideWithFood(food_2)) {
        repositionFood();
      }
    }
    /**
     * The food may be placed anywhere on the 33x25 grid,
     * except on-top of the snake, so those squares need
     * to be filtered out of the possible food locations.
     * @method repositionFood
     * @return {boolean} true if the food was placed, otherwise false.
     */

    function repositionFood() {
      //First create an array that assumes all positions
      //are valid for the new piece of food.

      //This grid will be used to reposition the food each time it is eaten.
      let testGrid = [];

      for (let y = 0; y < 25; y++) {
        testGrid[y] = [];
        for (let x = 0; x < 33; x++) {
          testGrid[y][x] = true;
        }
      }
      //Sets any positions on the grid that are occupied by the body of the snake to false.
      snake.updateGrid(testGrid);

      //Every position on the grid that is not occupied will be added to this array.
      let validLocations = [];

      for (let y = 0; y < 25; y++) {
        for (let x = 0; x < 33; x++) {
          if (testGrid[y][x] === true) {
            //Every valid x/y position will be pushed into the array of valid locations.
            validLocations.push({ x: x, y: y });
          }
        }
      }

      if (validLocations.length > 0) {
        //This uses the RNG to pick a random position from the array of valid locations.
        let pos = Phaser.Math.RND.pick(validLocations);
        validLocations.pop({ x: pos.x, y: pos.y });
        let pos_2 = Phaser.Math.RND.pick(validLocations);
        validLocations.pop({ x: pos_2.x, y: pos_2.y });

        //Place the food at whatever coordinate was picked from array of valid locations.
        food.setPosition(pos.x * 20, pos.y * 20);
        food_2.setPosition(pos_2.x * 20, pos_2.y * 20);

        return true;
      } else {
        return false;
      }
    }
  }
}
