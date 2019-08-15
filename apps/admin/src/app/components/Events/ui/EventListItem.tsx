import React, { Component } from 'react'
import { Grid, Button, Fab, Modal, Paper } from '@material-ui/core'
import { red, blue, green } from '@material-ui/core/colors'
import { Edit, Delete } from '@material-ui/icons'
import { IEventModel } from '@clubgo/database'

import '../../scss/Listing.scss'

import { EventContext } from '../EventContext'

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
                <Grid item md={8} xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
                  <span style={{ margin: 'auto 0', width: '200px' }}>{ this.props.data.eventTitle }</span>

                  {
                    this.props.data.settings.isPublished ? (
                      <span style={{ margin: 'auto 1em', color: green[400] }}><b>Published</b></span>
                    ) : (
                      <span style={{ margin: 'auto 1em', color: '#1c1c1c' }}>Unpublished</span>
                    )
                  }
                </Grid>

                <Grid item md={4} xs={12}>
                  <div className="action">
                    <Fab color="primary" size="small"
                      onClick={()=>{
                        alert("Event editing not available yet")
                        // eventContext.actions.openEventEditor('edit', this.props.data)
                      }}
                    >
                      <Edit/>
                    </Fab>
                    
                    <Fab color="secondary" size="small"
                      onClick={()=>{
                        this.setState({
                          openDeleteModal: true
                        })
                      }}
                    >
                      <Delete/> 
                    </Fab>

                    <Modal open={this.state.openDeleteModal}
                      style={{
                        margin: 'auto',
                        width: 400,
                        position: 'absolute',
                        textAlign: 'center'
                      }}
                    >
                      <Paper style={{ padding: '2em', margin: '10em 0' }}>
                        <h3>Delete Event</h3>
                        <p>
                          Are you sure you want to delete this event? <br/>
                          This action is irreversible.
                        </p>

                        <Button variant="outlined" color="default" style={{ margin: '0.5em' }}
                          onClick={()=>{ this.setState({ openDeleteModal: false }) }}
                        >
                          Cancel
                        </Button>

                        <Button variant="contained" color="primary" style={{ margin: '0.5em', backgroundColor: red[600] }}
                          onClick={()=>{ 
                            this.setState({ openDeleteModal: false })
                            this.props.onDelete()
                          }}
                        >
                          Delete
                        </Button>
                      </Paper>
                    </Modal>
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
