const tableTop = require('../../src/model/tableTop')

module.exports = {
    move: () => {
        let newPositon = tableTop.getRobotPosition()
        let currentPosition = tableTop.getRobotPosition()
       
        switch(currentPosition.f){
            case 'N':
                newPositon.y = currentPosition.y < tableTop.getTableTop().y ? currentPosition.y + 1 : currentPosition.y
                break
            case 'E':
                newPositon.x = currentPosition.x < tableTop.getTableTop().x ? currentPosition.x + 1 : currentPosition.x
                break
            case 'W':
                newPositon.x = currentPosition.x > 0 ? currentPosition.x - 1 : currentPosition.x
                break
            case 'S':
                newPositon.y = currentPosition.y > 0 ? currentPosition.y - 1 : currentPosition.y
                break
            default:
                newPositon = currentPosition
        }
       
        tableTop.updateRobotPosition(newPositon)
        return newPositon
    }
}