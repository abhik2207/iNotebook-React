const mongoose = require('mongoose');

const mongoURI = "mongodb://0.0.0.0:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {
    try {
        mongoose.connect(mongoURI);
        console.log(" --> Connected to MongoDB successfully! <--");
    }
    catch(error){
        console.log(error);
        process.exit();
    }
}

module.exports = connectToMongo;