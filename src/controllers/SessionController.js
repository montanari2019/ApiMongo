
/*

Index: Listagem de sessões
Store: Criar uma sessão
Show: Quando queremos listar uma ÚNICA sessão
Update: Quando queremos alterar alguma sessão
Destroy: Qunado queremos deletar uma sessão
*/

import User from "../models/User"


class SessionController{

    async index(req, res){
        console.log('Buscando todos os usuários')
        const user = await User.find()
        return res.json({ user })
    }

     async store(req, res){
        const { email } = req.body


        let user = await User.findOne({ email })

        if(! user){
            user = await User.create({ email })
        }
        
        return res.json(user)
    }


}

export default new SessionController()