import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // console.log('Submit form message', body.text)

    const transporter = nodemailer.createTransport({
        service: 'Yandex',
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.FROM_EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL,
        subject: 'Message from portfolio site',
        text: body.text
    };

    let sended =  false
    try {
        await transporter.sendMail(mailOptions)
        sended = true
    } catch (err) {
        console.error('Error send mail', err)
    }

    return { success: sended }
})