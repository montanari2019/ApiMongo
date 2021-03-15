import express from 'express'
import routes from './router'
import mongoose from 'mongoose'
import path from 'path'

class App{


    constructor(){
        this.server = express()
        mongoose.connect('mongodb+srv://montanari:montanari@cluster0.xmiw8.mongodb.net/devHouse?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        this.middlewares()
        this.routes()
    
    }

    middlewares(){

        this.server.use(
            '/file',
            express.static(path.resolve(__dirname, '..','uploads'))
        )

        this.server.use(express.json())
    }
    routes(){
        this.server.use(routes)
    }

}

export default new App().server 