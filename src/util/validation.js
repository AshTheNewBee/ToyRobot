const {
    PLACE,
    MOVE,
    ROTATE,
    REPORT,
    NORTH,
    SOUTH,
    EAST,
    WEST
  } = require('../../src/util/consts');
  const tableTop = require('../../src/model/tableTop');
  
  module.exports = {
    /**************
     * @isValidDirection
     * Check if the given direction is a valid direction
     * @return
     *  if the given dircetion is valid returns true
     *  if invalid direction returns false
     **************/
  
    isValidDirection: dir => {
      let isValidDir =
        dir === NORTH || dir === EAST || dir === WEST || dir === SOUTH
          ? true
          : false;
      !isValidDir && console.log('Invalid Direction');
      return isValidDir;
    },
  
    /**************
     * @isValidMove
     * @return
     *  if the current direction does not exceed the length/width of the table top
     *  return true else return false
     **************/
  
    isValidMove: direction => {
      let currentPosition = tableTop.getRobotPosition();
      let tableTopLength = tableTop.getTableTop();
      let isValidMove =
        direction === NORTH
          ? currentPosition.y < tableTopLength.y
          : direction === EAST
          ? currentPosition.x < tableTopLength.x
          : direction === WEST
          ? currentPosition.x > 0
          : direction === SOUTH
          ? currentPosition.y > 0
          : false;
      !isValidMove && console.log('Invalid Move');
      return isValidMove;
    },
  
    /**************
     * @isValidMove
     * @return
     *  if the current direction does not exceed the length/width of the table top
     *  return true else return false
     **************/
    isValidPlace: (x, y, f) => {
      let tableTopLength = tableTop.getTableTop();
      let result = y <= tableTopLength.y && x <= tableTopLength.x;
      !result &&
        console.log('exceeds tabletop length of ', tableTop.getTableTop());
      result = module.exports.isValidDirection(f);
      return result;
    },
  
  
    /**************
     * @returnPlaceObject
     *  splits the place command with space and comma delimeters
     *  checks if three params are passed for x, y, f
     *  checks if the 'PLACE' command is valid
     * 
     * @return the valid place command with valid params if invalid returns false
     *  
     **************/
  
    returnPlaceObject: placeCMD => {
      let placeObj, x, y, f;
      let cmd = placeCMD.split(' ');
      let placeStr = cmd.length > 1 && cmd[1].split(',');
  
      let place = cmd && cmd[0].toUpperCase().trim();
  
      let isValidParams =
        placeStr.length === 3
          ? [
              (x = placeStr && placeStr[0]),
              (y = placeStr && placeStr[1]),
              (f = placeStr && placeStr[2].toUpperCase().trim())
            ]
          : false;
  
      placeObj =
        isValidParams &&
        module.exports.isValidCMD(place) &&
        module.exports.isValidPlace(x, y, f)
          ? { x: parseInt(x), y: parseInt(y), f: f }
          : false;
      return placeObj;
    },
  
    /**************
     * @isValidCMD
     *  validates the command
     * 
     * @return the command if it's valid
     *  
     **************/
    isValidCMD: cmd => {
      return cmd === PLACE ||
        cmd === MOVE ||
        cmd === 'LEFT' ||
        cmd === 'RIGHT' ||
        cmd === REPORT
        ? cmd
        : false;
    }
  };
  