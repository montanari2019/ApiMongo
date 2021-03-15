import { Schema, model} from 'mongoose'

const HouseSchema = new Schema({
    photoHouse: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'   
    }
}, {
    toJSON: {
        virtuals: true,
    }
})

HouseSchema.virtual('photoHouse_url').get(function(){
    return `http://localhost:3333/file/${this.photoHouse}`
})


export default model('House', HouseSchema)