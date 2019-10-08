import * as mongoose from 'mongoose'

export const webmasterSchema = new mongoose.Schema(
  {
    role: {
      type: String, required: true, enum: [ 'admin', 'mod', 'editor' ]
    },
    username: {
      type: String, required: true, unique: true
    },
    password: {
      type: {
        hash: {
          type: String, required: true
        },
        salt: {
          type: String, required: true
        }
      }, 
      required: true
    },
    name: String,
    email: {
      type: String, unique: true
    },
    profile: {
      avatar: String
    }
  }, {
    collection: 'Webmasters'
  }
)

export interface IWebmasterModel extends mongoose.Document {
  role: 'admin' | 'mod' | 'editor'
  username: string
  password: {
    hash: string
    salt: string
  }
  name?: string
  email?: string
  profile?: {
    avatar?: string
  }
}

export const Webmaster = mongoose.model<IWebmasterModel>('Webmaster', webmasterSchema)
export default Webmaster
