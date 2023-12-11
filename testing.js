require('dotenv').config();

const mongoose = require('mongoose');
const db = process.env.DATABASE_URL;

main().catch((err) => {
    console.log(err)
});

async function main(){
    await mongoose.connect(db).then(
        console.log("Connected")
    );
}