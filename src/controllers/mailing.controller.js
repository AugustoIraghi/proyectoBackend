import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import { generateToken } from '../utils/index.js'
import { mailConfig } from '../utils/index.js'



export const signupMail = async (req, res) => {
    try {
        if (!req.user) throw new Error('Missing user')
        const token = generateToken({email: req.user.email})
    
        const { transporterConfig, mailGeneratorConfig} = mailConfig
        const transporter = nodemailer.createTransport(transporterConfig)
        const mailGenerator = new Mailgen(mailGeneratorConfig)

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
                        link: `http://localhost:8080/api/users/confirm-mail?token=${token}`
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
            .then(data => res.status(201).json({ message: 'You should have recieved an email', info: nodemailer.getTestMessageUrl(data) }))
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}

export const resetPasswordMail = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) throw new Error('Missing email')
        const token = generateToken({email}, '1h')

        const { transporterConfig, mailGeneratorConfig} = mailConfig
        const transporter = nodemailer.createTransport(transporterConfig)
        const mailGenerator = new Mailgen(mailGeneratorConfig)

        const content = {
            body: {
                intro: 'Has solicitado un cambio de contraseña',
                action: {
                    instructions: 'Para cambiar tu contraseña, haz click aquí:',
                    button: {
                        color: '#22BC66',
                        text: 'Cambiar contraseña',
                        link: `http://localhost:8080/api/users/reset-password?token=${token}`
                    }
                },
                outro: 'Si no solicitaste un cambio de contraseña, ignora este email.'
            }
        }

        const mail = mailGenerator.generate(content)
        const message = {
            from: 'Coder Ecommerce',
            to: email,
            subject: 'Cambio de contraseña',
            html: mail
        }
        
        transporter.sendMail(message)
            .then(data => res.status(201).json({ message: 'You should have recieved an email', info: nodemailer.getTestMessageUrl(data) }))
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}