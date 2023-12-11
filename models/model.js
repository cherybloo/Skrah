const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const randomJokeSchema = new Schema({
    randomJoke: {type: String, required: true},
    dateCreated: {type: Date, required: true, default: Date.now()},
})

const questionJokeSchema = new Schema({
    question: {type: String, required: true,},
    answer: {type: String, required: true,},
    dateCreated: {type: Date, required: true, default: Date.now()},
})

// Method 1
module.exports = {
    RandomJoke : mongoose.model('RandomJoke',randomJokeSchema),
    QuestionJoke : mongoose.model('QuestionJoke',questionJokeSchema)
}

// Method 2
/*
const randomJoke = mongoose.model('RandomJoke',randomJokeSchema);
const questionJoke = mongoose.model('QuestionJoke',questionJokeSchema);
module.exports = {
    RandomJoke : randomJoke,
    QuestionJoke ; questionJoke,
}
*/
// First Argument is the singular name of the collection that will be created for the model
// Second Argument is the schema we used to create the model