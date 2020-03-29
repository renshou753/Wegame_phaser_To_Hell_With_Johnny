import FloorBase from "./floorBase";

export default class FloorRight extends FloorBase {
  constructor(game, x, y) {
    super(game, x, y, "floorLeft");
  }

  hitFloor(pler){
    pler.x += 1.5;
  }
}
