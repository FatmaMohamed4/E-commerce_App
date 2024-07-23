import dotenv from 'dotenv'
import connectDB from './connectDB.js';
import app from './app.js';
dotenv.config({path:'./config.env'})

const port=process.env.PORT||5000
const server =app.listen(port,()=>{
    console.log(`server is Running in port ${port}`)
})

connectDB();


// Errors out Express as promises (ex.. DB  connection )

process.on('unhandledRejection',(err)=>{
    console.error(`Unhandled Rejection is :${err.name} | ${err.message}`)
    server.close(()=>{
        console.log(`**************** Shut Down this server due to : ${err.name} **************** `)
        process.exit(1)
    })
})




