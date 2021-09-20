const mongoose = require('mongoose');
require('dotenv/config');
async function connectDb(){
  try{
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser:true,
      useUnifiedTopology:true
    });
  }catch(err) {
    console.log(err);
  }
}

module.exports = connectDb;

// {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
// }).then(() => console.log('DB Connection')).catch((err) => console.log('Error' + err));
