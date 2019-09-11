const expect  = require('chai').expect
const sinon = require('sinon')

let tableTop = require('./../../src/model/tableTop')
let validation = require('./../../src/util/validation')

describe('Validation', () => {
    let tableTopStub, positionStub, updateRobotPositionSpy, isValidDirection, isValidPlaceSpy

    afterEach(function () {
        tableTopStub && tableTopStub.restore()
        positionStub && positionStub.restore()
        updateRobotPositionSpy && updateRobotPositionSpy.restore()
        isValidDirection && isValidDirection.restore()
    });

     //-------------------------------------- isValidDirection -------------------------------------------

    it('should retun true when given a valid direction', () => {
        expect(validation.isValidDirection('NORTH')).to.be.equal(true)
    })

    it('should return false when given invalid direction', () => {
        expect(validation.isValidDirection('JIBrish')).to.be.equal(false)
    })

    //-------------------------------------- isValidMove -------------------------------------------

    it('should return false while trying to move to NORTH when robot is in the NORTH highest most unit', () => {
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })

        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 5, f: 'NORTH'}
        })
        expect(validation.isValidMove('NORTH')).to.be.equal(false)
    })

    it('should return false while trying to move to WEST when robot is in the lowest WEST most unit', () => {
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'WEST'}
        })
        expect(validation.isValidMove('WEST')).to.be.equal(false)
    })
    
    it('should return true while trying to move to NORTH when robot is in valid 0:0 unit', () => {
        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'NORTH'}
        })
        expect(validation.isValidMove('NORTH')).to.be.equal(true)
    })

    //-------------------------------------- isValidPlace -------------------------------------------
    // it('should retun false if the PLACE cmd exceed the length of tabletop units', () => {
    //     tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
    //         return {x: 5, y: 5 }
    //     })
    //     expect(validation.isValidPlace(6, 10, 'NORTH')).to.be.equal(false)
    // })

    // it('should retun false if the PLACE cmd subceed the length of tabletop units', () => {
    //     tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
    //         return {x: 5, y: 5 }
    //     })
    //     console.log('***********')
    //     console.log(validation.isValidPlace(-4, 10, 'abc'))
    //     expect(validation.isValidPlace(-4, 10, 'NORTH')).to.be.equal(false)
    // })

    // it('should retun false if the PLACE cmd is in invalid facing direction', () => {
    //     tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
    //         return {x: 5, y: 5 }
    //     })

    //   console.log('***********')
    //   console.log(validation.isValidPlace(1, 1, 'abc'))
    //     expect(validation.isValidPlace(1, 1, 'abc')).to.be.equal(false)
    // })

    it('should retun true if the PLACE cmd is on vallid tabletop position', () => {
        tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })
        
        expect(validation.isValidPlace(1, 1, 'NORTH')).to.be.equal(true)
    })

    //-------------------------------------- returnPlaceObject -------------------------------------------
    it('should retun a valid place object when valid the PLACE cmd is passed', () => {
        expect(validation.returnPlaceObject('place 1,2,north')).to.deep.include({ x: 1, y: 2, f: 'NORTH' })
    })

    it('should retun false when all three params are NOT given after the place cmd', () => {
        expect(validation.returnPlaceObject('place 1,2')).to.be.equal(false)
    })

    it('should retun false when x & y are not valid integers', () => {
        expect(validation.returnPlaceObject('place aa,v, north')).to.be.equal(false)
    })

    it('should call isValidPlace to capture the validity of the place', () => {
        let isValidPlaceSpy = sinon.spy(validation, "isValidPlace");
        validation.returnPlaceObject('place 1,3,north')
        expect(validation.isValidPlace.calledOnce).to.be.true
        isValidPlaceSpy.restore()
    })

    it('should call isValidCMD to check if the place is a valid command', () => {
        let isValidCMDSpy = sinon.spy(validation, "isValidCMD");
        validation.returnPlaceObject('place 1,3,north')
        expect(validation.isValidCMD.calledOnce).to.be.true
        isValidCMDSpy.restore()
    })

    //-------------------------------------- isValidCMD -------------------------------------------
    it('should retun upper cased commannd if valid command is passed', () => {
        expect(validation.isValidCMD('LEFT')).to.be.equal('LEFT')
        expect(validation.isValidCMD('REPORT')).to.be.equal('REPORT')
    })

    it('should retun false if invalid command name is passed', () => {
        expect(validation.isValidCMD('LFET')).to.be.equal(false)
        expect(validation.isValidCMD('REPORTING')).to.be.equal(false)
    })
})