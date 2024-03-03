const mongoose = require("mongoose")

 const ConnectDb =  async() => {
    try {
        const connect =  await mongoose.connect(process.env.MONOGDB_ULI,{

    })
    console.log(`database connected`,connect.connection.host)
    } catch (error) {
        
    }
   

}
module.exports = ConnectDb