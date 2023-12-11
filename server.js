require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoDB = process.env.DATABASE_URL;
const path = require('path');
const port = 6969;
const host = "localhost";

const routes = require('./routes/jokes'); // Refers to routes/jokes.js

/*
// Method 1
mongoose.connect(mongoDB);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected',(error) => {
    console.log('Database connected');
})
*/

// Method 2
async function connectDatabase(){
    await mongoose.connect(mongoDB);
}

connectDatabase().then(console.log("Database connected")).catch((err) => console.log(err));


/*
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error',(error) => { console.log("Something wrong here boss!") });
db.once('open',() => { console.log("Connected to Database ")})

*/

app.use(express.static('public'));
app.use(express.json());

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

app.use('/api',routes); // localhost/api -> routes/jokes.js

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/facts',(req,res) =>{
    dumbFetch("https://cherybloo.github.io/suicidal-jokes-api/suicidal.json").then((data) => {
        let index = Math.floor(Math.random() * data.length);
        res.json(data[index]);
    })
    //res.redirect("/");
})

app.listen(port,(err)=>{
    console.log(err? "Something wrong here boss" : `Listening to ${host}:${port}`);
})
