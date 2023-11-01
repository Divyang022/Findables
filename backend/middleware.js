const jwt=require('jsonwebtoken') //It is commonly used for securely transmitting information between a client (such as a web browser) and a server.


//This middleware is responsible for verifying the user's token sent in the request's Authorization header and
// making sure the user is authenticated before allowing access to protected routes.

//The middleware first checks if the Authorization header exists in the incoming request.
// If it does, it proceeds with the verification process; otherwise, it sends a response indicating that there is no authorization.

//It verifies the token using the jwt.verify() method from the jsonwebtoken library, using the provided JWT secret (process.env.JWT_SECRET). 
//If the token is valid, it decodes the user information and stores it in the req.user property.

exports.requireSignin=(req,res,next)=>{
    // console.log(req)
    console.log("Inside require sign in ",req.headers.authorization)
    if(req.headers.authorization){
        console.log("Header Verification")
        // console.log("Request is : ",req.body)
        const token=req.headers.authorization.split(" ")[1]
        // console.log(token)
        const user =jwt.verify(token,process.env.JWT_SECRET)  // If the verification is successful, it returns the decoded payload of the JWT, which typically contains information about the user.
        // console.log("User is : ",user)
        req.user=user
        req.role='user'
        next()
    }
    else{
        console.log("No Authorization")
        res.status(400).json({message:"No Authorization"})
    }
}

exports.userMiddleware=(req,res,next)=>{
    // console.log("Username is : ",req.role)
    console.log("Inside usermiddleware")
    if(req.role!="user"){
        return res.status(400).json({message:"Access Denied"})
    }
    next()
}

