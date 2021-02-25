export let Direction;

(function (Direction) {
  Direction["UP"] = "up";
  Direction["RIGHT"] = "right";
  Direction["DOWN"] = "down";
  Direction["LEFT"] = "left";
  Direction["BACKWARD"] = "backward";
  Direction["FORWARD"] = "forward";
})(Direction || (Direction = {}));

export function isBackward(dir) {
  return [Direction.UP, Direction.LEFT, Direction.BACKWARD].indexOf(dir) !== -1;
}
export function isForward(dir) {
  return [Direction.RIGHT, Direction.DOWN, Direction.FORWARD].indexOf(dir) !== -1;
}