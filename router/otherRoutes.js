import { Router } from "express";
import session from "../model/session.js";
import notification from "../model/notification.js";
import { checkToken } from "../middleware/allmiddleware.js";
import Enforcement from "../model/enforcement.js";
import User from "../model/user.js";
import { main } from "../middleware/mailsender.js";

const router = Router();

router.get('*', checkToken);

 router.get('/', async (req,res) =>{
    res.render('user/Dashboard',{ title: 'Dashboard' })
 });

 router.get('/progress', async (req,res)=>{
  res.render('user/Progress',{ title: 'User Progress' })
 });

 router.get('/create-shedule', async (req,res)=>{
   res.render('user/ScheduleCreation', {title: 'Schedule Creation'});
 });

 router.post('/create-shedule', async (req,res)=>{
   const {subject, topic, date, time, duration, userId} = req.body;
   let sDate = new Date().toDateString();

   try{

     let s = await session.create({subject, topic, date, time, duration, userId});

     if(s) {
      let n = await notification.create({
        userId: userId,
        message: `Your Schedule for ${subject} has been created!!!`,
        type: 'alert',
        createdAt : sDate,
      })
      if(n) res.json({M: 'session created!!'});
      
     }

   }
   catch(err){
      console.log(err);
   }

 }); 

 router.post('/enforcementSetting', async (req,res)=>{
  console.log(req.body); 
  const { distractionControl, parentalAlert, userId } = req.body;

  try{

    let enforce = await Enforcement.create({ distractionControl, parentalAlert, userId });

    if(enforce) res.json({M: 'done'})

  }
  catch(err){
    console.error(err);
  }

 });

 router.post('/update-session-status', async (req,res)=>{
  let {sessionId, status} = req.body;
  let sDate = new Date().toDateString();

  try{

    let find = await session.findById(sessionId);
   await find.updateOne({status}); 
   let userid = find.userId;
   let subject = find.subject;
   let time = find.time;
   let date = find.date;
   let message = `You ${status} Your ${subject} scheduled by ${time} on ${date}`

   await notification.create({
    message: message,
    userId: userid,
    type: 'alert',
    createdAt : sDate
   })

   let user = await User.findById(userid);
   let email = user.email;

   res.json({M: 'a ok'})

   await main(email,message);

  }
  catch(err){
    console.log(err);
  }
 })

export default router;   