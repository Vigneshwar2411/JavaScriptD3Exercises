const fs = require("fs");
const readLine = require("readline");
var entireData = [];
var headers = [];
var sugarIndex=0 , saltIndex = 0 , countryIndex = 0 ,fatIndex = 0, proteinsIndex = 0 , carboIndex = 0 ,dateIndex = 0;
var count = 0 ;
var countryArray = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
var NorthEurope = ['United Kingdom' , 'Denmark' , 'Sweden' , 'Norway'];
var CentralEurope = ['France' , 'Belgium' , 'Germany' , ' Switzerland' , 'Netherlands'];
var SouthEurope = ['Portugal', 'Greece' , 'Italy' , 'Spain' , 'Croatia' , 'Albania'];
var dateString;
var sugarArray =[];
var SaltSugar = [] , NorthEuropeData = [] ,FPCData = [] , FPCData2 = [];
var obj1 = {};

const data = readLine.createInterface({
  input: fs.createReadStream("csv/FoodFacts.csv")
});


data.on("line", (line) =>{

entireData=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

if(count==0){
  sugarIndex=entireData.indexOf('sugars_100g');
  saltIndex=entireData.indexOf('salt_100g');
  countryIndex=entireData.indexOf('countries_en');
  fatIndex=entireData.indexOf('fat_100g');
  proteinsIndex=entireData.indexOf('proteins_100g');
  carboIndex=entireData.indexOf('carbohydrates_100g');
  dateIndex =entireData.indexOf('last_modified_datetime');
  count++;
  console.log(countryIndex);
}
else{

  if(countryArray.indexOf(entireData[countryIndex])!==-1){
    var sugar = entireData[sugarIndex];
    var salt = entireData[saltIndex];
    if(sugar==''){
        sugar = 0;
    }
    if(salt==''){
        salt = 0;
    }
    var caution = 0;
  for(var i=0;i<SaltSugar.length;i++){
    if(SaltSugar[i]["country"]===entireData[countryIndex]){
      SaltSugar[i]["salt"] = ((parseFloat(SaltSugar[i]["salt"]) + parseFloat(salt)).toFixed(2));
      SaltSugar[i]["sugar"] = ((parseFloat(SaltSugar[i]["sugar"]) + parseFloat(sugar)).toFixed(2));
      caution++;
      break;
    }
  }
  if(caution===0){
    SaltSugar.push({
      "country" : entireData[countryIndex],
      "sugar" : parseFloat(sugar).toFixed(2),
      "salt" : parseFloat(salt).toFixed(2)
    });
  }
}

if((NorthEurope.indexOf(entireData[countryIndex])!==-1) || (CentralEurope.indexOf(entireData[countryIndex])!==-1)
 || (SouthEurope.indexOf(entireData[countryIndex])!==-1)){
  var fat =entireData[fatIndex];
  var proteins = entireData[proteinsIndex];
  var carbo = entireData[carboIndex];
  var caution = 0;
  if(fat == '')
    fat =0;
  if(proteins == '')
    proteins = 0;
  if(carbo == '')
    carbo = 0;
//console.log(FPCData2.length);

  for(var i=0;i<FPCData2.length;i++){
    if((NorthEurope.indexOf(entireData[countryIndex])!==-1))
    FPCDataAdd("NorthEurope",fat,proteins,carbo);
    // if((CentralEurope.indexOf(entireData[countryIndex])!==-1))
    // FPCDataAdd("CentralEurope",fat,proteins,carbo);
    // if((SouthEurope.indexOf(entireData[countryIndex])!==-1))
    // FPCDataAdd("SouthEurope",fat,proteins,carbo);
    caution++;
    break;
  }

  if(caution===0){
    if(NorthEurope.indexOf(entireData[countryIndex])!==-1)
    FPCData("NorthEurope",fat,proteins,carbo);
    // if(CentralEurope.indexOf(entireData[countryIndex])!==-1)
    // FPCData("CentralEurope",fat,proteins,carbo);
    // if(SouthEurope.indexOf(entireData[countryIndex])!==-1)
    // FPCData("SouthEurope",fat,proteins,carbo);
  }

}

function FPCDataAdd(country,fat,proteins,carbo){
  if(FPCData2["region"]==country){
    FPCData2["fat"] = (parseFloat(FPCData2["fat"])+parseFloat(fat)).toFixed(2);
    FPCData2["proteins"] = (parseFloat(FPCData2["proteins"])+parseFloat(proteins)).toFixed(2);
    FPCData2["carbohydrates"] = (parseFloat(FPCData2["carbohydrates"])+parseFloat(carbo)).toFixed(2);
  }


}

function FPCData(country,fat,proteins,carbo){
  FPCData2.push({
    "region": country,
    "fat" : parseFloat(fat).toFixed(2),
    "proteins" : parseFloat(proteins).toFixed(2),
    "carbohydrates": parseFloat(carbo).toFixed(2)
  });
}

}//else End
});//data.on End



data.on("close" , () =>{
  console.log("End Function");
  fs.writeFile('jsonfinal2/saltsugar.json', JSON.stringify(SaltSugar) , 'utf-8');
  //console.log("Literate and Illiterate Male and Female JSON created");
  console.log(SaltSugar);
  console.log(FPCData2);
});
