const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {RandomJoke,QuestionJoke} = require('../models/model'); // Back one directory to /models/model.js
//const {RandomJoke} = require('../models/model');
// ROUTES = localhost:6969/api/...

// POST
router.post('/:type?', async (req,res) => {
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
    await Promise.all([RandomJoke.find(),QuestionJoke.find()])
    .then((result) => {
        res.send(result)
    })
})

// GET BY ID
router.get('/:type?/:id?', getJokes, async (req,res) => {
    await res.joke.findById(req.params.id)
    .then(
        (result) => {
            res.json(result)
        }
    )
    .catch(
        (err) => {
            res.status(400).json({message:err.message})
        }
    )
})

// UPDATE
router.patch('/:type?/:id?', getJokes, async (req,res) => {
    await res.joke.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    )
    .catch( (err) => {
        res.status(400).json({message:err.message})
    })
})

// DELETE
router.delete('/:type?/:id?', getJokes, async (req,res) => {
    await res.joke.findByIdAndDelete(req.params.id)
    .then( (status) => {
        console.log(status)
    })
    .catch( (err) => {
        res.status(500).json({ message: "BRUH" });
    })
})

// Middleware for every request (GET BY ID, DELETE, UPDATE,)
async function getJokes(req,res,next)
{
    let jokesType = req.params.type;
    let joke;

    console.log(jokesType)
    console.log(req.params.id)

    if (!req.params.type)
    {
        return res.status(404).json({ message: "Cannot find something without Joke Type"});
    }

    if (!req.params.id || !req.params.type)
    {
        return res.status(404).json({ message: "Cannot find something without ID"});
    }

    switch(jokesType)
    {
        case 'randomJoke':
            try
            {
                joke = await RandomJoke;
                res.joke = joke;
            }
            catch (err)
            {
                res.status(500).json({ message: err.message });
            }
            break;
        case 'questionJoke':
            try
            {
                joke = await QuestionJoke;
                res.joke = joke;
            }
            catch (err)
            {
                res.status(500).json({ message: err.message})
            }
            break;
        default:
            return res.json(500).json({ message: "Really dude no joke option? "});
    }

    next() // Allow the program to continue with the rest of the request
}

module.exports = router;