import env from 'dotenv';
import nodeMailer from 'nodemailer'
env.config();

const { Email, Email_PASS } = process.env;

export async function main(email, message){
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, 
      secure: true, 
      auth: {
        user: Email,
        pass: Email_PASS
      }  
    });
  
    const info = await transporter.sendMail({
      from: 'studysession.com <the.sixers.com@gmail.com>',
      to: email,
      subject: 'Study Alert',
      html: message
    })
  
    console.log('message sent:' + info.messageId)
  
  }