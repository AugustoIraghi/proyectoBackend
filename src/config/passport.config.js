import passport from "passport"
import jwt from 'passport-jwt'
import { Strategy as localStrategy } from 'passport-local'
import { JWT_COOKIE_NAME, JWT_PRIVATE_KEY, isValidPassword } from "../utils/index.js"
import { UserService } from "../repositories/index.js"

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = req => {
    let token = null;
    if (req && req.signedCookies) token = req.signedCookies[JWT_COOKIE_NAME];
    return token;
}

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), 
    secretOrKey: JWT_PRIVATE_KEY,
    jwtCookieName: JWT_COOKIE_NAME
  }

const initializePassport = () => {
    passport.use(new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
        const user = await UserService.getById(jwt_payload.user._id)
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      }))
}

export default initializePassport