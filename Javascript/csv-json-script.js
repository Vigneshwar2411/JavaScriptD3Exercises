var fs= require ("fs");
var maleintotal=0;
var femaleintotal=0;

fs.readFile('csv/India2011.csv', function(err,data1){
  myJson(data1);
})


function myJson(data1){
          var line=data1.toString().split("\r\n");
          var finaljson=[];
          var totalMGeneral=0;
          var headers=line[0].split(",");

          for(var i=1;i<line.length-1;i++){
                      var currentLine=line[i].split(",");
                      var x;
                      for (var x=01; x<36; x++){
                            if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[7]=="Total Males")
                            {

                              var males=new TotalGeneral(currentLine[1],currentLine[7]);

                              finaljson.push(males);
                            }
                            if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[8]=="Total Females")
                            {
                              var females=new TotalGeneral(currentLine[1],currentLine[8]);
                              finaljson.push(females);
                            }
                          }
                      }
                      // var s=01;
                      // for(var i=0;i<finaljson.length;i++){
                      //   console.log(finaljson.length);
                      //     var temp=parseInt(finaljson[i].total);
                      //
                      //   while(finaljson[i].state==s){
                      //     // temp+=parseInt(finaljson[i].total);
                      //     console.log(temp);
                      //     s++;
                      //   }
                      // }
                     console.log(finaljson);
                      // fs.writeFile('data.json', JSON.stringify(finaljson) , 'utf-8');
  }

  function TotalGeneral(state,total){
    var obj={
      "state": state,
      "total": total
    }
    return obj;
    };
