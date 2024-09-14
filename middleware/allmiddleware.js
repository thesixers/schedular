import jwt from "jsonwebtoken";
import env from 'dotenv';
import notification from "../model/notification.js";
import User from "../model/user.js";
import session from "../model/session.js";
import Enforcement from "../model/enforcement.js";

env.config();

const { JWT_SECRET } = process.env;

const maxAge = 1 * 24 * 60 * 60;

export const createToken = (id, secret) =>{
    return jwt.sign({id}, secret, {expiresIn: maxAge})
}

export const handleError = (err) =>{
    const error = { email: '', password: '' };

    if(err.code === 11000) if(err.message.includes('email_1 dup key')) error.email = 'This email already exists consider loging in';

    if(err.message === 'invalid user') error.email = 'There is no user with this email';

    if(err.message === 'password field is empty') error.email = 'Pls enter ur password';

    if(err.message === 'incorrect password') error.password = 'incorrect password';


    return error;
}

export const checkToken = (req,res,next) =>{
    let token = req.cookies.SMD;

    if(!token) res.redirect('/auth/login');

    if(token){
        jwt.verify(token, JWT_SECRET, async (err,decodedtoken)=>{
            if(err) res.redirect('/auth/login');

            const id = decodedtoken.id;
            var user = await User.findById(id);
            var s = await session.find({userId: id});
            var n = await notification.find({userId: id});
            var e = await Enforcement.findOne({userId: id});

            res.locals.details = {user,s,n,e}
            next(); 
        }); 
    }
   
}