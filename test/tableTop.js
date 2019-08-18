const expect  = require('chai').expect;
let tableTop = require('../src/model/tableTop')

describe('TableTop creation', () => {
    it('should return 5x5 tableTop', () => {
        expect(tableTop.createTableTop(5, 5)).to.deep.include({x: 5, y: 5})
    })
})
