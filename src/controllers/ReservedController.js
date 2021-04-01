import House from '../models/House'
import Reserved from '../models/Reserved'
import User from '../models/User'

class ReservedController{


    async index (req, res) {
        const { user_id } = req.headers

        const reservs = await Reserved.find({ user: user_id })

        return res.json(reservs)
    }

    async store (req, res) {

        console.log('Entrando na função')
        
        const { house_id } = req.params
        const { user_id } = req.headers
        const {data}  = req.body

        console.log('Pegango variáveis da URL' + data)

        const user = await User.findById({ _id: user_id})
        const house = await House.findById({ _id: house_id})

        if(!house){
            console.log('validação Verificar se a casa existe')
            return res.status(400).json({message:'Casa inxistente'})
        }

        if(String(user_id) === String(house.user)){
            console.log('validação usuário')
            return res.status(400).json({message:'Usuário não pode reservr sua própia casa'})
        }

        if(house.status === false){
            console.log('validação Status')
            return res.status(400).json({message:'Casa Indisponível'})
        }
        

        const reserved = await Reserved.create({
            house: house_id,
            user: user_id,
            data,
        })

        
        console.log('Gravando no banco de dados')

        await reserved.populate('user').populate('house').execPopulate()

        
        console.log('Populando o objeto com informações das casas e do usuário')

        return res.json(reserved)

        // return res.json({ok: true})

    }

    async destroy (req, res) {
        const { user_id } = req.headers
        const { reserved_id } = req.params

        console.log('ID DA RESERVA: ' + reserved_id)
        console.log('ID DO USUÁRIO: ' + user_id)

       
        const user = await User.find({ _id: user_id})
        const reserved = await Reserved.findById(reserved_id)

        console.log('OBEJTO USER: ' + user)
        console.log('OBEJTO RESERVA: ' + reserved)

        // if(String(user_id) != String(user._id)) {
        //     res.status(400).json({menssage: 'Usuário incorreto'})
        // }
        // if(reserved_id != reserved._id){
        //     res.status(400).json({menssage: 'Reserva inexistente para este usuário'})
        // }

        await Reserved.findByIdAndDelete({ _id: reserved_id})

        return res.json({menssage: 'Reserva deletada'})
    }

}

export default new ReservedController()