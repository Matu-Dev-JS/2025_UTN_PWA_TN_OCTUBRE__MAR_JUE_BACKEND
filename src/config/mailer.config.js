import nodemailer from 'nodemailer'
import ENVIRONMENT from './environment.config.js'

//La configuracion para nuestro mailer
const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: ENVIRONMENT.GMAIL_USERNAME,
            pass: ENVIRONMENT.GMAIL_PASSWORD
        }
    }
)


export default transporter