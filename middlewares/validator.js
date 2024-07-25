const isValidated = (req,res,next)=>{

    if(req.session.isValidUser){

        next()
    }
    else{

        req.session.msg = "You are a New User Please Register First !!!"

        res.redirect("/UsersApp/register")
    }
}


export default isValidated