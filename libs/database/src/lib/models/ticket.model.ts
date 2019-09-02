import * as mongoose from 'mongoose'
import { ObjectID } from 'bson'

export const ticketSchema = new mongoose.Schema(
  {
    ticketTitle: {
      type: String, required: true
    },
    owner: { 
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
          type: Number, min: 0, max: 100
        },
        malesPerCoupleRatio: {
          type: Number, min: 1
        },
        female: {
          admissionPrice: Number,
          bookingDescription: String,
          discount: {
            type: Number, min: 0, max: 100, default: 0
          }
        },
        male: {
          admissionPrice: Number,
          bookingDescription: String,
          discount: {
            type: Number, min: 0, max: 100, default: 0
          }
        },
      },      
      stag: {
        admissionPrice: Number,
        bookingDescription: String,
        discount: {
          type: Number, min: 0, max: 100
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

ticketSchema.index({
  ticketTitle: 'text'
})

export interface ITicketModel extends mongoose.Document {
  ticketTitle: string,
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