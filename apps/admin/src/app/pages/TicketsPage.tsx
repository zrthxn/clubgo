import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { ITicketModel } from '@clubgo/database'
import { DatabaseService } from '@clubgo/api'

import './scss/Pages.scss'

import { Ticket } from '../components/Tickets/Ticket'
import { TicketEditor } from '../components/Tickets/TicketEditor'
import { Grid } from '@material-ui/core'

export class TicketsPage extends Component {
  state = {
    openCreateModal: false,
    loading: true,
    errorText: undefined,
    populateDataFromParent: false,
    listing: Array<ITicketModel>(),
    populateData: {
      
    }
  }

  ticketService = new DatabaseService('/ticket')

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
      <div className="page">
        <article className="page-header">
          <h1 className="title">Tickets</h1>

          <div className="page-nav clearfix">
            <p>
              Select one of the options. <br/>
              Other details will come here.
            </p>
            <Button color="primary" size="lg" onClick={()=>{
              this.setState({
                openCreateModal: true,
                populateDataFromParent: false,
                populateData: {}
              })
            }}>
              Create New Ticket
            </Button>
          </div>
        </article>

        <article className="page-content">
          <Grid container spacing={3} style={{ display: 'flex', flexFlow: 'row', flexWrap: 'wrap' }}>
            {
              !this.state.loading && this.state.listing.map((ticket, index)=>{
                return (
                  <Grid item md={3} xs={6} key={`ticketlist-${index}`}>
                    <Ticket data={ticket}
                      onEdit={(editedTicket:ITicketModel)=>{
                        let { listing } = this.state
                        listing[index] = editedTicket
                        this.setState({
                          listing
                        })
                      }}
                      onDelete={()=>{
                        let { listing } = this.state
                        listing = listing.filter(item => (item._id!==ticket._id))
                        this.setState({ listing })
                      }}
                    />
                  </Grid>
                )
              })
            }
          </Grid>
        </article>

        {
          this.state.openCreateModal ? (
            <TicketEditor open={this.state.openCreateModal}
              populate={this.state.populateDataFromParent}
              data={this.state.populateData}
              onCancel={()=>{
                this.setState({
                  openCreateModal: false
                })
              }}
              onFinalize={(createBody:ITicketModel)=>{
                this.ticketService.create(createBody).then((res)=>{
                  let { listing } = this.state
                  createBody._id = res.data.results
                  listing.push(createBody)
                  this.setState({
                    openCreateModal: false,
                    listing
                  })
                })
              }}
            />
          ) : null
        }
      </div>
    )
  }
}

export default TicketsPage