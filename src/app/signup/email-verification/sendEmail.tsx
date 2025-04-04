"use server";
import { User } from "@/Components/Types";
import nodemailer from "nodemailer";

export default async function sendEmail(user: User, randomCode: number) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    }
  });

  const mailOptions = {
    from: "bgourgaiz@gmail.com",
    to: user.email,
    subject: "Email Verification",
    text: `Hi ${user.lastName} ${user.firstName}! Your verification code is: ${randomCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
