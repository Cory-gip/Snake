let Food = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Food(scene, x, y) {
    //Specify the scene to which the food Game Object belongs.//
    Phaser.GameObjects.Image.call(this, scene);

    //Specify the texture and the position of the food when the game first loads.//
    this.setType();
    this.setPosition(x * 20, y * 20);
    this.setOrigin(0);

    scene.children.add(this);
  },
  //When the food is eaten, the type of food is checked, and the total is increased accordingly.
  //Then, the type of the newly spawning food is randomized.
  eat: function () {
    let type = this.texture.key;
    if (type == "flower" || type == "fruit") {
      total++;
      totalText.text = total;
    } else if (type == "candy") {
      total += 5;
      totalText.text = total;
    }
    this.setType();
  },

  //This function randomly assigns one of three textures to the food.
  setType: function () {
    let flower = 0;
    let fruit = 1;
    let candy = 2;
    let foodType = Math.floor(Math.random() * 3);
    if (foodType == flower) {
      this.setTexture("flower");
    } else if (foodType == fruit) {
      this.setTexture("fruit");
    } else if (foodType == candy) {
      this.setTexture("candy");
    }
  },
});
