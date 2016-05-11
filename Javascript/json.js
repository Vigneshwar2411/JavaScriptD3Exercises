var fs = require("fs");
var data = '';

var readerStream = fs.createReadStream('csv/India2011.csv');
var writerStream = fs.createWriteStream('output.txt');

readerStream.setEncoding('UTF8');

readerStream.on('data', function(chunk) {
   data += chunk;
});

writerStream.write(data,'UTF8');

writerStream.on('finish', function() {
    console.log("Write completed.");
});
