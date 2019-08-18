let expect  = require('chai').expect
const sinon = require('sinon')
const robotSimulator = require('./../../src/controller/robotSimlator')
const tableTop = require('./../../src/model/tableTop')

describe('RobotSimulator', () => {
    beforeEach(() => {
        
    })

    //--------------------------- MOVE ------------------------------------------------
    
    it('should place the robot to the valid X, Y and Facing direction', () => { 
        let tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })

        let positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'N'}
        })
        expect(robotSimulator.move()).to.deep.include({ x: 0, y: 1, f: 'N' })
        positionStub.restore()

        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'E'}
        })
        expect(robotSimulator.move()).to.deep.include({ x: 1, y: 0, f: 'E' })
        positionStub.restore()

        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'W'}
        })
        expect(robotSimulator.move()).to.deep.include({ x: 0, y: 0, f: 'W' })
        positionStub.restore()

        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'S'}
        })
        expect(robotSimulator.move()).to.deep.include({ x: 0, y: 0, f: 'S' })
        positionStub.restore()
        tableTopStub.restore()
    })


    it('robot must not fall off the table during movement', () => {
        let positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 5, f: 'N'}
        })
        
        let tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        
        expect(robotSimulator.move()).to.deep.include({ x: 0, y: 5, f: 'N' })
        positionStub.restore()
        tableTopStub.restore()
    })


    it('should rotate robot 90 degrees to the Left', () => {
        let positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 1, y: 1, f: 'N'}
        })

        expect(robotSimulator.left()).to.deep.include({ x: 1, y: 1, f: 'W'})
        positionStub.restore()
    })

    it('should rotate robot 90 degrees to the Right', () => {
        let positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 1, y: 1, f: 'N'}
        })

        expect(robotSimulator.right()).to.deep.include({ x: 1, y: 1, f: 'E'})
        positionStub.restore()
    })
})