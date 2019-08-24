const tableTop = require('../../src/model/tableTop')
const { LEFT, RIGHT, NORTH, SOUTH, EAST, WEST } = require('../../src/util/consts')
const { isValidDirection, isValidMove, isValidPlace } = require('../../src/util/validation')

module.exports = {
     /**************
     * @PLACE
     *  Place the robot into given position of x, y and facing direction
     *  calls updateRobotPosition to place the robot into given position
     **************/
    PLACE: (xVal, yVal, facing) => {
        let returnVal = isValidPlace(xVal, yVal, facing)
        returnVal && tableTop.updateRobotPosition(xVal, yVal, facing)
        return returnVal
    },

     /**************
     * @MOVE
     *  validates the move to be taken from the current position
     *  if it's a valid move, moves the robot one unit towards the facing direction
     *  if the move is invalid, will not move the robot
     **************/
    MOVE: () => {
        let newPositon = tableTop.getRobotPosition()
        let currentPosition = tableTop.getRobotPosition()
       
        switch(currentPosition.f){
            case 'NORTH':
                newPositon.y = isValidMove(NORTH) ? currentPosition.y + 1 : currentPosition.y
                break
            case 'EAST':
                newPositon.x = isValidMove(EAST) ? currentPosition.x + 1 : currentPosition.x
                break
            case 'WEST':
                newPositon.x = isValidMove(WEST) ? currentPosition.x - 1 : currentPosition.x
                break
            case 'SOUTH':
                newPositon.y = isValidMove(SOUTH) ? currentPosition.y - 1 : currentPosition.y
                break
            default:
                newPositon = currentPosition
        }
       
        let x = newPositon.x ? newPositon.x : currentPosition.x
        let y = newPositon.y ? newPositon.y : currentPosition.y
        tableTop.updateRobotPosition(x, y, newPositon.f)
        return({x: x, y: y, f: newPositon.f})
    },

     /**************
     * @rotate
     *  Rotates the robot 90 degrees into given direction from the currently facing direction
     *  and update the current robot position
     **************/
    ROTATE: (dir) => {
        let newDir, currentPosition = tableTop.getRobotPosition()

        switch(currentPosition.f){
            case 'NORTH':
                newDir = (dir === LEFT ? WEST : EAST)
                break
            case 'EAST':
                newDir = (dir === LEFT ? NORTH : SOUTH)
                break
            case 'WEST':
                newDir = (dir === LEFT ? SOUTH : NORTH)
                break
            case 'SOUTH':
                newDir = (dir === LEFT ? EAST : WEST)
                break
            default:
                newDir = currentPosition.f
        }
        tableTop.updateRobotPosition(currentPosition.x, currentPosition.y, newDir)
        return newDir
    },

     /**************
     * @report
     *  logs the current robot position
     **************/
    REPORT: () => {
        let position = tableTop.getRobotPosition()
        console.log(`${position.x}, ${position.y}, ${position.f}`)
        return tableTop.getRobotPosition()
    }
}