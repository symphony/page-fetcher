const request = require('./node_modules/request');
const fs = require('fs');
const defaults = ['http://www.example.edu/', './downloaded/index.html'];
const args = process.argv.slice(2, 4);
const page = args[0] || defaults[0];
const destination = args[1] || defaults[1];
console.log("args:", args, "page:", page, "destination:", destination);


const getFilesize = file => {
  console.log(`Checking '${file}' filesize..\n`);
  return fs.statSync(file).size + " bytes";
};

const writeToFile = (data, file) => {
  if (data) console.log("Characters fetched:", data.length);
  fs.writeFile(file, data, {flag: "w"}, err => {
    if (err) return console.log('error:', err);
    console.log(`Downloaded and successfully saved ${getFilesize(file)} to '${file}'.`);
  });
};

const downloadPage = (url, file) => {
  request(url, (error, response, body) => {
    if (error) return console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    writeToFile(body, file);
  });
};

downloadPage(page, destination);


// Edge Case 1: File Already Exists
// If the file path already exists, right now your app will overwrite it! If you want to change this, let the user know and prompt them to type in Y(followed by the enter key) to overwrite the file, otherwise skip and exit the app. We suggest using the readline module, which we've previously used.

// Edge Case 2: File Path is Invalid
// If the file path is invalid, the app should fail and let the user know about this issue.

// Edge Case 3: URL is Invalid
// If the URL is invalid, terminate the app explaining to the user what went wrong, and not write the response body to the file.