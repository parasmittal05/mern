const mongoose = require('mongoose');
const URI  = "mongodb://localhost:27017/mern" ;


const connectDb = async()=>{
    try {
        await mongoose.connect(URI);
        console.log("MongoDB Connected...");
      } catch (err) {
          console.error("database connection failed");
          process.exit(0);
      }
};
module.exports=connectDb;