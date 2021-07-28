const args = process.argv.slice(2);
const fs = require('fs');
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const URL = args[0];
const path = args[1];

fs.access(path, function (error) {
  if (error) {
    request(URL, (error, response, body) => {
      fs.writeFile(path, body, error => {
      if (error) {
        console.error(error)
        return
      }
      console.log("Downloaded and saved " + body.length + " bytes to " + path)
    })
  });
  } else {
    rl.question('File already exist. Overwrite? y or n?', (answer) => {
      console.log(answer)
      if(answer !== 'y'&& answer !== 'n') {
        console.log('Answer must be y or n. Please start again')
        process.exit;
      } else if (answer === 'y') {
        request(URL, (error, response, body) => {
          fs.writeFile(path, body, error => {
          if (error) {
            console.error(error)
            return
          }
          console.log("Downloaded and saved " + body.length + " bytes to " + path)
        })
      });

      } else if (answer === 'n') {
        console.log("Ending program.")
        process.exit
      }
      rl.close();
    })
  }
});


