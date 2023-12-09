const express = require('express');
const app = express();
const port = 6969;
const host = "localhost";

//Async & Await Function (Learn more & also Promise)
async function dumbFetch(url){
    const response = await fetch(url,{
        method:"GET",
        headers:{
           "Content-Type": "application/json",
        },
    });
    return response.json();
}

app.get('/',(req,res) => {
    res.send("Hello World");
})

app.get('/facts',(req,res) =>{
    dumbFetch("https://cherybloo.github.io/suicidal-jokes-api/suicidal.json").then((data) => {
        let index = Math.floor(Math.random() * data.length);
        res.json(data[index]);
    })
})

app.listen(port,(err)=>{
    console.log(err? "Something wrong here boss" : `Listening to ${host}:${port}`);
})