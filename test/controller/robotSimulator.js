const expect  = require('chai').expect
const assert = require('chai').assert;
const sinon = require('sinon')
const robotSimulator = require('../../src/controller/robotSimulator')
const tableTop = require('./../../src/model/tableTop')
const validation = require('./../../src/util/validation')

describe('RobotSimulator', () => {
    let tableTopStub, positionStub, updateRobotPositionSpy, isValidPlaceStub

    afterEach(function () {
        tableTopStub.restore()
        positionStub.restore()
        updateRobotPositionSpy && updateRobotPositionSpy.restore()
        isValidPlaceStub && isValidPlaceStub.restore()
    });

    //--------------------------- MOVE ------------------------------------------------
    it('should move the toy robot one unit towards NORTH ', () => { 
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'NORTH'}
        })
        
        expect(robotSimulator.MOVE()).to.deep.include({ x: 0, y: 1, f: 'NORTH' })
        
    })
    
    it('should move the toy robot one unit towards EAST ', () => { 
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'EAST'}
        })
        expect(robotSimulator.MOVE()).to.deep.include({ x: 1, y: 0, f: 'EAST' })
    })

    it('should not move the toy robot one unit towards EAST if it excess the tabletop position ', () => { 
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 5, y: 5, f: 'EAST'}
        })
        expect(robotSimulator.MOVE()).to.deep.include({ x: 5, y: 5, f: 'EAST' })
    })


    it('should move the toy robot one unit towards WEST', () => { 
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'WEST'}
        })
        expect(robotSimulator.MOVE()).to.deep.include({ x: 0, y: 0, f: 'WEST' })
    })

    it('should not move the toy robot one unit towards WEST if robot is in the edge of tabletop position ', () => { 
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'WEST'}
        })
        expect(robotSimulator.MOVE()).to.deep.include({ x: 0, y: 0, f: 'WEST' })
    })

    it('should move the toy robot one unit towards SOUTH', () => {
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        }) 
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'SOUTH'}
        })
        expect(robotSimulator.MOVE()).to.deep.include({ x: 0, y: 0, f: 'SOUTH' })
    })

    it('should not move the toy robot one unit towards SOUTH if robot is in the edge of tabletop position ', () => { 
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'SOUTH'}
        })
        expect(robotSimulator.MOVE()).to.deep.include({ x: 0, y: 0, f: 'SOUTH' })
    })

    it('robot must not fall off the table during movement', () => {
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 5, f: 'NORTH'}
        })
        
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        
        expect(robotSimulator.MOVE()).to.deep.include({ x: 0, y: 5, f: 'NORTH' })
    })

    it('should call updateRobotPosition to update the position with MOVE', () => {
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 5, f: 'NORTH'}
        })
        
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })

        updateRobotPositionSpy = sinon.spy(tableTop, "updateRobotPosition");
        robotSimulator.MOVE()
        expect(tableTop.updateRobotPosition.calledWith(0, 5, 'NORTH')).to.be.true
        expect(tableTop.updateRobotPosition.calledOnce).to.be.true;
    })

    //--------------------------- LEFT ------------------------------------------------
    it('should rotate robot 90 degrees to the Left', () => {
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 1, y: 1, f: 'NORTH'}
        })
        
        expect(robotSimulator.ROTATE('LEFT')).to.be.equal('WEST')
    })


    //--------------------------- RIGHT ------------------------------------------------
    it('should rotate robot 90 degrees to the Right', () => {
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 1, y: 1, f: 'NORTH'}
        })

        expect(robotSimulator.ROTATE('RIGHT')).to.be.equal('EAST')
    })


    //--------------------------- REPORT ------------------------------------------------
    it('should report the x, y and facing position', () => {
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 4, y: 3, f: 'NORTH'}
        })

        expect(robotSimulator.REPORT()).to.deep.include({ x: 4, y: 3, f: 'NORTH'})
    })

    //--------------------------- PLACE ------------------------------------------------
    it('should place the robot in valid position', () => {
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'SOUTH'}
        })

        expect(robotSimulator.PLACE(1, 2, 'EAST')).to.be.equal(true)
    })

    it('should not place the robot with invalid params', () => {
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'SOUTH'}
        })

        expect(robotSimulator.PLACE(1, 2, 'JIBrish')).to.equal(false)
        expect(robotSimulator.PLACE(122, 2, 'JIBrish')).to.equal(false)
        expect(robotSimulator.PLACE(2, '2w2', 'JIBrish')).to.equal(false)
    })

    it('should call updateRobotPosition func with valid params', () => {
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'SOUTH'}
        })
        isValidPlaceStub = sinon.stub(validation, 'isValidPlace').callsFake(function fakeFn() {
            return true
        })

        updateRobotPositionSpy = sinon.spy(tableTop, "updateRobotPosition");
        robotSimulator.PLACE(1, 2, 'EAST')
        expect(tableTop.updateRobotPosition.calledOnce).to.be.true
    })

    //--------------------------- ROTATE ------------------------------------------------
    it('should rotate the robot 90 degrees to the LEFT while robot facing NORTH', () => {
        tableTopStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 5, y: 5,  f:'NORTH' }
        })

        expect(robotSimulator.ROTATE('LEFT')).to.be.equal('WEST')
    })

    it('should rotate the robot 90 degrees to the RIGHT while robot faing NORTH', () => {
        tableTopStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 5, y: 5,  f:'NORTH' }
        })

        expect(robotSimulator.ROTATE('RIGHT')).to.be.equal('EAST')
    })

    it('should rotate the robot 90 degrees to the RIGHT while robot faing EAST', () => {
        tableTopStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 5, y: 5,  f:'EAST' }
        })

        expect(robotSimulator.ROTATE('RIGHT')).to.be.equal('SOUTH')
    })

    it('should rotate the robot 90 degrees to the LEFT while robot faing EAST', () => {
        tableTopStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 5, y: 5,  f:'EAST' }
        })

        expect(robotSimulator.ROTATE('LEFT')).to.be.equal('NORTH')
    })

    it('should rotate the robot 90 degrees to the LEFT while robot faing WEST', () => {
        tableTopStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 5, y: 5,  f:'WEST' }
        })

        expect(robotSimulator.ROTATE('LEFT')).to.be.equal('SOUTH')
    })

    it('should rotate the robot 90 degrees to the RIGHT while robot faing WEST', () => {
        tableTopStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 5, y: 5,  f:'WEST' }
        })

        expect(robotSimulator.ROTATE('RIGHT')).to.be.equal('NORTH')
    })

    it('should rotate the robot 90 degrees to the RIGHT while robot faing SOUTH', () => {
        tableTopStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 5, y: 5,  f:'SOUTH' }
        })

        expect(robotSimulator.ROTATE('RIGHT')).to.be.equal('WEST')
    })

    it('should rotate the robot 90 degrees to the LEFT while robot faing SOUTH', () => {
        tableTopStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 5, y: 5,  f:'SOUTH' }
        })

        expect(robotSimulator.ROTATE('LEFT')).to.be.equal('EAST')
    })

    // it('should not rotate the robot with invalid rotate dirction', () => {
    //     tableTopStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
    //         return {x: 5, y: 5,  f:'SOUTH' }
    //     })
    //     console.log('****8')
    //     console.log(robotSimulator.ROTATE('worngDir'))
    //     expect(robotSimulator.ROTATE('worngDir')).to.be.equal('SOUTH')
    // })

    it('should call updateRobotPosition func with valid params', () => {
        tableTopStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 5, y: 5,  f:'SOUTH' }
        })

        updateRobotPositionSpy = sinon.spy(tableTop, "updateRobotPosition")
        robotSimulator.ROTATE('LEFT')
        //expect(tableTop.updateRobotPosition.calledOnce).to.be.true
        expect(tableTop.updateRobotPosition.calledWith(5, 5, 'EAST')).to.be.true
    })
})