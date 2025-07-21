import nodemailer from "nodemailer";
import { EMAIL_PASSWORD, USER_EMAIL } from "./env.js";
 const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: USER_EMAIL,
        pass: EMAIL_PASSWORD
    }
})
export default transporter;