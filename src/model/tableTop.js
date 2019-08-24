/**************
 * @tableTop
 *  x: width of the tableTop
 *  y: height of the tableTop
 * @position
 *  x: x axis of current robot position
 *  y: y axis of current robot position
 *  f: facing direction of the robot
 **************/

let tableTop = { x: 5, y: 5 },
  position = { x: 0, y: 0, f: '' };

module.exports = {
  /**************
   * @getTableTop
   *  returns the object of tableTop of x * y
   **************/
  getTableTop: () => {
    return tableTop;
  },

  /**************
   * @updateRobotPosition
   * Sets the x, y and facing direction of the robot position and logs the current position  of the robot
   **************/
  updateRobotPosition: (xVal, yVal, facing) => {
    position.x = xVal;
    position.y = yVal;
    position.f = facing;
    console.log(' Current position: ', position);
    return position;
  },

  /**************
   * @getRobotPosition
   * @return the current position of the robot
   * **************/
  getRobotPosition: () => {
    return position;
  }
};
