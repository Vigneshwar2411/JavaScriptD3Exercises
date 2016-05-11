var fs= require ("fs");


fs.readFile('csv/India2011.csv', function(err,data1){
  myJson(data1);
})

function myJson(data1){
  var line=data1.toString().split("\r\n");
  console.log(line.length);
  var finaljson=[];
  var headers=line[0].split(",");
  console.log(line[0]);
  for(var i=1;i<line.length-1;i++){

    var currentLine=line[i].split(",");

    for (var s=01;s<36;s++){
        console.log(currentLine[3]);
    }


}
}


main
var fs= require ("fs");


fs.readFile('csv/India2011.csv', function(err,data1){
  myJson(data1);
})

function myJson(data1){
  var line=data1.toString().split("\r\n");
  console.log(line.length);
  var finaljson=[];
  var headers=line[0].split(",");
  console.log(line[0]);
  for(var i=1;i<line.length-1;i++){
    var currentLine=line[i].split(",");
    var totalMales={};
    var total="";
    for (var s=01;s<36;s++){
        total=total+currentLine[7];
        // console.log(currentLine[3]);
    }
    console.log(total)
    if(currentLine[1]==='35'){
      var obj={};
      for(j=0 ;j<headers.length;j++){
        obj[headers[j]]=currentLine[j];

      }
      finaljson.push(obj);
    }
  }
 console.log(finaljson);
}




var fs= require ("fs");


fs.readFile('csv/India2011.csv', function(err,data1){
  myJson(data1);
})

function myJson(data1){
  var line=data1.toString().split("\r\n");
  console.log(line.length);
  var finaljson=[];
  var totalMales=0;
  var headers=line[0].split(",");
  console.log(line[0]);
  for(var i=1;i<line.length-1;i++){
    var currentLine=line[i].split(",");
      var obj={};
      for(j=0 ;j<headers.length;j++){
        obj[headers[j]]=currentLine[j];
      }
      finaljson.push(obj);
      for(s=01;s<36;s++){
        var count=0;
          if(obj["State Code"]==01){
            console.log(totalMales);
            count++;
            // totalMales=totalMales+parseInt(obj["Total Males"]);
            // console.log(typeof obj["Total Males"]);
        }
          console.log(count);
      }

  }

}






if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[8]=="Total Females")
{
  var index = currentLine[1]-1;
  var curObj = finaljson[index];
  if(curObj==null) {
    var females=new TotalGeneral(currentLine[1],currentLine[8]);

    finaljson[index] = males;
  } else {
    var temp=parseInt(curObj.total);
    temp+=parseInt(currentLine[8]);
    curObj.total=temp;
    finaljson[index] = curObj;
  }
}
