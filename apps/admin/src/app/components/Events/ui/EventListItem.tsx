import React, { Component } from 'react'
import { Grid, Button, IconButton, Modal, Paper } from '@material-ui/core'
import { red, blue, green } from '@material-ui/core/colors'
import { Edit, Delete } from '@material-ui/icons'
import { IEventModel } from '@clubgo/database'

import '../../scss/Listing.scss'

import { EventContext } from '../EventContext'
import { ConfirmDelete } from '../../Modals/ConfirmDelete'

export interface EventListItemProps {
  data?: IEventModel,
  onDelete?: Function
}
export class EventListItem extends Component<EventListItemProps> {
  state = {
    openDeleteModal: false
  }

  render() {
    return (
      <EventContext.Consumer>
        {
          eventContext => (
            <div className="list-item">
              
              <Grid container spacing={1}>
                <Grid item md={6} xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ maxWidth: '200px', overflow: 'hidden' }}>
                    <h4>{ this.props.data.eventTitle }</h4>
                    <span>{ this.props.data.description }</span>
                  </div>
                </Grid>

                <Grid item xs={2} style={{ display: 'flex', flexDirection: 'row' }}>
                  {
                    this.props.data.settings.isPublished ? (
                      <span style={{ margin: 'auto 1em', color: green[400] }}><b>Published</b></span>
                    ) : (
                      <span style={{ margin: 'auto 1em', color: '#1c1c1c' }}>Unpublished</span>
                    )
                  }
                </Grid>

                <Grid item md={4} xs={12}>
                  <div className="action clearfix">
                    <IconButton className="float-right" onClick={()=>{
                        this.setState({
                          openDeleteModal: true
                        })
                      }}
                    >
                      <Delete/> 
                    </IconButton>

                    <IconButton className="float-right" onClick={()=>{
                        // alert("Event editing not available yet")
                        eventContext.actions.openEventEditor('edit', this.props.data)
                      }}
                    >
                      <Edit/>
                    </IconButton>

                    <ConfirmDelete isOpen={this.state.openDeleteModal}
                      confirm={()=>{
                        this.setState({ openDeleteModal: false })
                        this.props.onDelete()
                      }}
                      close={()=>{
                        this.setState({ openDeleteModal: false })
                      }}
                    >
                      <h3>Delete Event</h3>
                      <p>
                        Are you sure you want to delete this event? <br/>
                        This action is irreversible.
                      </p>
                    </ConfirmDelete>
                  </div>
                </Grid>
              </Grid>
            </div>
          )
        }
      </EventContext.Consumer>
    )
  }
}

export default EventListItem
