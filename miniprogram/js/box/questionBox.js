import {
  Phaser
} from "../libs/phaser-split";

export default class QuestionBox extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'box');

    // enable physics and set immovable
    game.physics.arcade.enable(this);
    this.body.immovable = true;

    // track whether this floor has been touched
    this.touched = false
  }

  // 每一帧更新位置
  update() {
    this.body.velocity.y -= 1;
    this.body.gravity.y = 0

    // if out of bound or touched by player kill the floor
    if (this.position.y < 0 || this.touched === true){
      this.kill()
    }
  }
}