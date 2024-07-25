console.log("========== Welcome =============")

import express from 'express'

import router from './routes/routes.js'

import session from 'express-session'

import MongoStore from 'connect-mongo'

import mongoose from 'mongoose'

import {} from 'dotenv/config'




const uri = process.env.MONGO_URI

// create a session store to store sessionsin mongodb 

const my_session_store = MongoStore.create({

    mongoUrl : uri ,

    dbName : "KiaElectric" ,

    collectionName : "Kia_User_Sessions"

})



const app = express()


// Creating a middelware to use session object

app.use(session({

     secret : "Any secret key to Sign Cookies" ,

     resave : false ,

     saveUninitialized : false ,

     store : my_session_store



}))

const port = process.env.PORT || 8080   

// For using static resources in public folder

app.use(express.static('public'))

// For receiving form data 

app.use(express.urlencoded({extended:true}))

// To set ejs as view engine

app.set('view-engine','ejs')

app.listen(port,()=>{

    console.log(`App is listening at port ${port}`)
})


// Using router as a middleware


app.use("/UsersApp",router)


app.get("/test",(req,res)=>{


    console.log(req.session)

    console.log(req.sessionID)

    req.session.user = "Robert"

    req.session.pwd = "password_secret"

  

    console.log(req.session)

    res.render('test.ejs')


})