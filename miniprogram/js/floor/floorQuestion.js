import FloorBase from "./floorBase";

export default class FloorQuestion extends FloorBase {
  constructor(game, x, y) {
    super(game, x, y, "floorNormal");
  }
}