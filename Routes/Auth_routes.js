
const express=require('express')
const router =express.Router();
const createError=require('http-errors')
const User=require('../Models/User.model')
const {authSchema}=require('../helpers/validation_Schema');
const {signAccessToken}=require('../helpers/jwt_helper')
router.post('/register',async(req,res,next)=>{
  console.log(req.body)
   try{

    // if(!email || !password){
    //   throw createError.BadRequest()
    // }
    const result=await authSchema.validateAsync(req.body)
  
const doesEist=await User.findOne({email:result.email})
  if(doesEist){
    throw createError.BadRequest(`${result.email} is already have been registered`)
  }else{
    const user=new User(result)
    const saveuser=await user.save()
    const accessToken=await signAccessToken(saveuser.id)
    res.send(accessToken);
  }
   }catch(error){
    if(error.isJoi==true){
      error.status=422
    }
  next(error)
   }
});

router.post("/login", async (req, res, next) => {
  res.send("login route");
});

router.post("/refresh-token", async (req, res, next) => {
  res.send("refresh-token route");
});


router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});





module.exports=router