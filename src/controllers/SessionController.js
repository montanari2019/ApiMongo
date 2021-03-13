
/*

Index: Listagem de sessões
Store: Criar uma sessão
Show: Quando queremos listar uma ÚNICA sessão
Update: Quando queremos alterar alguma sessão
Destroy: Qunado queremos deletar uma sessão
*/

import User from "../models/User"


class SessionController{

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