function createJsonThree(currentLine)
{

  if((currentLine[2]==="Rural population"||currentLine[2]==="Urban population") && (countries.indexOf(currentLine[0])!==-1))
  {
    var flag=0;

        for(var j=0;j<JSON_Three.length;j++)
        {
          // console.log(JSON_Three.length);
          if(JSON_Three[j]["Year"]===currentLine[4])
          {

            // console.log("here5");
            if(currentLine[2]==="Rural population")
            {
              // console.log("Here6");
              // console.log(JSON_Three[j]["Rural"]);
              JSON_Three[j]["Rural"] = parseFloat(JSON_Three[j]["Rural"]) + parseFloat(currentLine[5]);//parseFloat
              // flag++;
            }
            else if(currentLine[2]==="Urban population")
             {               //console.log(JSON_Three[j]["Urban"]);

              JSON_Three[j]["Urban"] = parseFloat(JSON_Three[j]["Urban"]) + parseFloat(currentLine[5]);
              // flag++;
            }
            flag++;
            break;
          }
          // else {
          //   flag=0;
          //   break;
          // }

          // flag++;
          // break;
        }
        // console.log(flag);
        if(flag==0)
        {
            // JSON_Three.push(createReqObj(currentLine));
            if(currentLine[2]==="Urban population")
            {
              JSON_Three.push({"Year":currentLine[4],
                                "Urban": currentLine[5],
                                "Rural": 0
                              });
            }
            else
            {
              JSON_Three.push({"Year": currentLine[4],
                                "Urban": 0,
                                "Rural": currentLine[5]
                               });
            }
        }

  }
}





fs.writeFile('jsonfinal2/saltsugar.json', JSON.stringify(SaltSugar) , 'utf-8');
