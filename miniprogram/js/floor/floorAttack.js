import FloorBase from "./floorBase";

export default class FloorAttack extends FloorBase {
  constructor(game, x, y) {
    super(game, x, y, "floorAttack");
  }

  hitFloor(pler){
    if (this.hit) {
      return;
    }
    this.hit = true;
    go.blood -= 1;
  }
}