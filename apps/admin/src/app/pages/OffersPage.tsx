import React, { Component } from 'react'
import { Nav, NavItem, NavLink, Button } from 'reactstrap'
import { Grid, Paper } from '@material-ui/core'

import './scss/Pages.scss'

import { Offer } from '../components/Offers/Offer'
import { OfferEditor } from '../components/Offers/OfferEditor'
import { DatabaseService } from '@clubgo/api'

import AdminContext from '../AdminContext'
import { IOfferModel } from '@clubgo/database'

export default class OffersPage extends Component {
  static contextType = AdminContext
  context!: React.ContextType<typeof AdminContext>
  
  state = {
    loading: true,
    openCreateModal: false,
    offers: [

    ]
  }

  offerService = new DatabaseService('/offer')

  componentDidMount() {
    this.offerService.searchBy({}).then(({ data })=>{
      let { offers } = this.state
      offers = data.results
      this.setState({
        loading: false,
        offers
      })
    })
  }  

  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h1 className="title">Offers</h1>
          
          <div>
            <Button color="primary" size="lg" onClick={()=>{
              this.setState({
                openCreateModal: true
              })
            }}>
              Create New Offer
            </Button>
          </div>
        </article>

        <article className="page-content">
          <Grid container spacing={3}>
            {
              !this.state.loading ? (
                this.state.offers.map((offer, index)=>(
                  <Grid item xs={12} md={4} key={`offerList-${index}`}>
                    <Offer data={offer}
                      onEdit={(editedOffer:IOfferModel)=>{
                        let { offers } = this.state
                        offers[index] = editedOffer
                        this.setState({
                          offers
                        })
                      }}
                      onDelete={()=>{
                        this.offerService.delete(offer._id).then(()=>{  
                          let { offers } = this.state
                          offers.splice(index, 1)
                          this.setState({ offers })
                        })
                      }}
                    />
                  </Grid>
                ))
              ) : (
                <div>
                  <span className="spinner"/> Loading
                </div>
              )
            }
          </Grid>
        </article>

        {
          this.state.openCreateModal ? (
            <OfferEditor open={this.state.openCreateModal}
              onCancel={()=>{
                this.setState({
                  openCreateModal: false
                })
              }}
              onFinalize={(createBody:IOfferModel)=>{
                this.offerService.create(createBody).then((res)=>{
                  let { offers } = this.state
                  createBody._id = res.data.results
                  offers.push(createBody)
                  this.setState({
                    loading: false,
                    openCreateModal: false,
                    offers
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
