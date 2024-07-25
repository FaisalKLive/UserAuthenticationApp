
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'

class  Controller{


    static login_get = (req,res)=>{

       

        const my_msg = req.session.msg 

        delete req.session.msg

        // console.log("=================== This is From Login Page ============= !!!")

        // console.log(req.session)
        
        // console.log(req.session.user)

        // delete req.session.user

        // console.log(req.session)

        res.render("login.ejs",{my_msg})
    }



    static login_post = async (req,res)=>{

        try{

           const data = req.body

           const userMatched = await userModel.findOne({email:data.email})

           console.log("^^^^^^^^^^^^^^^^^^^")
           console.log(userMatched)
           console.log("^^^^^^^^^^^^^^^^^^^")


           if(!userMatched){
            
             console.log("A New User")

             req.session.msg = "You are a new User Please Register First !!!"

             res.redirect("/UsersApp/register")


           }
           else{

           console.log("This is a valid user !!!!")

            const pwd_matched = await bcrypt.compare(data.pwd,userMatched.password)

            console.log(pwd_matched)

            if(pwd_matched){

                console.log("Password Matched")

                req.session.msg = "Login Successfull You are a valid user Please proceed With dashboard !!!"
           
                req.session.isValidUser = true
                

                res.redirect('/UsersApp/dashboard')
           
            }
            else{

                console.log("Password Not Matched")

                req.session.msg = "InCorrect Password Please Enter a Correct Password !!!"

                res.redirect('/UsersApp/login')
            
            }


           }




        }catch(error){
            console.log(error)

            res.send(error)
        }

       
    }








    

    static register_get = (req,res)=>{


        const my_msg = req.session.msg

        delete req.session.msg

        res.render("register.ejs",{my_msg})
    }


    // ?name=&email=&pwd=
    static register_post = async (req,res)=>{

       try{

        const data = req.body

        const hashed_pwd = await bcrypt.hash(data.pwd,12)

        const existingUser = await userModel.findOne({email:data.email})

        console.log(existingUser)

        if(!existingUser){
      
            const user_to_add = new userModel({

                  name : data.name ,

                  email : data.email ,

                  password :  hashed_pwd


            })

            const user_saved = await user_to_add.save()

            req.session.msg = "Registration Successfull"

             res.redirect('/UsersApp/login')
        }
        else{

          req.session.msg = "You are already Registered Please Login"

          res.redirect('/UsersApp/login')
        }





       }catch(error){

        console.log(error)

        res.send(error)
       }

       

    }


    static dashboard_get = (req,res)=>{

        const my_msg = req.session.msg

        delete req.session.msg

        res.render("dashboard.ejs",{my_msg})
    }  


    static logout_post = (req,res)=>{

        req.session.destroy((err) => {
            if (err) throw err;
            res.redirect("/UsersApp/login");
          });
    }


}


export default Controller