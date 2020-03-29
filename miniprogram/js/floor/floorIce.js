import FloorBase from "./floorBase";

export default class FloorIce extends FloorBase {
  constructor(game, x, y) {
    super(game, x, y, "floorIce");
    this.ctrlIndex = 0
    this.animations.add('ice', [0, 1], 1.5, true);
  }

  hitFloor(pler){
    this.ctrlIndex += 1;
    if (this.ctrlIndex >= 40) {
      this.kill();
      return;
    } else{
      this.animations.play('ice');
    }
  }
}