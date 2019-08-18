const readline = require('readline');

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = {
    readLine: () => {
        return new Promise((resolve, reject) => {
            try{
                readLineInterface.setPrompt('Enter a valid move (to end type END): ')
                readLineInterface.prompt()
                readLineInterface.on('line', (line) => {
                    line.toUpperCase() === "END" && readLineInterface.close()
                    readLineInterface.prompt()
                    resolve(line)
                }).on('close',function(){
                    process.exit(0);
                });
            }catch(error){
                console.log('error occured while reading input')
                reject('error occured while reading input')
            }
        })
    }
}
