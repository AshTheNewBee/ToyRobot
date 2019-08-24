const { PLACE, MOVE, ROTATE, REPORT, NORTH, SOUTH, EAST, WEST } = require('../../src/util/consts')
const tableTop = require('../../src/model/tableTop')

module.exports = {
    /**************
     * @isValidDirection
     * Check if the given direction is a valid direction
     * @return 
     *  if the given dircetion is valid returns true
     *  if invalid direction returns false
     **************/

    isValidDirection: (dir) => {
        let isValidDir = dir === NORTH || dir === EAST || dir === WEST || dir === SOUTH ?  true :  false;
        !isValidDir && console.log('Invalid Direction')
        return isValidDir
    },

    /**************
     * @isValidMove
     * @return 
     *  if the current direction does not exceed the length/width of the table top
     *  return true else return false
     **************/

    isValidMove: (direction) => {
        let currentPosition = tableTop.getRobotPosition()
        let tableTopLength = tableTop.getTableTop()
        let isValidMove = 
            direction === NORTH ? currentPosition.y < tableTopLength.y 
            : direction === EAST ? currentPosition.x < tableTopLength.x 
            : direction === WEST ? currentPosition.x > 0
            : direction === SOUTH ? currentPosition.y > 0 : false
            
        !isValidMove && console.log('Invalid Move')
        return isValidMove
    },

    /**************
     * @isValidMove
     * @return 
     *  if the current direction does not exceed the length/width of the table top
     *  return true else return false
     **************/
    isValidPlace: (x, y, f) => {
        let tableTopLength = tableTop.getTableTop()
        let result = y < tableTopLength.y && x < tableTopLength.x
        !result && console.log('exceeds tabletop length of ', tableTop.getTableTop())
        result = module.exports.isValidMove(f)
        return result
    },

    // isValidValue: (value) => {
    //     return value &&
    // },

    returnPlaceObject: (placeCMD) => {
        let placeObj
        let placeStr = placeCMD && placeCMD.trim().toUpperCase().split(' ')
        if(placeStr.length >= 4 ){
            placeObj = module.exports.isValidCMD(placeStr[0]) 
                && module.exports.isValidDirection(placeStr[3])
                && module.exports.isValidPlace(placeStr[1], placeStr[2])
                && placeStr[1] && placeStr[2] && placeStr[3] 
                
                ? { x: parseInt(placeStr[1]), y: parseInt(placeStr[2]), f: placeStr[3] } : false
            return placeObj
        }else{
            return false
        }
    },

    isValidCMD: (cmd) => {
        return cmd === PLACE || cmd === MOVE || cmd === 'LEFT' || cmd === 'RIGHT' || cmd === REPORT ? cmd : false 
    }
}