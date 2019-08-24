const validation = require('../../src/util/validation');
const robotSimulator = require('../../src/controller/robotSimlator');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = {
  /**************
   * @readLines
   *  Reads line and finds out if the input line is 'END'
   *  if end terminates the reader
   *
   *  If isNextCMD false and if the line is not a valid command
   *   that means this is a invalid 1st PLACE command.
   *   So calls the reader again expecting a valid PLACE command
   *
   * If isNextCMD is false that means it's a valid first command
   *  so calls the PLACE command and calls reader for expecting next command
   *
   * If isNextCMD true that means it already made a valid first command and readily expecting next command
   *  Checks the input line is a valid command
   *  If so pass to robotSimulator to make the command
   *  Recursively listens to the next command
   *
   **************/

  readLines: (isNextCMD, cmd = 'Enter a command:     ') => {
    try {
      rl.question(cmd, line => {
        line.toUpperCase().trim() === 'END' && rl.close();
        let validFirstPlaceCMD = validation.returnPlaceObject(line);

        // First command invalid so ask for PLACE again
        if (!isNextCMD && !validFirstPlaceCMD) {
          module.exports.readLines(
            false,
            'Enter a valid PLACE command to start     '
          );
          // First valid PLACE cmd
        } else if (!isNextCMD) {
          robotSimulator.PLACE(
            validFirstPlaceCMD.x,
            validFirstPlaceCMD.y,
            validFirstPlaceCMD.f
          );
          module.exports.readLines(true, 'Enter a command to continue     ');
          // Next commands
        } else if (isNextCMD) {
          let isPlaceCMD = line.split(' ');
          let nextCMD = isPlaceCMD ? isPlaceCMD[0] : line;
          nextCMD = validation.isValidCMD(nextCMD.toUpperCase().trim());
          switch (nextCMD) {
            case 'PLACE':
              let validPlaceCMD = validation.returnPlaceObject(line);
              validPlaceCMD &&
                robotSimulator.PLACE(
                  validPlaceCMD.x,
                  validPlaceCMD.y,
                  validPlaceCMD.f
                );
              break;
            case 'MOVE':
              robotSimulator.MOVE();
              break;
            case 'LEFT':
              robotSimulator.ROTATE('LEFT');
              break;
            case 'RIGHT':
              robotSimulator.ROTATE('RIGHT');
              break;
            case 'REPORT':
              robotSimulator.REPORT();
              break;
            default:
              robotSimulator.REPORT();
          }
          module.exports.readLines(true, 'Enter a commnd to continue     ');
        }
      });
    } catch (error) {
      console.log('error occured while reading input');
      return false;
    }
  },

  fileReader: () => {}
};
