import nodemailer from 'nodemailer';
import config from '../config';

const sendMail = async (to: string, link: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "pijushsarker.dev@gmail.com",
      pass: "pnsq sxvs tljc lqpe",
    },
  });

  await transporter.sendMail({
    from: 'pijushsarker.dev@gmail.com', // sender address
    to, // list of receivers
    subject: "Reset your Password", // Subject line
    text: ``, // plain text body
    html: `
    <p>There was a request to change your password!
    If you did not make this request then please ignore this email.
    Otherwise, please click this link to change your password:</p>

    <a style="display:inline-block; padding:0.3em 1.2em; margin:0 0.3em 0.3em 0; border-radius:2em;text-decoration:none;color:#FFFFFF;background-color:#4eb5f1;text-align:center;" href='${link}'>Reset Password</a>
    
    `, // html body
  });
}

export default sendMail;