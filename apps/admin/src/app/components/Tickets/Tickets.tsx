import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Modal, Paper, Grid, Fab, IconButton } from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'
import { DatabaseCRUDService } from '@clubgo/features/api'
import { ITicketModel } from '@clubgo/database'

import '../scss/Create.scss'
import '../scss/Listing.scss'

import { CreateTicket } from './CreateTicket'

export class Tickets extends Component {
  ticketService = new DatabaseCRUDService({ endpoint: 'api', path: '/ticket' })
  
  state = {
    openCreateModal: false,
    loading: true,
    errorText: undefined,
    populateDataFromParent: false,
    populateData: {
      
    },
    listing: Array<ITicketModel>()
  }

  componentDidMount() {
    this.loadVenueListings()
  }

  loadVenueListings = async () => {
    try {
      let { data } = await this.ticketService.list()
      let { listing } = this.state

      if(data.results!==undefined)
        listing = data.results
      
      this.setState({
        listing,
        loading: false
      })
    } catch (err) {
      this.setState({
        loading: false,
        errorText: err.toString()
      })
    }
  }

  render() {
    return (
      <div style={{ padding: '0 2em 2em 2em' }}>
        <section style={{ paddingTop: 0 }} className="section-content clearfix">
          <Button color="primary" size="lg" onClick={()=>{
            this.setState({
              openCreateModal: true,
              populateDataFromParent: false,
              populateData: {}
            })
          }}>
            Create Ticket
          </Button>
        </section>

        <section className="listings">
          <span className="table-title">Available Tickets</span>

          <div style={{
            display: 'flex', flexFlow: 'row', flexWrap: 'wrap'
          }}>
            {
              !this.state.loading && this.state.listing.map((ticket, index)=>{
                return (
                  <div key={`ticketlist_${index}`} className="clearfix"
                    style={{ 
                      margin: '1em', padding: '1em', width: '250px',
                      border: '1.5px solid #1c1c1c40', borderRadius: '5px',
                      overflow: 'hidden'
                    }}
                  >
                    <p style={{ fontSize: '1.25em', margin: 0 }}>{ ticket.ticketTitle }</p>
                    <p style={{ fontSize: '1em', opacity: 0.75 }}>{ ticket.description }</p>

                    <p style={{ fontSize: '1.5em', margin: 0 }}>{ ticket.pricing.stag.admissionPrice }</p>

                    <IconButton className="float-right" onClick={()=>{
                      this.ticketService.delete(ticket._id).then(()=>{
                        let { listing } = this.state
                        listing = listing.filter(item => (item._id!==ticket._id))
                        this.setState({ listing })
                      })
                    }}>
                      <Delete/>
                    </IconButton>

                    <IconButton className="float-right" onClick={()=>{
                      this.setState(()=>{
                        return {
                          openCreateModal: true,
                          populateDataFromParent: true,
                          populateData: ticket
                        }
                      })
                    }}>
                      <Edit/>
                    </IconButton>
                  </div>
                )
              })
            }
          </div>
        </section>

        <Modal open={this.state.openCreateModal}
          style={{
            margin: 'auto',
            width: 800,
            position: 'absolute',
            textAlign: 'center'
          }}
        >
          <CreateTicket
            populate={this.state.populateDataFromParent}
            data={this.state.populateData}
            onFinalize={(createBody:ITicketModel)=>{
              this.ticketService.create(createBody).then((res)=>{
                let { listing } = this.state
                listing.push(createBody)
                this.setState({
                  openCreateModal: false,
                  listing
                })
              })
            }}
            onCancel={()=>{
              this.setState({
                openCreateModal: false
              })
            }}
          />
        </Modal>
      </div>
    )
  }
}

export default Tickets
