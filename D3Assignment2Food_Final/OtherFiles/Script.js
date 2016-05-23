var allTheLines=[];
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('csv/FoodFacts.csv')
});

var count=0;
var sugarIndex=0;
var saltIndex=0;
var countryIndex=0;
var sugarArray=[];
var saltArray=[];
var sugarSalt=[];
var labelArray=['France','en:FR','United Kingdom','en:GB','United States','en:US','US','Usa','Spain','España','en:ES','Netherlands','holland','Australia','en:AU','Canada','en:CH','South Africa','Germany'];
var actualArray=['France','France','United Kingdom','United Kingdom','United States','United States','United States','United States','Spain','Spain','Spain','Netherlands','Netherlands','Australia','Australia','Canada','Canada','South Africa','Germany'];
rl.on('line', (line) => {

  var allTheWords=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if(count==0)
        {
          sugarIndex=allTheWords.indexOf('sugars_100g');
          saltIndex=allTheWords.indexOf('salt_100g');
          countryIndex=allTheWords.indexOf('countries');
        }
        else {
          var countryName;
          if(labelArray.indexOf(allTheWords[countryIndex])!=-1)
          {
            countryName=actualArray[labelArray.indexOf(allTheWords[countryIndex])];
            //console.log(countryName+""+count);
          if(count==1)
          {
            var obj={};
            obj['country']=countryName;
            if(allTheWords[sugarIndex].length==0)
            {
              obj['sugarValue']=Number(0);
            }
            else {
              obj['sugarValue']=Number(allTheWords[sugarIndex]);
            }
            if(allTheWords[saltIndex].length==0)
                obj['saltValue']=Number(0);
              else
              obj['saltValue']=Number(allTheWords[saltIndex]);
            sugarArray.push(obj);
          }
          else {
            var present=0;
            for(var i=0;i<sugarArray.length;i++)
            {
              if(countryName=='South Africa')
              //console.log(countryName+" "+allTheWords[sugarIndex]+" "+allTheWords[saltIndex]);
              if(sugarArray[i].country==countryName)
              {
                if(allTheWords[sugarIndex].length!=0)
                {
                  sugarArray[i]['sugarValue']=sugarArray[i]['sugarValue']+Number(allTheWords[sugarIndex]);
                }
                if(allTheWords[saltIndex].length!=0)
                {
                  sugarArray[i]['saltValue']=sugarArray[i]['saltValue']+Number(allTheWords[saltIndex]);
                }
                present=1;
              }
            }
            if(present==0)
            {

              var obj={};
              obj['country']=countryName;
              if(allTheWords[sugarIndex].length==0)
                obj['sugarValue']=Number(0);
                else
                obj['sugarValue']=Number(allTheWords[sugarIndex]);
                if(allTheWords[saltIndex].length==0)
                    obj['saltValue']=Number(0);
                  else
                  obj['saltValue']=Number(allTheWords[saltIndex]);
                sugarArray.push(obj);
            }
          }//end of else
        }//end of labelfound
        }//end of else
      //  console.log(count);
        //console.log(sugarArray);
  //end of count<15

  count++;
  if(count==65503)
  {
    var obj={};
    obj['sugar']=sugarArray;
    sugarSalt.push(obj);
    obj={};
    obj['salt']=saltArray;
    sugarSalt.push(obj);
    var result=JSON.stringify(sugarSalt);

  var array=JSON.stringify(saltArray);
  var arr=JSON.stringify(sugarArray);
//  fs.writeFile('salt.json',array,'utf8');
console.log(sugarArray);
  fs.writeFile('newSaltSugar.json',arr,'utf8');

}
});


//console.log(allTheLines.length);
