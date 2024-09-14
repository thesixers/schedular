import { Router } from "express";
import User from "../model/user.js";
import { createToken, handleError } from "../middleware/allmiddleware.js";
import env from 'dotenv';
env.config();

let {JWT_SECRET} = process.env;

const router = Router()

router.get('/login', (req,res)=>{
    res.render('login', {title: 'Login'});
});

router.get('/signup', (req,res) =>{
    res.render('signup', {title: 'signup'})
});

router.post('/signup', async (req,res)=>{
    const { name, email, password } = req.body;
    console.log({ name, email, password });

    try{

       let newUser = await User.create({ name, email, password });
        res.json({M: 'Account created!!!'});
    }
    catch(err){
        let error = handleError(err);
        res.status(400).json({E: error});
    }
});

router.post('/login', async (req,res)=>{

    let { email, password } = req.body;
    const maxAge = 1 * 24 * 60 * 60;

    try{

       let user = await User.login({ email, password });
       let token = createToken(user._id, JWT_SECRET);
       res.cookie('SMD', token, {httpOnly: true, maxAge: maxAge * 1000});
       res.status(200).json({M: 'login succesfull 👍 !!!'});

    }
    catch(err){
        let error = handleError(err);
        res.status(400).json({E: error}); 
    }
});

router.get('/logout', async (req,res)=>{
    res.cookie('SMD', '', {httpOnly: true, maxAge: 1});
    res.redirect('/auth/login');
})

export default router;