//Global Variables and Arrays
var fs = require('fs');
var data1 = "" , data2 = "" , data3 = "";
var count = 0;
  var   count11 = 0;
var headers = [];
var RatioData = [] , LiterateData = [] , LiterateMFData = [] ;
var states = [] ,states7 = [];
var genTotalMales = [] , genTotalFemales = [] , scTotalMales = [], scTotalFemales = [], stTotalMales = [] , stTotalFemales = [] ;
var genLit = [] , genIlt = [] , scLit = [], scIlt = [], stLit = [] , stIlt = [] ;
var genLit7M = [] , genIlt7M = [] , scLit7M = [], scIlt7M = [], stLit7M = [] , stIlt7M = [] ;
var genLit7F = [] , genIlt7F = [] , scLit7F = [], scIlt7F = [], stLit7F = [] , stIlt7F = [] ;
var totalMales = [] , totalFemales = [] , totalLiterate = [] , totalIlliterate = [] , genTotal = [] ;
var totalLiterateFemales =[] ,totalLiterateMales =[] ,totalIlliterateFemales =[] ,totalIlliterateMales =[] ;
var stateCode = ['12','13','14','15','17','11','16'];
var objRatio = {} , objLiterate = {} , objLiterateMF = {};
var d= new Date();
//ReaderStreams for different csv files
var readerStream1 = fs.createReadStream('csv/India2011.csv');
var readerStream2 = fs.createReadStream('csv/IndiaSC2011.csv');
var readerStream3 = fs.createReadStream('csv/IndiaST2011.csv');
readerStream1.setEncoding('UTF8');
readerStream2.setEncoding('UTF8');
readerStream3.setEncoding('UTF8');

//calling the function for general csv file
readerStream1.on('data', (chunk) => {
   data1 += chunk;
   //console.log(data1);
});

readerStream1.on('end', () => {

   generalCsv(data1,"general");
   console.log("end of India2011.csv");
   endFunction();
});

//calling the function for SC csv file
readerStream2.on('data', function(chunk) {
   data2 += chunk;
   //console.log(data2);
});

readerStream2.on('end', () => {
  generalCsv(data2,"sc");
  console.log("end of IndiaSC2011.csv");
  endFunction();
});

//calling the function for ST csv file
readerStream3.on('data', function(chunk) {
   data3 += chunk;
  //console.log(data3);
});

readerStream3.on('end', () => {
  generalCsv(data3,"st");
  console.log("end of IndiaST2011.csv");
  endFunction();
});


//main Functions
/*function to parse through the India2011 csv
  and get the arrays for Total No of Males and
  Females in each state, Get the Illeterate and
  Literate Population in each state, and the
  Literate and illiterate male female Population
  in 7 states */
function generalCsv(data1,string){
  var rows=data1.toString().split("\r\n");
  headers=rows[0].split(",");
  //console.log(headers);
  for(var i=1;i<rows.length-1;i++){
              var currentLine=rows[i].split(",");
              for (var x=01; x<36; x++){
                  if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[7]=="Total Males" && headers[8]=="Total Females")
                  {

                    if(string=="sc"){
                      scTotalMales.push(parseInt(currentLine[7]));
                      scTotalFemales.push(parseInt(currentLine[8]));
                    }
                    if(string=="general"){
                      states.push(currentLine[3]);
                      genTotalMales.push(parseInt(currentLine[7]));
                      genTotalFemales.push(parseInt(currentLine[8]));
                    }
                    if(string=="st"){
                      stTotalMales.push(parseInt(currentLine[7]));
                      stTotalFemales.push(parseInt(currentLine[8]));
                    }

                  }
                  if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[9]=="Illiterate - Persons" && headers[12]== "Literate - Persons")
                  {
                    if(string=="general"){
                      genIlt.push(parseInt(currentLine[9]));
                      genLit.push(parseInt(currentLine[12]));
                    }
                    if(string=="sc"){
                      scIlt.push(parseInt(currentLine[9]));
                      scLit.push(parseInt(currentLine[12]));
                    }
                    if(string=="st"){
                      stIlt.push(parseInt(currentLine[9]));
                      stLit.push(parseInt(currentLine[12]));
                    }

                  }
                  for(j=0;j<stateCode.length;j++){
                  if(currentLine[1]==stateCode[j]){
                    if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[10]=="Illiterate - Males" && headers[11]== "Illiterate - Females")
                    {
                      states7.push(currentLine[3]);
                      if(string=="general"){
                        genIlt7M.push(parseInt(currentLine[10]));
                        genIlt7F.push(parseInt(currentLine[11]));
                      }
                      if(string=="sc"){
                        scIlt7M.push(parseInt(currentLine[10]));
                        scIlt7F.push(parseInt(currentLine[11]));
                      }
                      if(string=="st"){
                        stIlt7M.push(parseInt(currentLine[10]));
                        stIlt7F.push(parseInt(currentLine[11]));
                      }
                    }
                    if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[13]=="Literate - Males" && headers[14]== "Literate - Females")
                    {
                      if(string=="general"){
                      genLit7M.push(parseInt(currentLine[13]));
                      genLit7F.push(parseInt(currentLine[14]));
                    }
                      if(string=="sc"){
                        scLit7M.push(parseInt(currentLine[13]));
                        scLit7F.push(parseInt(currentLine[14]));
                      }
                      if(string=="st"){
                        stLit7M.push(parseInt(currentLine[13]));
                        stLit7F.push(parseInt(currentLine[14]));
                      }
                    }
                  }
                }
              }
          }
}


//End function where the JSON is to be created
/* firstPlot and secondPlot are the functions to create
   JSON's for D3 and they are called from End Function */
