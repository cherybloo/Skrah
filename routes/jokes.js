const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {RandomJoke,QuestionJoke} = require('../models/model'); // Back one directory to /models/model.js
//const {RandomJoke} = require('../models/model');
// ROUTES = localhost:6969/api/...

// POST
router.post('/post/:type?', async (req,res) => {
    var jokesType = req.params.type;
    var data;

    switch(jokesType){
        case 'questionJoke':
            data = await QuestionJoke.create({
                question: req.body.question,
                answer:  req.body.answer,
            }).catch((err) => {
                res.status(400).json({message:'bloon'})
            });

            res.json(data);
            break;

        case 'randomJoke':
            data = await RandomJoke.create({
                randomJoke: req.body.randomJoke,
            }).catch((err) => {
                res.status(400).json({message:'tolol'})
            });

            res.json(data)
            break;
            
        default:
            res.json({message: 'looking something son?'})
            break;
    }
})

// GET ALL (Learn more about async, await,then and PROMISES!)
router.get('/all', async (req,res) => {
    // Method 1
    await RandomJoke.find().then((data) =>{
        res.json(data);
    })
    .catch((err) => {
        res.status(500).json({error:"HAH BIRCH"})
    })

    // Method 2
    /*
    try{
        const data = await RandomJoke.find();
        res.json(data);
    }
    catch{
        res.status(500).json({message:'HSKFSF'})
    }
    */
})

// GET BY ID
router.get('/get/:type?/:id?', async (req,res) => {
    var jokesType = req.params.type;
    var data;

    switch(jokesType)
    {
        case 'questionJoke':
            try{
                data = await QuestionJoke.findById(id);
            }
            catch{
                data = await QuestionJoke.find();
            }
            res.json(data);
            break;
        
        case 'randomJoke':
            try{
                data = await RandomJoke.findById(id);
            }
            catch{
                data = await RandomJoke.find();
            }
            res.json(data);
            break;
        
        default:
            res.json({message: 'looking something son?'})
            break;
    }
})

// UPDATE
router.patch('/update/:type/:id',async (req,res) => {

})

// DELETE
router.delete('/delete/:type/:id', async (req,res) => {
    var userparam = req.query.type;
    res.send("DELETE ENDPOINT");
})


module.exports = router;