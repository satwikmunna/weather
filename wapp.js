const express=require("express");

const https=require("https");
const body=require("body-parser");
const app=express();
app.use(body.urlencoded({extended:true}));

app.get("/",function(req,res){


res.sendFile(__dirname+"/w.html");

})
app.post("/",function(req,res){


  const city=req.body.cityname;
  const apiKey="5c57de7fe85b3f44bc4109885e5a0f05"

  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric";
  

  https.get(url,function(response){

  response.on("data",function(data){

  const wdata=JSON.parse(data);

  const temp=wdata.main.temp;

  const des=wdata.weather[0].description
  res.write("<p>the weather is :"+des+"<p>");
  res.write("<h1>The temperature in "+city+" is :"+ temp + "degrees celcius.</h1>");
  res.write("<img src=http://openweathermap.org/img/wn/"+wdata.weather[0].icon+"@2x.png >");
  res.send();


  })

  })

})




app.listen(3000,function(){


  console.log("server is running");
})
