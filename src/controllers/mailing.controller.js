import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'

const testAccount = await nodemailer.createTestAccount()

const config = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
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
        to: req.user.email,
        subject: 'Bienvenido a Coder Ecommerce',
        html: mail
    }


    transporter.sendMail(message)
        .then(data => console.log('Email enviado: ', nodemailer.getTestMessageUrl(data), data))
        .then(data => logger.info('Email enviado: ', nodemailer.getTestMessageUrl(data)))
        .then(data => res.status(201).json({ message: 'You should have recieved an email', info: nodemailer.getTestMessageUrl(data) }))
        .catch(err => logger.error(err))
        .catch(err => res.status(500).json({ err }))
}