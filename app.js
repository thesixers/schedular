import express from 'express';
import mongoose from "mongoose";
import morgan from "morgan";
import fileuploader from 'express-fileupload';
import cookieParser from 'cookie-parser';
import authRoutes from './router/authRoutes.js';
import otherRoutes from './router/otherRoutes.js';
import adminRoutes from './router/adminRoutes.js';
import env from "dotenv";
import { loop_Session } from './middleware/enforcer.js';

env.config();
const { PORT, MONGO_URI } = process.env;

const app = express();  
 
// Mongoose connection function
async function connect_To_Mongo(){
    try{
       await mongoose.connect(MONGO_URI)
       app.listen(PORT, () =>{
        console.log(`Boss we have connected to MONGO,
We are now live in port ${PORT}`);
    })
    }
    catch(err){
        console.error(err);
    }
} 
 
connect_To_Mongo();  

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(fileuploader({ useTempFiles: true }));

setInterval((e) => {
    loop_Session();
}, 60000);

app.get('/',(req,res)=>{
    res.redirect('/gx/home');
})

app.get('/home', (req,res)=>{
    res.render('HomePage')
});

app.use('/auth', authRoutes);

app.use('/user', otherRoutes); 

app.use('/admin', adminRoutes)

// 404 handler
app.use((req, res) => {
    res.status(404).render('404'); 
});
  