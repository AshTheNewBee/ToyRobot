const tableTop = require('../../src/model/tableTop')
const { LEFT, RIGHT, NORTH, SOUTH, EAST, WEST } = require('../../src/util/consts')
const { isValidDirection, isValidMove } = require('../../src/util/validation')

module.exports = {
    place: (xVal, yVal, facing) => {
        let isValidValue = isValidDirection(facing) && isValidMove(facing) && { x: xVal, y: yVal, f: facing }
        isValidValue && tableTop.updateRobotPosition(isValidValue)
        return isValidValue
    },

    move: () => {
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
       
        tableTop.updateRobotPosition(newPositon)
        return newPositon
    },

    left: () => {
        return module.exports.rotate(LEFT)
    },

    right: () => {
        return module.exports.rotate(RIGHT)
    },

    rotate: (dir) => {
        let newDir, currentPosition = tableTop.getRobotPosition()
        let newPositon = tableTop.getRobotPosition()

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

        newPositon.f = newDir
        tableTop.updateRobotPosition(newPositon)
        return newPositon
    },

    report: () => {
        return tableTop.getRobotPosition()
    }
}