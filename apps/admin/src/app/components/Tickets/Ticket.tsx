import React, { Component } from 'react'
import { Modal, Paper, Grid, Fab, IconButton } from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'
import { ITicketModel } from '@clubgo/database'

import '../scss/Ticket.scss'

import { TicketEditor } from './TicketEditor'
import { DatabaseService } from '@clubgo/api'

export interface TicketProps {
  data: ITicketModel,
  onDelete?: Function,
  onEdit?: Function
}
export class Ticket extends Component<TicketProps> {
  state = {
    openEditModal: false
  }

  ticketService = new DatabaseService('/ticket')

  render() {
    return (
      <Paper className="ticket clearfix">
        <div className="ticket-item">
          <p className="ticket-title">{ this.props.data.ticketTitle }</p>

          <div style={{ color: '#1c1c1c80' }}>
            {
              this.props.data.entryType==="single" ? (
                'Single Ticket'
              ) : (
                this.props.data.entryType==="couple" ? (
                  'Couple Ticket'
                ) : (
                  null
                )
              )
            }
          </div>

          <p className="price float-left">
            {
              (
                () => {
                  if(this.props.data.entryType==="single")
                    return '\u20B9' + this.props.data.pricing.single.admissionPrice
                  if(this.props.data.entryType==="couple")
                    return '\u20B9' + this.props.data.pricing.couple.admissionPrice
                }
              )()
            }
          </p>

          {
            this.props.onDelete!==undefined ? (
              <IconButton size="small" className="float-right" onClick={()=>{
                this.ticketService.delete(this.props.data._id).then(()=>{
                  if(this.props.onDelete!==undefined)
                    this.props.onDelete()
                })
              }}>
                <Delete/>
              </IconButton>
            ) : (
              null
            )
          }

          <IconButton size="small" className="float-right" onClick={()=>{
            this.setState({
              openEditModal: true
            })
          }}>
            <Edit/>
          </IconButton>
        </div>

        {
          this.state.openEditModal ? (
            <TicketEditor open={this.state.openEditModal}
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
          ) : null
        }
      </Paper>
    )
  }
}

export default Ticket
