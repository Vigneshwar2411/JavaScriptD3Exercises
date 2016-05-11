var fs= require ("fs");
var maleintotal=0;
var femaleintotal=0;
var finaljson=[];

fs.readFile('csv/India2011.csv', function(err,data1){
  myJson(data1);
});



function myJson(data1){
          var line=data1.toString().split("\r\n");

          var totalMGeneral=0;
          var headers=line[0].split(",");
          console.log(headers);

          for(var i=1;i<line.length-1;i++){
                      var currentLine=line[i].split(",");
                      var x;
                      for (var x=01; x<36; x++){
                            if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[7]=="Total Males")
                            {
                              var index = currentLine[1]-1;
                              // console.log(index);
                              var curObj = finaljson[index];
                              //console.log(finaljson);
                              if(curObj==null) {
                                var males=new TotalGeneral(currentLine[1],currentLine[7]);

                                finaljson[index] = males;
                              } else {
                                var temp=parseInt(curObj.total);
                                temp+=parseInt(currentLine[7]);
                                curObj.total=temp;
                                finaljson[index] = curObj;
                              }

                            }

                          }
                      }
                      // var s=01;
                      // for(var i=0;i<finaljson.length;i++){
                      //
                      //   while(finaljson[i].state==s){
                      //     //totalMGeneral=totalMGeneral+parseInt(finaljson[i].total);
                      //     //console.log(finaljson[i].state);
                      //     s++;
                      //   }
                      // }
                    //console.log(finaljson);
                    //    fs.writeFile('data.json', JSON.stringify(finaljson) , 'utf-8');
  }

  function TotalGeneral(state,total){
    var obj={
      "state": state,
      "total": total
    }
    return obj;
    };
