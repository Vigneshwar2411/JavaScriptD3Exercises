var fs= require ("fs");

fs.readFile('csv/India2011.csv', function(err,data1){
  myJson(data1);
})

function myJson(data1){
          var line=data1.toString().split("\r\n");
          var finaljson=[];
          var totalMales;
          var headers=line[0].split(",");
          for(var i=1;i<line.length-1;i++){
                      var currentLine=line[i].split(",");
                      var x;
                      for (var x=01; x<36; x++){
                            if(currentLine[1]==x && currentLine[4]==="Total" && currentLine[5]==="All ages" && headers[7]=="Total Males")
                            {
                              var obj={};
                              // for(j=0 ;j<headers.length;j++)
                              // {
                              //   obj[headers[j]]=currentLine[j];
                              // }
                              // console.log(obj);
                              var males=new MaleTotal(currentLine[3],currentLine[7]);
                              //totalMales="Total Males in "+currentLine[3].toString()+" are "+currentLine[7];
                              obj = JSON.stringify(males);

                              console.log(obj);

                              //console.log("Total Males in "+currentLine[3]+" is "+currentLine[7]);
                            }

                          }

                      }

  }

  function MaleTotal(state,total){
    this.state=state;
    this.total=total;
  }








  fs.readFile('csv/IndiaSC2011.csv', function(err,data){
    myJsonSC(data);
  })



  function myJsonSC(data){
            var lineSC=data.toString().split("\r\n");
            var finaljsonSC=[];
            var totalMalesSC;
            var headersSC=lineSC[0].split(",");
            for(var i=1;i<lineSC.length-1;i++){
                        var currentLineSC=lineSC[i].split(",");
                        var x;
                        for (var x=01; x<36; x++){
                              if(currentLineSC[1]==x && currentLineSC[4]==="Total" && currentLineSC[5]==="All ages" && headersSC[7]=="Total Males")
                              {
                                var objSC={};
                                // for(j=0 ;j<headers.length;j++)
                                // {
                                //   obj[headers[j]]=currentLine[j];
                                // }
                                // console.log(obj);
                                var females=new femaleTotal(currentLineSC[3],currentLineSC[7]);
                                //totalMales="Total Males in "+currentLine[3].toString()+" are "+currentLine[7];
                                objSC = JSON.stringify(females);

                                console.log(objSC);

                                //console.log("Total Males in "+currentLine[3]+" is "+currentLine[7]);
                              }

                            }

                        }

    }

    function femaleTotal(state,total){
      this.state=state;
      this.total=total;
      this. = function (name) {
        this.lastName = name;
    };
    }






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
                          var s=01;
                          for(var i=0;i<finaljson.length;i++){

                            while(finaljson[i].state==s){

                              console.log(finaljson[i].state);
                              s++;
                            }
                          }
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
        
