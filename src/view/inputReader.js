const validation = require('../../src/util/validation')
const reader = require('../../src/util/input/reader')
const robotSimulator = require('../../src/controller/robotSimlator')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

module.exports = {

    readLines: (isNextCMD, cmd = 'Enter a command:     ') => {
        try{
            rl.question(cmd, (line) => {
                line.toUpperCase() === 'END' && rl.close()
                let validFirstPlaceCMD = validation.returnPlaceObject(line)
                
                // First command invalid so ask for PLACE again
                if(!isNextCMD && !validFirstPlaceCMD){
                    module.exports.readLines(false, 'Enter a valid PLACE command to start     ')
                // First cvalid PLACE cmd
                }else if(!isNextCMD){
                    robotSimulator.PLACE(validFirstPlaceCMD.x, validFirstPlaceCMD.y, validFirstPlaceCMD.f)
                    module.exports.readLines(true, 'Enter a command to continue     ')
                // Next commands
                }else if(isNextCMD){
                    let isPlaceCMD = line.split(' ')
                    let nextCMD = isPlaceCMD ? isPlaceCMD[0] : line
                    nextCMD = validation.isValidCMD(nextCMD.toUpperCase().trim())
                    switch(nextCMD){
                        case('PLACE'):
                            let validPlaceCMD = validation.returnPlaceObject(line)
                            console.log(validPlaceCMD)
                            validPlaceCMD && robotSimulator.PLACE(validPlaceCMD.x, validPlaceCMD.y, validPlaceCMD.f)
                            break
                        case('MOVE'):
                            robotSimulator.MOVE()
                            break
                        case('LEFT'):
                            robotSimulator.ROTATE('LEFT')
                            break
                        case('RIGHT'):
                            robotSimulator.ROTATE('RIGHT')
                            break
                        default:
                            robotSimulator.REPORT()

                    }
                    // console.log(`robotSimulator.${nextCMD}()`)
                    // if(nextCMD === 'PLACE'){
                    //     let place = validation.returnPlaceObject(line)
                    //     place && robotSimulator.PLACE(place.x, place.y, place.f)
                    // }else{
                    //     validation.isValidCMD(nextCMD) && `robotSimulator.${nextCMD}()`
                    // }
                    module.exports.readLines(true, 'Enter a commnd to continue     ')
                }
            }) 
        }catch(error){
            console.log(error)
            return('error occured while reading input')
        }
    }
}