function endFunction(){
  count++;
  if(count==3){
    console.log("Start the Manipulation");
    // console.log(stTotalFemales);
    // console.log(stTotalMales);
    firstPlot();// Function to create JSON for first plot
    secondPlot();// Function to create JSON for second plot
  }
  else{
    console.log("Not yet ready to start the Manipulation");
  }
};


//Manipulation Functions
function firstPlot(){
  var maleRatio = [], femaleRatio = [];

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
    /* Total Males in all the states are got here
       including all categories*/
    totalMales.push(parseInt(temp));
    var temp1 = (parseInt(genTotalFemales[j])+parseInt(scTotalFemales[j])+parseInt(stTotalFemales[j]));
    /* Total Females in all the states are got here
       including all categories*/
    totalFemales.push(parseInt(temp1));
  }

  /* Male and Female Ratio for the asiignement(a) are
     created here and pushed into JSON using
     RatioData array */
  for(i=0;i<totalMales.length;i++){
    maleRatio.push((totalMales[i]/totalFemales[i]).toFixed(2));
    var temp = ((totalFemales[i]/totalMales[i]).toFixed(2)*100);
    femaleRatio.push(temp);
    objRatio=firstPlotObj(states[i],maleRatio[i],femaleRatio[i]);
    //obj=firstPlotObj(maleRatio[i],femaleRatio[i]);
    RatioData.push(objRatio);
  }

  //Function to create the required object
  function firstPlotObj(state,male,female){
    count11++;
    var stateName = state.slice(8);
    var obj1 = {
      "state": stateName,
      "females per 100 males": female
    }

  return obj1;
  }
  fs.writeFile('jsonfinal/malefemaleratio1.json', JSON.stringify(RatioData) , 'utf-8');
  console.log("Male Female Ratio JSON created");

    for(var j=0;j<genLit.length;j++){
      if(scLit[j]==null){
        scLit[j]=parseInt(0);
      }
      if(stLit[j]==null){
        stLit[j]=parseInt(0);
      }
      if(scIlt[j]==null){
        scIlt[j]=parseInt(0);
      }
      if(stIlt[j]==null){
        stIlt[j]=parseInt(0);
      }
      var temp = (parseInt(genLit[j])+parseInt(scLit[j])+parseInt(stLit[j]));
      totalLiterate.push(parseInt(temp));
      var temp1 = (parseInt(genIlt[j])+parseInt(scIlt[j])+parseInt(stIlt[j]));
      totalIlliterate.push(parseInt(temp1));
    }

    /* Literate and Illiterate population for the asiignement(b) are
       created here and pushed into JSON using
       LiterateData array */
    for(i=0;i<totalLiterate.length;i++){
      objLiterate=firstPlotObjb(states[i],totalLiterate[i],totalIlliterate[i]);
      LiterateData.push(objLiterate);
    }

    function firstPlotObjb(state,literate,illiterate){
      var stateName = state.slice(8);
      var obj1 = {
        "state": stateName,
        "Literate": literate,
        "Illiterate": illiterate
      }
    return obj1;
    }
    console.log(LiterateData);

    fs.writeFile('jsonfinal/literate1.json', JSON.stringify(LiterateData) , 'utf-8');
    console.log("Literate and Illiterate JSON created");

};


function secondPlot(){

  for(var j=0;j<genLit7F.length;j++){
    if(scLit7F[j]==null){
      scLit7F[j]=parseInt(0);
    }
    if(stLit7F[j]==null){
      stLit7F[j]=parseInt(0);
    }
    if(scLit7M[j]==null){
      scLit7M[j]=parseInt(0);
    }
    if(stLit7M[j]==null){
      stLit7M[j]=parseInt(0);
    }

    if(scIlt7F[j]==null){
      scIlt7F[j]=parseInt(0);
    }
    if(stIlt7F[j]==null){
      stIlt7F[j]=parseInt(0);
    }
    if(scIlt7M[j]==null){
      scIlt7M[j]=parseInt(0);
    }
    if(stIlt7M[j]==null){
      stIlt7M[j]=parseInt(0);
    }
    var temp = (parseInt(genLit7F[j])+parseInt(scLit7F[j])+parseInt(stLit7F[j]));
    totalLiterateFemales.push(parseInt(temp));
    var temp1 = (parseInt(genLit7M[j])+parseInt(scLit7M[j])+parseInt(stLit7M[j]));
    totalLiterateMales.push(parseInt(temp1));
    var temp2 = (parseInt(genIlt7F[j])+parseInt(scIlt7F[j])+parseInt(stIlt7F[j]));
    totalIlliterateFemales.push(parseInt(temp2));
    var temp3 = (parseInt(genIlt7M[j])+parseInt(scIlt7M[j])+parseInt(stIlt7M[j]));
    totalIlliterateMales.push(parseInt(temp3));
  }
  //console.log(states7);

  for(j=0;j<stateCode.length;j++){
    objLiterateMF=secondPlotObj(states7[j],totalLiterateMales[j],totalIlliterateMales[j],totalLiterateFemales[j],totalIlliterateFemales[j]);
    LiterateMFData.push(objLiterateMF);
}

  function secondPlotObj(state,literateMales,illiterateMales,literateFemales,illiterateFemales){
    var stateName = state.slice(8);
    var obj1 = {
      "state": stateName,
      "Literate Males": literateMales,
      "Literate Females": literateFemales,
      "Illiterate Males": illiterateMales,
      "Illiterate Females": illiterateFemales
    }
  return obj1;
  }
  fs.writeFile('jsonfinal/literateMaleFemale1.json', JSON.stringify(LiterateMFData) , 'utf-8');
  console.log("Literate and Illiterate Male and Female JSON created");
};
