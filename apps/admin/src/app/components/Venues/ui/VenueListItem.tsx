import React, { Component } from 'react'
import { Grid, Button, Fab, Modal, Paper } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Edit, Delete } from '@material-ui/icons'
import { IVenueModel } from '@clubgo/database'

import '../../scss/Listing.scss'

import { VenueContext } from '../VenueContext'

export interface VenueListItemProps {
  data?: IVenueModel,
  onDelete?: Function
}
export class VenueListItem extends Component<VenueListItemProps> {
  state = {
    openDeleteModal: false
  }

  render() {
    return (
      <VenueContext.Consumer>
        {
          venueContext => (
            <div className="list-item">
              <Grid container spacing={1}>
                <Grid item md={8} xs={12}>
                  <span>{ this.props.data.venueTitle }</span>
                </Grid>

                <Grid item md={4} xs={12}>
                  <div className="action">
                    <Fab color="primary" size="small"
                      onClick={()=>venueContext.actions.openVenueEditor('edit', this.props.data)}
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
                        <h3>Delete Venue</h3>
                        <p>
                          Are you sure you want to delete this venue? <br/>
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
      </VenueContext.Consumer>
    )
  }
}

export default VenueListItem
