import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import { generateToken } from '../utils/index.js'
import { mailConfig } from '../utils/index.js'



export const signupMail = async (req, res) => {
    const transporter = nodemailer.createTransport(mailConfig)
    const token = generateToken(req.user)
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Coder Ecommerce',
            link: 'localhost:8080/'
        }
    })

    const content = {
        body: {
            greeting: 'Bienvenido',
            name: req.user.first_name,
            intro: 'Te registraste en Coder Ecommerce',
            action: {
                instructions: 'Para confirmar tu cuenta, haz click aquí:',
                button: {
                    color: '#22BC66',
                    text: 'Confirmar tu cuenta',
                    link: `localhost:8080/api/users/confirm-mail?token=${token}`
                }
            },
            signature: 'Un saludo',
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
        // .then(data => console.log('Email enviado: ', nodemailer.getTestMessageUrl(data), data))
        // .then(data => logger.info('Email enviado: ', nodemailer.getTestMessageUrl(data)))
        .then(data => res.status(201).json({ message: 'You should have recieved an email', info: nodemailer.getTestMessageUrl(data) }))
        // .catch(err => logger.error(err))
        .catch(err => res.status(500).json({ err }))
}

export const resetPasswordMail = async (req, res) => {
    const transporter = nodemailer.createTransport(mailConfig)
    const token = generateToken(req.user)
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Coder Ecommerce',
            link: 'http://algoalgo.com'
        }
    })

    const content = {
        body: {
            intro: 'Has solicitado un cambio de contraseña',
            action: {
                instructions: 'Para cambiar tu contraseña, haz click aquí:',
                button: {
                    color: '#22BC66',
                    text: 'Cambiar contraseña',
                    link: `http://algoalgo.com/users/reset-password?token=${token}`
                }
            },
            outro: 'Si no solicitaste un cambio de contraseña, ignora este email.'
        }
    }

    const mail = mailGenerator.generate(content)
    const message = {
        from: 'Coder Ecommerce',
        to: req.user.email,
        subject: 'Cambio de contraseña',
        html: mail
    }
    
    transporter.sendMail(message)
        .then(data => console.log('Email enviado: ', nodemailer.getTestMessageUrl(data), data))
        .then(data => logger.info('Email enviado: ', nodemailer.getTestMessageUrl(data)))
        .then(data => res.status(201).json({ message: 'You should have recieved an email', info: nodemailer.getTestMessageUrl(data) }))
        .catch(err => logger.error(err))
        .catch(err => res.status(500).json({ err }))
}