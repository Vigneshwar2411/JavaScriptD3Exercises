var s="vignesh";

function myFunction(){
  var obj= document.getElementById("p1").innerHTML;
  var len=obj.length;
  s=s.concat("war");
  alert(s);
  document.getElementById("demo").innerHTML=len;
  alert(len);

  var foo=[1,2,true,"hi"];
  alert(foo.length);

  foo.push("Welcome");
  alert(foo.length);
  var r="Wipro";

  var person={
    name:"Vignesh",
     age:23,
     company1 : function(){
       return r+""+this.name;
     }
   };
    document.getElementById("demo").innerHTML=person.company1();
}
var counter=1;
var add= (function(a,b){
  counter=0;
  return function (){return counter+1;}
})();

document.getElementById("Add").innerHTML= add() ;
    function Car(type,price,color){
      this.type=type;
      this.price=price;
      this.color=color;
    }

    Car.prototype.speed=200;
    var car1=new Car("BMW",20,"red");
    document.getElementById("car").innerHTML=car1.speed;
