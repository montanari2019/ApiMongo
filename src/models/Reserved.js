import {Schema, model} from 'mongoose'

const ReservedSchema = new Schema({
    data: String,
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    },

    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }

})

export default model('Reserved', ReservedSchema)