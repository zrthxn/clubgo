import * as mongoose from 'mongoose'
import { ObjectID } from 'bson'

export const ticketSchema = new mongoose.Schema(
  {
    ticketTitle: {
      type: String, required: true, index: true
    },
    owner: { 
      type: String, required: true
    },
    description: {
      type: String, required: true
    },
    entryType: {
      type: String, required: true, enum: [ 'couple', 'stag' ]
    },
    pricing: {
      couple: {
        admissionPrice: Number,
        bookingDescription: String,
        discount: {
          type: Number, min: -1, max: 0
        },
        malesPerCoupleRatio: {
          type: Number, min: 1
        },
        female: {
          admissionPrice: Number,
          bookingDescription: String,
          discount: {
            type: Number, min: -1, max: 0, default: 0
          }
        },
        male: {
          admissionPrice: Number,
          bookingDescription: String,
          discount: {
            type: Number, min: -1, max: 0, default: 0
          }
        },
      },      
      stag: {
        admissionPrice: Number,
        bookingDescription: String,
        discount: {
          type: Number, min: -1, max: 0
        }
      }
    },
    assignedTo: {
      events: [ ObjectID ],
      venues: [ ObjectID ]
    }
  },
  {
    collection: 'Tickets'
  }
)

export interface ITicketModel extends mongoose.Document {
  ticketTitle: string,
  description: string,
  entryType: 'couple' | 'stag',
  pricing: {
    couple?: {
      admissionPrice: number,
      bookingDescription?: string,
      discount?: number,
      malesPerCoupleRatio: number,
      female: {
        admissionPrice: number,
        bookingDescription?: string,
        discount?: number
      },
      male: {
        admissionPrice: number,
        bookingDescription?: string,
        discount?: number
      },
    },
    stag?: {
      admissionPrice: number,
      bookingDescription?: string,
      discount?: number
    }
  }
}

export const Ticket = mongoose.model<ITicketModel>('Ticket', ticketSchema) 
export default Ticket