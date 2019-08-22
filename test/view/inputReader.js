// const expect  = require('chai').expect;
// const sinon = require('sinon')
// const reader = require('./../../src/view/inputReader')
// const robotSimulator = require('./../../src/controller/robotSimlator')

// describe('InputReader', () => {
//     it('should readLine', async () => {
//         let setPrompt = sinon.stub(readline, 'setPrompt').callsFake(function fakeFn() {
//             return 'Enter input'
//         })

//         let prompt = sinon.stub(readline, 'prompt').callsFake(function fakeFn() {
//             return 'return Val'
//         })

//         let readerOn = sinon.stub(readline, 'on').callsFake(function fakeFn() {
//             return 'return Val'
//         })

//         let moveFunc = sinon.stub(robotSimulator, 'move').callsFake(function fakeFn() {
//             return true
//         })
//         reader.readLine('Move')
//         expect(moveFunc).to.have.been.called()
//         moveFunc.restore()

//         let placeFunc = sinon.stub(robotSimulator, 'place').callsFake(function fakeFn() {
//             return true
//         })
//         expect(placeFunc).to.have.been.called()
//         placeFunc.restore()

//         let leftFunc = sinon.stub(robotSimulator, 'left').callsFake(function fakeFn() {
//             return true
//         })
//         expect(leftFunc).to.have.been.called()
//         leftFunc.restore()
//     })
// })
