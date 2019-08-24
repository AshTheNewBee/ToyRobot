const expect  = require('chai').expect;
let tableTop = require('./../../src/model/tableTop')
const sinon = require('sinon')

describe('TableTop creation', () => {

    it('should update the position of the robot', () => {
        expect(tableTop.updateRobotPosition(0, 1, 'NORTH')).to.deep.include({x: 0, y: 1, f: 'NORTH'})
    })

    it('should get the position of robot', () => {
        tableTop.updateRobotPosition(1, 1, 'SOUTH')
        expect(tableTop.getRobotPosition()).to.deep.include({x: 1, y: 1, f: 'SOUTH'})
    })

    it('should get the table top x y sizes', () => {
        expect(tableTop.getTableTop()).to.deep.include({x: 5, y: 5})
    })
})
