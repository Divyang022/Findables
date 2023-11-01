const LocalStrategy = require('passport-local').Strategy;
const User=require('../models/signup')

 //Passport uses the concept of strategies to authenticate requests. Strategies can range from verifying username and password credentials, delegated authentication
module.exports=function(passport){
    passport.use(new LocalStrategy({usernameField:'username'},(username,password,done)=>{
        User.findOne({username:username}) //promises in js
        .then(user=>{ // if promise fulfill
            if(!user){
                done(null, false,{message:'email not registered'})
            }
            var dbpassword=user.password
            if(dbpassword==password){
                console.log("Login successfull !")
                return done(null,user,{message:"Logged in successfully !"})
            }
            else{
                console.log('Please check again !')
                return done('Validation failed', false,{message:"Password incorrect"}) // done is callback in passport.js
            }
        })
        .catch(err=>console.log(err))
    }))
    passport.serializeUser(function(user, done) {
        console.log('serialize')
        done(null, user.email);
      });

      //The serializeUser function is used to determine what data should be stored 
      //in the session to identify the user. In this case, it stores the user's email in the session.
    
    passport.deserializeUser(function(id, done) {
        console.log('deserialize')
    
        User.findOne({email}).lean().exec((err,user)=>{
            done(err,user)
        })

        //lean-> the documents are returned as plain objects.

        //When a user makes subsequent requests after logging in, Passport will deserialize the user's data by retrieving it from the session.
        
    });
}