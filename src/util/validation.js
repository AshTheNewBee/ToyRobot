const { LEFT, RIGHT, NORTH, SOUTH, EAST, WEST } = require('../../src/util/consts')
const tableTop = require('../../src/model/tableTop')

module.exports = {
    isValidDirection: (dir) => {
        let isValidDir = dir === NORTH || dir === EAST || dir === WEST || dir === SOUTH ?  true :  false;
        !isValidDir && console.log('Invalid Direction')
        return isValidDir
    },

    isValidMove: (move) => {
        let currentPosition = tableTop.getRobotPosition()
        let tableTopLength = tableTop.getTableTop()
        
        let isValidMove = 
            move === NORTH ? currentPosition.y < tableTopLength.y 
            : move === EAST ? currentPosition.x < tableTopLength.x 
            : move === WEST ? currentPosition.x > 0
            : move === SOUTH ? currentPosition.y > 0 : false
            
        !isValidMove && console.log('Invalid Move')
            
        return isValidMove
    }
}