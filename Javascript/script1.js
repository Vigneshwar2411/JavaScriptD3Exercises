var fs = require('fs'), readline = require('readline'), stream = require('stream');

var instream = fs.ReadStream('Indicators.csv');
var outstream = fs.WriteStream('ur_population.json');
outstream.readable = true;
outstream.writable = true;
var headers = [];
var count = 0;

var rl = readline.createInterface({
  input: instream,
  terminal: false
});

rl.on('line', function(line) {
  if(count==0) {
    headers=line.split(",");
    outstream.write("[");
    count++;
  }
  else {
 var currentline = line.split(",");
    if(currentline[0]==="India" && (currentline[3]==="SP.RUR.TOTL.ZS" || currentline[3]==="SP.URB.TOTL.IN.ZS")) {
      var obj = {};
      for(var i=0;i<currentline.length;i++){
     obj[headers[i]] = currentline[i];
   }
      if(count==1) {
        outstream.write(JSON.stringify(obj));
      } else {
        outstream.write(","+JSON.stringify(obj));
      }
      count++;
    }
  }
  //rl.prompt();
}).on('close', () => {
  console.log(count);
  outstream.write("]");
});
