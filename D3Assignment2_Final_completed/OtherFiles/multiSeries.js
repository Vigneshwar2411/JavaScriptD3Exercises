var allTheLines=[];
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('FoodFacts.csv')
});

var count=0;
var firstColumn=1;
var cEurope=['France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands'];
var nEurope=['United Kingdom', 'Denmark', 'Sweden','Norway'];
var sEurope=['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia','Albania'];
var fatArray=[];
var proteinArray=[];
var carbohydratesArray=[];
var fatProteinCarbohydrates=[];
var fat=0;
var proteins=0;
var carbohydrates=0;
var fatIndex=0;
var proteinIndex=0;
var carbohyIndex=0;
rl.on('line', (line) => {

  var allTheWords=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

  if(count==0)
  {

    fatIndex=allTheWords.indexOf('fat_100g');
    console.log(fatIndex);
    console.log(allTheWords[fatIndex]);
    proteinIndex=allTheWords.indexOf('proteins_100g');
    console.log(proteinIndex);
    carbohyIndex=allTheWords.indexOf('carbohydrates_100g');
    console.log(carbohyIndex);
  }
  else
  {
    //console.log(allTheWords[33]);
    fat=allTheWords[fatIndex];
    //console.log(fat);
    proteins=allTheWords[proteinIndex];
    //console.log(proteins);
    carbohydrates=allTheWords[carbohyIndex];
    //console.log(carbohydrates);
    var flag=false;
    var continentName;
    if(cEurope.indexOf(allTheWords[33])!=-1)
    {
    continentName='centralEurope';
    flag=true;
  }
    else if(nEurope.indexOf(allTheWords[33])!=-1)
    {
    continentName='northEurope';
    flag=true;
  }
    else if(sEurope.indexOf(allTheWords[33])!=-1)
    {
    continentName='southEurope';
    flag=true;
  }
    //console.log(continentName);
    if(flag)
    {
    if(firstColumn==1)
    {
      firstColumn++;
        var obj={};
        obj['continent']=continentName;
        if(fat.length==0)
        obj['value']=Number(0);
        else
        obj['value']=Number(fat);
        fatArray.push(obj);

        //console.log(fatArray);
        obj={};
        obj['continent']=continentName;
        if(proteins.length==0)
        obj['value']=Number(0);
        else
        obj['value']=Number(protein);
        proteinArray.push(obj);

        //console.log(proteinArray);
        obj={};
        obj['continent']=continentName;
        if(carbohydrates.length==0)
        obj['value']=Number(0);
        else
        obj['value']=Number(carbohydrates);
        carbohydratesArray.push(obj);
        //console.log(carbohydratesArray);
    }
    else {
      var present=0;
          for(var i=0;i<fatArray.length;i++)
          {
            if(fatArray[i].continent==continentName)
            {
              if(fat.length!=0)
              fatArray[i]['value']=Number(fatArray[i]['value'])+Number(allTheWords[fatIndex]);
            if(proteins.length!=0)
            proteinArray[i]['value']=Number(proteinArray[i]['value'])+Number(allTheWords[proteinIndex]);
            if(carbohydrates.length!=0)
            carbohydratesArray[i]['value']=Number(carbohydratesArray[i]['value'])+Number(allTheWords[carbohyIndex]);
            present=1;
            }
          }
          if(present==0)
          {
            var obj={};
            obj['continent']=continentName;
            if(allTheWords[fatIndex]==undefined)
            obj['value']=Number(0);
            else
            obj['value']=Number(allTheWords[fatIndex]);
            fatArray.push(obj);
            obj={};
            obj['continent']=continentName;
            if(allTheWords[proteinIndex]==undefined)
            obj['value']=Number(0);
            else
            obj['value']=Number(allTheWords[proteinIndex]);
            proteinArray.push(obj);
            obj={};
            obj['continent']=continentName;
            if(allTheWords[carbohyIndex]==undefined)
            obj['value']=Number(0);
            else
            obj['value']=Number(allTheWords[carbohyIndex]);
            carbohydratesArray.push(obj);
          }

    }//end of else
  }
  }//end of else
  count++;
  if(count==65503)
  {
    var obj={};
    obj['key']='fat';
    obj['values']=fatArray;
    fatProteinCarbohydrates.push(obj);
    obj={};
    obj['key']='proteins';
    obj['values']=proteinArray;
    fatProteinCarbohydrates.push(obj);
    obj={};
    obj['key']='carbohydrates';
    obj['values']=proteinArray;
    fatProteinCarbohydrates.push(obj);
    var result=JSON.stringify(fatProteinCarbohydrates);
    console.log(result);
    fs.writeFile('multiseries.json',result,'utf8');
  }
});
