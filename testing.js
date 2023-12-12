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

const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  
console.log(fetchPromise);
  
fetchPromise.then((response) => {
    console.log(`Received response: ${response.status}`);
    });
  
console.log("Started request…");
  