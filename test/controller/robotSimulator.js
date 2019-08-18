const expect  = require('chai').expect;
const reader = require('./../../src/controller/robotSimulator')

describe('RobotSimulator', () => {
    it('should place the robot to the valid X, Y and Facing direction', async () => {
        expect(robotSimulator.Move(0, 0, 'N')).to.deep.include({ x: 0, y: 1, f: 'N' })
    })
})