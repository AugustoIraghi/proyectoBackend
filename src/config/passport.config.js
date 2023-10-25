import passport from "passport"
import jwt from 'passport-jwt'
import { JWT_PRIVATE_KEY } from "../utils/index.js"

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = req => {
    const token = (req && req.cookies) ? req.cookies['quebonitosoy'] : null
    return token
}

const initializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_PRIVATE_KEY
    }, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        }catch (error) {
            return done(error)
        }
    }))
}

export default initializePassport