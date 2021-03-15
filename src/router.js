import { Router } from 'express'
import SessionController from './controllers/SessionController'
import HouseController from './controllers/HouseController'
import multer from 'multer'
import uploadConfig from './config/upload'

const routes = new Router()
const upload = new multer(uploadConfig)

routes.get('/', (req, res) =>{
return res.json({ menssage: `Api rodando` })
})

routes.post('/sessionsUser', SessionController.store)

routes.post('/houses', upload.single('photoHouse'), HouseController.store)

export default routes