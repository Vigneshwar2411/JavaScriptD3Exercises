//Global Variables and Arrays
var fs = require('fs');
var data1 = "" , data2 = "" , data3 = "";
var count = 0;
var headers = [];
var generalData = [] , scData = [] , stData = [] ;
var states = [];
var genTotalMales = [] , genTotalFemales = [] , scTotalMales = [], scTotalFemales = [], stTotalMales = [] , stTotalFemales = [] ;
var totalMales = [] , totalFemales = [] , genTotal = [] ;
var objRatio = {};

//ReaderStreams for different csv files
var readerStream1 = fs.createReadStream('csv/India2011.csv');
var readerStream2 = fs.createReadStream('csv/IndiaSC2011.csv');
var readerStream3 = fs.createReadStream('csv/IndiaST2011.csv');
readerStream1.setEncoding('UTF8');
readerStream2.setEncoding('UTF8');
readerStream3.setEncoding('UTF8');

//calling the function for general csv file
readerStream1.on('data', function(chunk) {
   data1 += chunk;
   //console.log(data1);
});

readerStream1.on('close', () => {
   generalCsv(data1);
   console.log("end of India2011.csv");
   endFunction();
});

//calling the function for SC csv file
readerStream2.on('data', function(chunk) {
   data2 += chunk;
   //console.log(data2);
});

readerStream2.on('close', () => {
  scCsv(data2);
  console.log("end of IndiaSC2011.csv");
  endFunction();
});

//calling the function for ST csv file
readerStream3.on('data', function(chunk) {
   data3 += chunk;
  //console.log(data3);
});

readerStream3.on('close', () => {
  stCsv(data3);
  console.log("end of IndiaST2011.csv");
  endFunction();
});


//main Functions
function generalCsv(data1){
  var rows=data1.toString().split("\r\n");
  headers=rows[0].split(",");
  //console.log(headers);
  for(var i=1;i<rows.length-1;i++){
              var currentLine=rows[i].split(",");
              for (var x=01; x<36; x++){
                  if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[7]=="Total Males"){
                    states.push(currentLine[3]);
                    genTotalMales.push(parseInt(currentLine[7]));

                  }
                  if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[8]=="Total Females"){
                    genTotalFemales.push(parseInt(currentLine[8]));
                  }
              }
          }//console.log(genTotalMales);
          //console.log(genTotalFemales);
          // for(var j=0;j<genTotalFemales.length;j++){
          //   var temp = (parseInt(genTotalMales[j])+parseInt(genTotalFemales[j]));
          //   genTotal.push(parseInt(temp));
          // }
}


function scCsv(data1){
  var rows=data1.toString().split("\r\n");
  headers=rows[0].split(",");
  //console.log(headers);
  for(var i=1;i<rows.length-1;i++){
              var currentLine=rows[i].split(",");
              for (var x=01; x<36; x++){
                  if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[7]=="Total Males"){
                    scTotalMales.push(parseInt(currentLine[7]));
                  }
                  if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[8]=="Total Females"){
                    scTotalFemales.push(parseInt(currentLine[8]));
                  }
              }
          }
}



function stCsv(data1){
  var rows=data1.toString().split("\r\n");
  headers=rows[0].split(",");
  //console.log(headers);
  for(var i=1;i<rows.length-1;i++){
              var currentLine=rows[i].split(",");
              for (var x=01; x<36; x++){
                  if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[7]=="Total Males"){
                    stTotalMales.push(parseInt(currentLine[7]));
                  }
                  if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[8]=="Total Females"){
                    stTotalFemales.push(parseInt(currentLine[8]));
                  }
              }
          }
}




//End function where the JSON is to be created
function endFunction(){
  count++;
  if(count==3){
    console.log("Start the Manipulation");
    firstPlot();
  }
  else{
    console.log("Not yet ready to start the Manipulation");
  }
};


//Manipulation Functions
function firstPlot(){
  for(var j=0;j<genTotalFemales.length;j++){
    if(scTotalMales[j]==null){
      scTotalMales[j]=parseInt(0);
    }
    if(stTotalMales[j]==null){
      stTotalMales[j]=parseInt(0);
    }
    if(scTotalFemales[j]==null){
      scTotalFemales[j]=parseInt(0);
    }
    if(stTotalFemales[j]==null){
      stTotalFemales[j]=parseInt(0);
    }
    var temp = (parseInt(genTotalMales[j])+parseInt(scTotalMales[j])+parseInt(stTotalMales[j]));
    totalMales.push(parseInt(temp));
    var temp1 = (parseInt(genTotalFemales[j])+parseInt(scTotalFemales[j])+parseInt(stTotalFemales[j]));
    totalFemales.push(parseInt(temp1));
  }//console.log(totalMales);
  var maleRatio = [], femaleRatio = [];
  for(i=0;i<totalMales.length;i++){
    var temp = (((totalMales[i])/(totalMales[i]+totalFemales[i])));
    maleRatio.push(temp.toFixed(2));
    var temp1 = (((totalFemales[i])/(totalMales[i]+totalFemales[i])));
    femaleRatio.push(temp1.toFixed(2));
    objRatio=firstPlotObj(states[i],maleRatio[i],femaleRatio[i]);
    //obj=firstPlotObj(maleRatio[i],femaleRatio[i]);
    generalData.push(objRatio);
  }//console.log(maleRatio);
  //console.log(femaleRatio);

  function firstPlotObj(state,male,female){
    var obj1 = {
      "state": state,
      "male-ratio": male,
      "female-ratio": female
    }
  return obj1;
  }
  fs.writeFile('malefemaleratio1.json', JSON.stringify(generalData) , 'utf-8');
  console.log("Male Female Ratio JSON created");
};
