
import House from '../models/House'
import User from '../models/User'

class HouseController {

    async index (req, res){
        console.log(req.user._doc)

        // const { status } = req.query

        const houses = await House.find()

        return res.json({ houses })
    }

    async store(req, res){
        const { filename } = req.file
        const { description,price,location,status } = req.body

        const house = await House.create({
            user: req.user,
            photoHouse: filename,
            description: description,
            price: price,
            location: location,
            status: status,
        })  

        return res.json({ house })
    
    }

    async update (req, res){

        console.log('Controller de Alteração Iniciando')

        const { filename } = req.file
        const { house_id } = req.params
        const { user_id } = req.headers
        const { description,price,location,status } = req.body

        console.log('Controller de Alteração: pegando requisições na URL')
        // console.log('House ID: ' + house_id)


        // const house = await House.findById({ house_id })
        // const user = await User.findById({ user_id })

        // if (String(user._id) !== String(house.user)){
        //     console.log('Verificando usuário')
        //     return res.status(401).json({message: 'User Invalid'})
        // }

        const houses = await House.updateOne({ _id: house_id },{
            user: user_id,
            photoHouse: filename,
            description: description,
            price: price,
            location: location,
            status: status,
        })


        // return res.send().json({ message: `Casa: ${house.description} alterada com sucesso` })
        return res.json({ houses })

    }

    async destroy (req, res) {
        const { house_id } = req.body
        const { user_id } = req.headers 

        await House.findByIdAndDelete({ _id: house_id})

        return res.json({ menssage: 'Casa excluida' })
    }
}


export default new HouseController();