const mongoose = require('mongoose'); 
const dotenv = require('dotenv'); 

dotenv.config()

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
         useNewUrlParser: true,
         useUnifiedToplogy: true,
        });

        console.log(`Mongodb connected: ${conn.connection.host}`);
    }catch(error) { 
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB