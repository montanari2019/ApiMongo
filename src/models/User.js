import { Schema, model } from 'mongoose'
import { secret } from './../config/secret.json'
import jwt from 'jsonwebtoken'

const UserSchema = new Schema({
    email: String,
    name:String,
    password: String
})

UserSchema.methods.authenticate = async (email, password) => {
  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return null;
    }

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        _id: user._id,
        generatedDate: new Date()
      },
      secret,
      {
        expiresIn: '2h'
      }
    );

    return { token, userInfo: { email: user.email, name: user.name } }
  } catch (error) {
    throw error
  }
};

const User = model('User', UserSchema)

export default User