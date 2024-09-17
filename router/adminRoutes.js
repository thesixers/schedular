import { Router } from "express";
import User from "../model/user.js";
import session from "../model/session.js";
import Admin from "../model/admin.js";
import { checkAdmin, createToken, handleError } from "../middleware/allmiddleware.js";
import env from 'dotenv';
env.config();

const {JWT_SECRET} = process.env;

const router = Router();

// router.get('*', checkAdmin);

router.get('/', checkAdmin, async (req,res) =>{
    res.render('admin/Dashboard', {title: 'Admin Dashboard'});
});

router.get('/manage-users', checkAdmin, (req,res) =>{
    res.render('admin/User', {title: 'Manage Users'})
})

router.get('/login', async (req, res)=>{
    res.render('admin/login', {title: 'Admin Login'})
});

router.post('/login', async (req,res)=>{
    let {email, password} = req.body;
    let maxAge = 1 * 24 *60 *60;
   try{
    let user = await Admin.login({email, password});

    let token = createToken(user._id, JWT_SECRET);
    res.cookie('SMDA', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.status(200).json({M: 'Wellcome Boss 👍 !!!'})
   }
   catch(err){
    const error = handleError(err);
    res.status(400).json({E: error});
   }

})

router.post('/create-admin', async (req,res)=>{
    let {name, email, password} = req.body;

   try{
    let createAdmin = await Admin.create({name, email, password});

    if(createAdmin) res.status(200).json({M: 'Admin created'})
   }
    catch(err){
        let error = handleError(err);
        console.log(error);
        res.status(400).json({E: error}); 

   }

});




export default router;