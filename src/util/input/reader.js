const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

module.exports = {
    readIterate: (promptQ) => {
        return new Promise((resolve, reject) => {
            try{
                rl.setPrompt(promptQ)
                rl.prompt()
                rl.on('line', (line) => {
                    if(line.toUpperCase() === "END"){
                        line.toUpperCase() === "END" && rl.close()
                    }else{
                        rl.prompt()
                        return(line)
                    }
                    
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
