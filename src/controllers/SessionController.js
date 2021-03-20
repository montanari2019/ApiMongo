
/*

Index: Listagem de sessões
Store: Criar uma sessão
Show: Quando queremos listar uma ÚNICA sessão
Update: Quando queremos alterar alguma sessão
Destroy: Qunado queremos deletar uma sessão
*/

import User from "../models/User"
import { passwordHash } from '../config/secret.json'
import CryptoJS from "crypto-js"

class SessionController {

    async index(req, res) {
        console.log('Buscando todos os usuários')
        const user = await User.find()
        return res.json({ user })
    }

    // async store(req, res) {
    //     const { email } = req.body


    //     let user = await User.findOne({ email })

    //     if (!user) {
    //         user = await User.create({ email })
    //     }

    //     return res.json(user)
    // }

    async store(req, res) {
        const { _id, ...body } = req.body;

        let model = new User(body);

        model.password = CryptoJS.HmacSHA1(model.password, passwordHash).toString()

        try {
            model = await model.save();

            if (model === null) {
                throw new Error('Usuário não criado!')
            }

            const { password, ...response } = model.toObject();

            return res.status(200).json(response);

        } catch (error) {
            if (!error) {
                return res.status(500).json("Ocorreu um erro interno no servidor");
            }
            return res.status(500).json({ error });
        }
    }

    async authenticate(req, res) {
        let model = new User(req.body);

        try {
          let password = CryptoJS.HmacSHA1(model.password, passwordHash)
          let response = await model.authenticate(model.email, password.toString())
    
          if (!response) {
            return res.status(401).json({ message: "Usuário ou senha incorretos!" })
          }
    
          return res.status(200).json(response);
        } catch (error) {
          return res.status(500).json(error)
        }
      }

}

export default new SessionController()