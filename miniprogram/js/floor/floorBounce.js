import FloorBase from "./floorBase";

export default class FloorBounce extends FloorBase {
  constructor(game, x, y) {
    super(game, x, y, "floorBounce");
    this.animations.add('bounce', [0, 1], 6, true);
  }

  // 每一帧更新位置
  update() {
    this.body.velocity.y -= 1;

    // if out of bound kill the floor
    if (this.position.y < 0) {
      this.kill()
    }

    if (this.touched === true) {
      this.animations.play('bounce');
    }
  }

  hitFloor(pler){
    pler.y -= 15
  }
}