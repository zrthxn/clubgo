import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Modal, Paper, Grid, Fab, IconButton } from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'
import { DatabaseService } from '@clubgo/features/api'
import { ITicketModel } from '@clubgo/database'

import '../scss/Create.scss'
import '../scss/Listing.scss'

import { TicketEditor } from './TicketEditor'
import { Ticket } from './Ticket';

export class TicketListing extends Component {
  ticketService = new DatabaseService('/ticket')
  
  state = {
    openCreateModal: false,
    loading: true,
    errorText: undefined,
    populateDataFromParent: false,
    listing: Array<ITicketModel>(),
    populateData: {
      
    }
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
                  <Ticket key={`ticketlist_${index}`} data={ticket}
                    onDelete={()=>{
                      this.ticketService.delete(ticket._id).then(()=>{
                        let { listing } = this.state
                        listing = listing.filter(item => (item._id!==ticket._id))
                        this.setState({ listing })
                      })
                    }}
                  />
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
          <TicketEditor
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

export default TicketListing
