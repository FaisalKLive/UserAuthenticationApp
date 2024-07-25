import mongoose from "mongoose";
import { type } from "os";
import {} from 'dotenv/config'

const uri = process.env.MONGO_URI



mongoose.connect(uri).then(()=>console.log("#################### Connected to Mongodb ################"))
.catch((error)=>{console.log(`Connection Failed Due To Error Below\n${error}`)})

const userSchema = mongoose.Schema({

    name : {type:String,required:true},

    email : {type:String,required:true},

    password   : {type:String,required:true},




})

const userModel = mongoose.model("KiaUser",userSchema)

export default userModel
