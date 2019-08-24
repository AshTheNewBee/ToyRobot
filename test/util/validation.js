const expect  = require('chai').expect
const sinon = require('sinon')

let tableTop = require('./../../src/model/tableTop')
let validation = require('./../../src/util/validation')

describe('Validation', () => {
    it('should validate the directions', () => {
        expect(validation.isValidDirection('NORTH')).to.be.equal(true)
        expect(validation.isValidDirection('JIBrish')).to.be.equal(false)
    })

    it('should validate the move', () => {
        sinon.tableTop && sinon.tableTop.getTableTop().restore()
        sinon.tableTop && sinon.tableTop.getRobotPosition().restore()
        let tableTopStub = sinon.stub(tableTop, 'getTableTop').callsFake(function fakeFn() {
            return {x: 5, y: 5 }
        })

        let positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 5, f: 'NORTH'}
        })
        expect(validation.isValidMove('NORTH')).to.be.equal(false)
        positionStub.restore()

        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'WEST'}
        })
        expect(validation.isValidMove('WEST')).to.be.equal(false)
        positionStub.restore()

        positionStub = sinon.stub(tableTop, 'getRobotPosition').callsFake(function fakeFn() {
            return {x: 0, y: 0, f: 'NORTH'}
        })
        expect(validation.isValidMove('NORTH')).to.be.equal(true)
        positionStub.restore()
        tableTopStub.restore()
    })

    // it('should call PLACE command first', () => {
    //     expect(validation.validFirstCMD('PLACE 1 1 E')).to.be.equal(true)
    //     expect(validation.validFirstCMD('move')).to.be.equal(false)
    // })
    
})