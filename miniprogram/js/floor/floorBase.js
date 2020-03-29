import {
  Phaser
} from "../libs/phaser-split";

export default class FloorBase extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);

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

    // if out of bound kill the floor
    if (this.position.y < 0){
      this.kill()
    }
  }
}