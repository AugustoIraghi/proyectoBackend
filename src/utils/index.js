import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import logger from './logger.js';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;


export const JWT_PRIVATE_KEY = 'secret';
export const JWT_COOKIE_NAME = 'jwttoken';

const testAccount = await nodemailer.createTestAccount()
export const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    }
}

export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

export const generateToken = (user) => {
    const token = jwt.sign({ user }, JWT_PRIVATE_KEY, { expiresIn: '24h' });
    return token;
}

export const isAdmin = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, { session: false }, (err, user, info) => {
            if (err) return res.status(500).json({ message: info });
            if (!user) return res.status(401).json({ message: info });
            if (user.role !== 'admin') return res.status(403).json({ message: 'You are not an admin' });
            req.user = user;
            next();
        })(req, res, next);
    }
}

const isPremiumUser = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, { session: false }, (err, user, info) => {
            if (err) return res.status(500).json({ message: info });
            if (!user) return res.status(401).json({ message: info });
            if (user.role !== ('premium' || 'admin')) return res.status(403).json({ message: 'You are not a premium user' });
            req.user = user;
            next();
        })(req, res, next);
    }
}

export const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, { session: false }, (err, user, info) => {
            if (err) return res.status(500).json({ message: info });
            if (!user) return res.status(401).json({ message: info });
            req.user = user;
            next();
        })(req, res, next);
    }
}

export const verifyAdmin = isAdmin('jwt');
export const verifyPremiumUser = isPremiumUser('jwt');
export const verifyUser = passportCall('jwt');