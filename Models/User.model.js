const mongoose=require('mongoose');
const bcrypt=require("bcrypt")
const Schema=mongoose.Schema


const UserSchema=new Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.pre('save', async function(next){
    try{
  const salt= await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(this.password,salt);
  this.password=hashedPassword
  next()
//   console.log(this.email,this.password)
    }catch(error){
   next (error)
    }
})

// UserSchema.post("save", async function () {
//   try {
//     console.log("Called After  saving a user");
//   } catch (error) {
//     next(error);
//   }
// });
const User=mongoose.model('user',UserSchema)

module.exports=User


//End to End