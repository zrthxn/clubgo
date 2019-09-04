import React, { Component } from 'react'
import { Modal, Paper, Grid, Fab, IconButton } from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'
import { DatabaseService } from '@clubgo/features/api'
import { ITicketModel } from '@clubgo/database'

import '../scss/Ticket.scss'

import { TicketEditor } from './TicketEditor'

export interface TicketProps {
  data: ITicketModel,
  onDelete?: Function,
  onEdit?: Function
}
export class Ticket extends Component<TicketProps> {
  ticketService = new DatabaseService('/ticket')

  state = {
    openEditModal: false
  }

  render() {
    return (
      <div className="ticket clearfix">
        <div className="ticket-item">
          <p className="ticket-title">{ this.props.data.ticketTitle }</p>

          <div style={{ color: '#1c1c1c80' }}>
            {
              this.props.data.entryType==="stag" ? (
                'Stag Ticket'
              ) : (
                this.props.data.entryType==="couple" ? (
                  'Couple Ticket'
                ) : (
                  null
                )
              )
            }
          </div>

          <p className="price float-left">{(()=>{
            if(this.props.data.entryType==="stag")
              return '\u20B9' + this.props.data.pricing.stag.admissionPrice
            if(this.props.data.entryType==="couple")
              return '\u20B9' + this.props.data.pricing.couple.admissionPrice
          })()}</p>

          {
            this.props.onDelete!==undefined ? (
              <IconButton className="float-right" onClick={()=>{
                if(this.props.onDelete!==undefined)
                  this.props.onDelete()
              }}>
                <Delete/>
              </IconButton>
            ) : (
              null
            )
          }

          <IconButton className="float-right" onClick={()=>{
            this.setState({
              openEditModal: true
            })
          }}>
            <Edit/>
          </IconButton>
        </div>

        <Modal open={this.state.openEditModal}
          style={{
            margin: 'auto',
            width: 800,
            position: 'absolute',
            textAlign: 'center'
          }}
        >
          <TicketEditor
            populate={true}
            data={this.props.data}
            onFinalize={(updateBody:ITicketModel)=>{
              this.ticketService.update(this.props.data._id, updateBody).then(()=>{
                if(this.props.onEdit!==undefined)
                  this.props.onEdit(updateBody)
                  
                this.setState({
                  openEditModal: false
                })
              })
            }}
            onCancel={()=>{
              this.setState({
                openEditModal: false
              })
            }}
          />
        </Modal>
      </div>
    )
  }
}

export default Ticket
