import FloorBase from "./floorBase";

export default class FloorLeft extends FloorBase {
  constructor(game, x, y) {
    super(game, x, y, "floorLeft");
    this.frame = 1
  }

  hitFloor(pler){
    pler.x -= 1.5;
  }
}
