const tableTop = require('../../src/model/tableTop')
const { LEFT, RIGHT, NORTH, SOUTH, EAST, WEST } = require('../../src/util/consts')

module.exports = {
    move: () => {
        let newPositon = tableTop.getRobotPosition()
        let currentPosition = tableTop.getRobotPosition()
       
        switch(currentPosition.f){
            case 'NORTH':
                newPositon.y = currentPosition.y < tableTop.getTableTop().y ? currentPosition.y + 1 : currentPosition.y
                break
            case 'EAST':
                newPositon.x = currentPosition.x < tableTop.getTableTop().x ? currentPosition.x + 1 : currentPosition.x
                break
            case 'WEST':
                newPositon.x = currentPosition.x > 0 ? currentPosition.x - 1 : currentPosition.x
                break
            case 'SOUTH':
                newPositon.y = currentPosition.y > 0 ? currentPosition.y - 1 : currentPosition.y
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