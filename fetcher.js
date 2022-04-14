const request = require('request');
const fs = require('fs');
const file = './index.html';

const getFilesize = file => {
  console.log(`Checking ${file} filesize..`);
};

const storeData = (data) => {
  if (data) console.log("Characters received:", data.length);
  fs.writeFile(file, data, {flag: "w"}, err => {
    if (err) return console.log('error:', err);
    console.log(`Written to ${file} successfully.Size: ${getFilesize(file)}`);
  });
};

const downloadPage = (url, cb) => {
  request(url, (error, response, body) => {
    if (error) return console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    cb(body);
  });
};

downloadPage('http://www.example.edu/', storeData);