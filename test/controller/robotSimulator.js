let expect  = require('chai').expect
const sinon = require('sinon')
const robotSimulator = require('./../../src/controller/robotSimlator')
const tableTop = require('./../../src/model/tableTop')

describe('RobotSimulator', () => {
    after(function () {
        sinon.tableTop && sinon.tableTop.getTableTop().restore();
        sinon.tableTop && sinon.tableTop.getRobotPosition().restore();
    });
    
    //--------------------------- MOVE ------------------------------------------------
    it('should place the robot to the valid X, Y and Facing direction', () => { 
        let tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })

        let positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'NORTH'}
        })
        expect(robotSimulator.MOVE()).to.deep.include({ x: 0, y: 1, f: 'NORTH' })
        positionStub.restore()

        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'EAST'}
        })
        expect(robotSimulator.MOVE()).to.deep.include({ x: 1, y: 0, f: 'EAST' })
        positionStub.restore()

        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'WEST'}
        })
        expect(robotSimulator.MOVE()).to.deep.include({ x: 0, y: 0, f: 'WEST' })
        positionStub.restore()

        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'SOUTH'}
        })
        expect(robotSimulator.MOVE()).to.deep.include({ x: 0, y: 0, f: 'SOUTH' })
        positionStub.restore()
        tableTopStub.restore()
    })


    it('robot must not fall off the table during movement', () => {
        let positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 5, f: 'NORTH'}
        })
        
        let tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        
        expect(robotSimulator.MOVE()).to.deep.include({ x: 0, y: 5, f: 'NORTH' })
        positionStub.restore()
        tableTopStub.restore()
    })


    //--------------------------- LEFT ------------------------------------------------
    it('should rotate robot 90 degrees to the Left', () => {
        let positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 1, y: 1, f: 'NORTH'}
        })
        

        console.log(robotSimulator.LEFT(), '++++')
        //expect(robotSimulator.LEFT()).to.deep.include({ x: 1, y: 1, f: 'WEST'})
        expect(updateRobotPosition).toHaveBeenCalled();
        positionStub.restore()
    })


    //--------------------------- RIGHT ------------------------------------------------
    it('should rotate robot 90 degrees to the Right', () => {
        let positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 1, y: 1, f: 'NORTH'}
        })

        expect(robotSimulator.right()).to.deep.include({ x: 1, y: 1, f: 'EAST'})
        positionStub.restore()
    })


    //--------------------------- REPORT ------------------------------------------------
    it('should report the x, y and facing position', () => {
        let positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 4, y: 3, f: 'NORTH'}
        })
        expect(robotSimulator.report()).to.deep.include({ x: 4, y: 3, f: 'NORTH'})
        positionStub.restore()
    })

    //--------------------------- PLACE ------------------------------------------------
    it('should place the robot in valid position', () => {
        let tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        let positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'SOUTH'}
        })

        expect(robotSimulator.place(1, 2, 'EAST')).to.deep.include({ x: 1, y: 2, f: 'EAST'})
        expect(robotSimulator.place(1, 2, 'JIBrish')).to.equal(false)
        expect(robotSimulator.place(122, 2, 'JIBrish')).to.equal(false)
        expect(robotSimulator.place(2, '2w2', 'JIBrish')).to.equal(false)

        positionStub.restore()
        tableTopStub.restore()
    })
})