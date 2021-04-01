import { Router } from 'express'
import SessionController from './controllers/SessionController'
import HouseController from './controllers/HouseController'
import ReservedController from './controllers/ReservedController'
import multer from 'multer'
import uploadConfig from './config/upload'
import passport from 'passport'

const routes = new Router()
const upload = new multer(uploadConfig)

const secureRoute = passport.authenticate('bearer', { session: false })

routes.get('/', (req, res) =>{
return res.json({ menssage: `Api rodando` })
})


// Rotas para usuário
routes.post('/sessionsUser', SessionController.store)
routes.post('/sessions/authenticate', SessionController.authenticate)
routes.get('/sessions', SessionController.index)
routes.delete('/sessionDelete',secureRoute, SessionController.destroy)

// Rotas para as casas
routes.post('/houses', secureRoute ,  upload.single('photoHouse'), HouseController.store)
routes.get('/housesList', secureRoute, HouseController.index)
routes.get('/housesUser', secureRoute, HouseController.shows)
routes.put('/houses/:house_id', secureRoute,upload.single('photoHouse'), HouseController.update)
routes.delete('/houses', secureRoute, HouseController.destroy)

// Rotas para as reservas
routes.post('/houses/:house_id/reserved',secureRoute, ReservedController.store)
routes.get('/reservs',secureRoute, ReservedController.index)
routes.delete('/reservs/:reserved_id',secureRoute, ReservedController.destroy)

export default routes