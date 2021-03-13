import { Router } from 'express'
import SessionController from './controllers/SessionController'

const routes = new Router()

routes.get('/', (req, res) =>{
return res.json({ menssage: `Api rodando` })
})

routes.post('/sessionsUser', SessionController.store)

export default routes