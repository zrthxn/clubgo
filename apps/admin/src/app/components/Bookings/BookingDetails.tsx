import React from 'react'
import { Modal, Paper } from '@material-ui/core'
import { IBookingModel } from '@clubgo/database'

interface BookingDetailsProps {
  data: IBookingModel
  open: boolean
}

export default function BookingDetails(props:BookingDetailsProps) {
  return (
    <Modal open={props.open}
        style={{
          textAlign: 'center',
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column'
        }}
      >
        <Paper style={{ 
          marginTop: '4em',
          marginLeft: '50%',
          left: '-14em',
          padding: '2em',
          width: '28em',
          position: 'absolute'
        }}>
          
      </Paper>
    </Modal>
  )
}
