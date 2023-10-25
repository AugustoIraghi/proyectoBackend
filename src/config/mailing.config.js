import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import twilio from 'twilio'

const config = {
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
}

export const signupMail = async (req, res) => {
    const transporter = nodemailer.createTransport(config)
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Coder Ecommerce',
            link: 'http://algoalgo.com'
        }
    })

    const content = {
        body: {
            intro: 'Te registraste en Coder Ecommerce',
            action: {
                instructions: 'Para confirmar tu cuenta, haz click aquí:',
                button: {
                    color: '#22BC66',
                    text: 'Confirmar tu cuenta',
                    link: 'http://algoalgo.com'
                }
            },
            outro: 'Si no te registraste, ignora este email.'
        }
    }

    const mail = mailGenerator.generate(content)
    const message = {
        from: 'Coder Ecommerce',
        to: req.body.email,
        subject: 'Bienvenido a Coder Ecommerce',
        html: mail
    }

    transporter.sendMail(message)
        .then(data => res.status(201).json({ message: 'You should have recieved an email', info: nodemailer.getTestMessageUrl(data) }))
        .catch(err => res.status(500).json({ err }))
}