const expect  = require('chai').expect;
let tableTop = require('./../../src/model/tableTop')

describe('TableTop creation', () => {
    it('should return 5x5 tableTop', () => {
        expect(tableTop.createTableTop(5, 5)).to.deep.include({x: 5, y: 5})
    })

    it('should return the current position of the robot', () => {
        expect(tableTop.updateRobotPosition(0, 1, 'NORTH')).to.deep.include({x: 0, y: 1, f: 'NORTH'})
    })

    it('should get the position of robot', () => {
        tableTop.updateRobotPosition(1, 1, 'SOUTH')
        expect(tableTop.getRobotPosition()).to.deep.include({x: 1, y: 1, f: 'SOUTH'})
    })
})
