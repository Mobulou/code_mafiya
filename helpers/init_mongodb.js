const mongoose=require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{dbName:process.env.DB_NAME}).then(()=>{
    console.log("Mongodb Connected")
}).catch((err)=>console.log(err.message));


mongoose.connection.on('connected',()=>{
    console.log("mongoose connected with db")})

mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnected',()=>{
 console.log("mongoose connection is disconnected")
})


process.on('SIGINT', async()=>{
   await mongoose.connection.close();
    process.exit(0)
})