import nodemailer from "nodemailer";
import smptPool from "nodemailer-smtp-pool";
import directTransport from "nodemailer-direct-transport";
import dotenv from "dotenv";
dotenv.config();
// export let joinSender = {
//   sendJoin: param => {
//     const transport = nodemailer.createTransport({
//       port: 587,
//       // secure: false,
//       // requireTLS: true,
//       user: param.email,
//       logger: true,
//       debug: false // include SMTP traffic in the logs
//     });
//     var mailOptions = {
//       from: param.email,
//       to: "jlkrg7@gamil.com", // 수신할 이메일
//       subject: "Receive the 7Chain email Newsletter.", // 메일 제목
//       text: `${param.email} : Subscribe를 원합니다.` // 메일 내용
//     };
//     transport.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//       transport.close();
//     });
//   }
// };
export let mailSender = {
  sendJoin: param => {
    const transport = nodemailer.createTransport(directTransport());
    var mailOptions = {
      from: param.email,
      to: process.env.TO, // 수신할 이메일
      subject: "Receive the 7Chain email Newsletter.", // 메일 제목
      text: `${param.email} : Subscribe를 원합니다.` // 메일 내용
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
      transport.close();
    });
  },
  //----------------------------------------------------
  sendGmail: param => {
    let transport = nodemailer.createTransport(
      smptPool({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD
        }
      })
    );
    let transport2 = nodemailer.createTransport({
      host: "smtp.naver.com",
      post: 465,
      secure: false,
      requireSSL: true,
      auth: {
        user: process.env.NAVER_USER,
        pass: process.env.NAVER_PASSWORD
      }
    });
    let transport3 = nodemailer.createTransport({
      host: "smtp.naver.com",
      post: 465,
      secure: false,
      requireSSL: true,
      auth: {
        user: process.env.NAVER_USER,
        pass: process.env.NAVER_PASSWORD
      }
    });
    let reciver = "";
    if (param.id === 0) {
      reciver = process.env.GMAIL_USER;
    } else if (param.id === 1) {
      reciver = process.env.NAVER_USER;
    } else if (param.id === 2) {
      reciver = process.env.NAVER_USER;
    }
    console.log(reciver, "test");
    // 메일 옵션
    var mailOptions = {
      from: reciver,
      to: reciver, // 수신할 이메일
      subject: "보내신 메일 : " + param.email + " 메일 제목 : " + param.name, // 메일 제목
      text: param.message // 메일 내용
    };
    transport2.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    //메일 발송
    const finalSend = transporterParam =>
      transporterParam.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    if (param.id === 0) {
      finalSend(transport);
    } else if (param.id === 1) {
      finalSend(transport2);
    } else if (param.id === 2) {
      finalSend(transport3);
    }
  }
};
