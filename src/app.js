import express from 'express'
import routes from './router'
import mongoose from 'mongoose'
import path from 'path'
import passport from 'passport'
import { Strategy } from "passport-http-bearer";
import User from './models/User'
import jwt from "jsonwebtoken";
import { secret } from './config/secret.json'

class App {

    constructor() {
        this.server = express()
        mongoose.connect('mongodb+srv://montanari:montanari@cluster0.xmiw8.mongodb.net/devHouse?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        this.middlewares()
        this.routes()

    }

    middlewares() {

        this.server.use(
            '/file',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        )

        this.server.use(express.json())

        passport.use(
            new Strategy(async (token, cb) => {
                try {
                    let decoded = jwt.verify(token, secret)

                    if (!decoded) {
                        return cb(null, false);
                    }

                    let user = await User.findOne({ email: decoded.email });

                    if (user) {
                        let { password, ...response } = user
                        return cb(null, response);
                    }

                    return cb(null, false);
                } catch (error) {
                    return cb(null, false);
                }
            })
        );
    }
    routes() {
        this.server.use(routes)
    }

}

export default new App().server