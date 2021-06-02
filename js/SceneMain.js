const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

let snake;
let food;
let cursors;

let total = 0;
let totalText;

class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  preload() {
    this.load.image("food", "images/food.png");
    this.load.image("body", "images/body.png");
  }
  create() {
    this.add.text(30, 20, "SCORE:", {
      font: "bold 12px sans-serif",
      fill: "#46c0f9",
      align: "center",
    });

    totalText = this.add.text(80, 19, total, {
      font: "bold 14px sans-serif",
      fill: "#46c0f9",
      align: "center",
    });

    let Food = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,

      initialize: function Food(scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);

        this.setTexture("food");
        this.setPosition(x * 20, y * 20);
        this.setOrigin(0);

        scene.children.add(this);
      },

      eat: function () {
        total++;
        totalText.text = total;
      },
    });

    var Snake = new Phaser.Class({
      initialize: function Snake(scene, x, y) {
        this.headPosition = new Phaser.Geom.Point(x, y);

        this.body = scene.add.group();

        this.head = this.body.create(x * 20, y * 20, "body");
        this.head.setOrigin(0);

        this.alive = true;

        this.speed = 100;

        this.moveTime = 0;

        this.tail = new Phaser.Geom.Point(x, y);

        this.heading = RIGHT;
        this.direction = RIGHT;
      },

      update: function (time) {
        if (time >= this.moveTime) {
          return this.move(time);
        }
      },

      faceLeft: function () {
        if (this.direction === UP || this.direction === DOWN) {
          this.heading = LEFT;
        }
      },

      faceRight: function () {
        if (this.direction === UP || this.direction === DOWN) {
          this.heading = RIGHT;
        }
      },

      faceUp: function () {
        if (this.direction === LEFT || this.direction === RIGHT) {
          this.heading = UP;
        }
      },

      faceDown: function () {
        if (this.direction === LEFT || this.direction === RIGHT) {
          this.heading = DOWN;
        }
      },

      move: function (time) {
        /**
         * Based on the heading property (which is the direction the pgroup pressed),
         * updates the headPosition value accordingly.
         *
         * The Math.wrap call allows the snake to wrap around the screen, so when
         * it goes off any of the sides it re-appears on the other.
         */
        switch (this.heading) {
          case LEFT:
            this.headPosition.x = Phaser.Math.Wrap(
              this.headPosition.x - 1,
              0,
              33
            );
            break;

          case RIGHT:
            this.headPosition.x = Phaser.Math.Wrap(
              this.headPosition.x + 1,
              0,
              33
            );
            break;

          case UP:
            this.headPosition.y = Phaser.Math.Wrap(
              this.headPosition.y - 1,
              0,
              25
            );
            break;

          case DOWN:
            this.headPosition.y = Phaser.Math.Wrap(
              this.headPosition.y + 1,
              0,
              25
            );
            break;
        }

        this.direction = this.heading;

        //  Updates the body segments and place the last coordinate into this.tail.
        Phaser.Actions.ShiftPosition(
          this.body.getChildren(),
          this.headPosition.x * 20,
          this.headPosition.y * 20,
          1,
          this.tail
        );

        //  Checks to see if any of the body pieces have the same x/y as the head.
        //  If they do, the head ran into the body.

        let hitBody = Phaser.Actions.GetFirst(
          this.body.getChildren(),
          { x: this.head.x, y: this.head.y },
          1
        );

        if (hitBody) {
          console.log("dead");

          this.alive = false;

          return false;
        } else {
          //  Updates the timer for the next movement.
          this.moveTime = time + this.speed;

          return true;
        }
      },

      grow: function () {
        let newPart = this.body.create(this.tail.x, this.tail.y, "body");

        newPart.setOrigin(0);
      },

      collideWithFood: function (food) {
        if (this.head.x === food.x && this.head.y === food.y) {
          this.grow();

          food.eat();

          //  For every 5 items of food eaten, increases the snake's speed slightly.
          if (this.speed > 20 && food.total % 5 === 0) {
            this.speed += 15;
          }

          return true;
        } else {
          return false;
        }
      },

      updateGrid: function (grid) {
        //  Removes all body pieces from valid positions list
        this.body.children.each(function (segment) {
          let bx = segment.x / 20;
          let by = segment.y / 20;

          grid[by][bx] = false;
        });

        return grid;
      },
    });

    food = new Food(this, 3, 4);

    snake = new Snake(this, 8, 8);

    //  Create the keyboard controls.
    cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
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
      //  If the snake updated, check for collision against food.

      if (snake.collideWithFood(food)) {
        repositionFood();
      }
    }
    /**
     * The food may be placed anywhere on the 33x25 grid,
     * except on-top of the snake, so those squares need
     * to be filtered out of the possible food locations.
     *
     * @method repositionFood
     * @return {boolean} true if the food was placed, otherwise false.
     */

    function repositionFood() {
      //  First create an array that assumes all positions
      //  are valid for the new piece of food.

      //  A Grid used to reposition the food each time it's eaten.
      let testGrid = [];

      for (let y = 0; y < 25; y++) {
        testGrid[y] = [];

        for (let x = 0; x < 33; x++) {
          testGrid[y][x] = true;
        }
      }

      snake.updateGrid(testGrid);

      //  Purge out false positions.
      let validLocations = [];

      for (let y = 0; y < 25; y++) {
        for (let x = 0; x < 33; x++) {
          if (testGrid[y][x] === true) {
            //  If this position is valid for food, food will be placed here.
            validLocations.push({ x: x, y: y });
          }
        }
      }

      if (validLocations.length > 0) {
        //  This uses the RNG to pick a random food position.
        let pos = Phaser.Math.RND.pick(validLocations);

        //  Place the food at a coordinate on testGrid.
        food.setPosition(pos.x * 20, pos.y * 20);

        return true;
      } else {
        return false;
      }
    }
  }
}
