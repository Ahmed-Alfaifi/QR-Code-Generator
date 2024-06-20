import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

const quastion = [
    {
      type: 'input',
      name: 'URL',
      message: 'Please Enter the URL',
    },
  ]; //quastion to Take user inputs (The URL Link )

inquirer.prompt(quastion) // Taking user inputs
  .then((answers) => {
    const qrPng = qr.image(answers.URL, { type: 'png' }); // Creating a image (png)
    const fileName = `${answers.URL.replace(/[^a-zA-Z0-9]/g, '_')}.png`; // Replace special characters in the URL to make a valid filename
    qrPng.pipe(fs.createWriteStream(fileName)); // creat a writable file stream then send image file in the same foldar
    const file = fs.createWriteStream("URL.txt",'utf8');  // create a writable text file stream
    file.write(answers.URL); // write The user URL inside the file  
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("couldn't be rendered in the current environment"); 
    } 
    else {
      console.error("Something else went wrong") ;
    }
  });