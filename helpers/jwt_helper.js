const JWT=require("jsonwebtoken");
const createError=require("http-errors");


module.exports={
   signAccessToken:()=>{
    return new Promise ((resolve,reject)=>{
        const payload={
            name:"Your Truly"
        }
        const secret="some super secret"
        const options={}
        JWT.sign(payload,secret,options,(err,token)=>{
            if(err) reject (err)
            resolve(token)
        })
    })
   }
}