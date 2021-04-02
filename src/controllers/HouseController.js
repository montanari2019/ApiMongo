import House from '../models/House'
import User from '../models/User'
import * as Yup from 'yup'

class HouseController {

    async index (req, res){
        
        const houses = await House.find()

        return res.json({ houses })
    }

    async shows (req, res) {
        const { user_id } = req.headers

        const houses = await House.find({user: user_id})

        return res.json({houses})
    }

    async store(req, res){

        const { filename } = req.file
        const { description,price,location,status } = req.body


        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required()
        })

        if(!(await schema.isValid(req.body))){
            console.log('Entrando na validação')
            return res.status(400).json({error: 'Falha na validação'})
        }

        const house = await House.create({
            user: req.user,
            photoHouse: filename,
            description: description,
            price: price,
            location: location,
            status: status,
        })  

        return res.json({ house })    
        // return res.json({ ok: true})
    }

    async update (req, res){

        console.log('Controller de Alteração Iniciando')

        const { filename } = req.file
        const { house_id } = req.params
        const { user_id } = req.headers
        const { description,price,location,status } = req.body

        console.log('Controller de Alteração: pegando requisições na URL')
        console.log('House ID: ' + house_id)

        const house = await House.findById({ house_id })
        const user = await User.findById({ user_id })

        if (String(user._id) !== String(house.user)){
            console.log('Verificando usuário')
            return res.status(401).json({message: 'User Invalid'})
        }

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required()
        })

        if(!(await schema.isValid(req.body))){
            console.log('Entrando na validação')
            return res.status(400).json({error: 'Falha na validação'})
        }

        const houses = await House.updateOne({ _id: house_id },{
            user: user_id,
            photoHouse: filename,
            description: description,
            price: price,
            location: location,
            status: status,
        })

        return res.json({ houses })

    }

    async destroy (req, res) {
        const { house_id } = req.body
        const { user_id } = req.headers 

        const house = await House.findById({ _id: house_id})

        if (String(user_id) !== String(house.user)){
            console.log('Verificando usuário')
            return res.status(401).json({message: 'User Invalid'})
        }

        await House.findByIdAndDelete({ _id: house_id})

        return res.json({ menssage: 'Casa excluida' })
    }
}


export default new HouseController();