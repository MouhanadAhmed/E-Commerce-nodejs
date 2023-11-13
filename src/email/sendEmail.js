import nodemailer from 'nodemailer';
import { emailTemplate } from './emailTemplate.js';

export function sendEmail(options) {
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'mouhanad.ahmed2@gmail.com',
      pass: 'ghxgbhhheuxdldct'
    }
  });


  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Mouhanad 👻" <mouhanad.ahmed2@gmail.com>', // sender address
      to: options.email, // list of receivers
      subject: options.sub, // Subject line
    //   text: "Hello world?", // plain text body
      html:emailTemplate(options.api,options.text,options.title,options.btn), // html body
    });
  
    console.log("Message sent: %s", info.messageId,typeof options.text,options.title );
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  }
  
  main().catch(console.error);
}