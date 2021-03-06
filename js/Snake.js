const UP = "up";
const DOWN = "down";
const LEFT = "left";
const RIGHT = "right";

/**
 * This class handles the logic by which the snake operates in-game.
 * The movement of the snake, its growth upon eating food, and its status (living or dead)
 * are all governed by the methods herein.
 **/
let Snake = new Phaser.Class({
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
  //These methods allow the snake to change direction, while ensuring that it cannot double back on itself.//
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
     **/
    switch (this.heading) {
      case LEFT:
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 33);
        break;

      case RIGHT:
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 33);
        break;

      case UP:
        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 25);
        break;

      case DOWN:
        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 25);
        break;
    }

    this.direction = this.heading;

    //Updates the body segments and place the last coordinate into this.tail.
    Phaser.Actions.ShiftPosition(
      this.body.getChildren(),
      this.headPosition.x * 20,
      this.headPosition.y * 20,
      1,
      this.tail
    );

    //Check to see if any of the body pieces have the same x/y as the head.
    //If they do, the head ran into the body.

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
      //Updates the timer for the next movement.
      this.moveTime = time + this.speed;
      return true;
    }
  },
  //This method checks the type of the food, and grows the snake's body accordingly.
  grow: function (food) {
    let growthFactor;
    let newPart;
    if (food.texture.key == "candy" || food.texture.key == "flower") {
      growthFactor = 1;
      for (i = 0; i < growthFactor; i++) {
        newPart = this.body.create(this.tail.x, this.tail.y, "body");
        newPart.setOrigin(0);
      }
    } else if (food.texture.key == "fruit") {
      growthFactor = 5;
      for (i = 0; i < growthFactor; i++) {
        newPart = this.body.create(this.tail.x, this.tail.y, "body");
        newPart.setOrigin(0);
      }
    }
  },
  //This method checks to see if the snake has eaten food.
  //If so, the snake grows and the score is increased in accordance with
  //the type of the food.
  collideWithFood: function (food) {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.grow(food);
      food.eat();
      //For every 5 items of food eaten, increases the snake's speed slightly.
      if (this.speed > 20 && food.total % 5 === 0) {
        this.speed += 15;
      }
      return true;
    } else {
      return false;
    }
  },

  updateGrid: function (grid) {
    //This method removes all body pieces from valid positions list.
    this.body.children.each(function (segment) {
      let bx = segment.x / 20;
      let by = segment.y / 20;

      grid[by][bx] = false;
    });
    return grid;
  },
});
