const request = require('request');
const fs = require('fs');
const htmlFile = './index.html';

const storeData = (data) => {
  if (data) console.log("Characters received:", data.length);
  // fs.write(htmlFile);
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