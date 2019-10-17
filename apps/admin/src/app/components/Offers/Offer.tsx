import React, { Component } from 'react'
import { Grid, Paper, IconButton, Tooltip } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import '../scss/Offers.scss'

import { IOfferModel } from '@clubgo/database'
import { OfferEditor } from './OfferEditor'
import { DatabaseService } from '@clubgo/api'

interface OfferProps {
  data: IOfferModel
  onEdit: Function
  onDelete: Function
}

export class Offer extends Component<OfferProps> {
  state = {
    openOfferEditor: false
  }
  
  offerService = new DatabaseService('/ticket')
  
  render() {
    return (
      <Paper className="offer-block">
        <div>
          <h3 className="offer-name">{ this.props.data.offerTitle }</h3>
          <p className="description">{ this.props.data.description }</p>
        </div>
        
        <div className="clearfix" style={{ padding: '1em 0 0 0' }}>
          <span className="category" style={
            this.props.data.category==='flat' ? {
              backgroundColor: '#fdff00'
            } : (
              this.props.data.category==='coupon' ? {
                backgroundColor: '#ff8000'
              } : (
                  this.props.data.category==='payment' ? {
                    backgroundColor: '#40ff40'
                  } : (
                      this.props.data.category==='platform' ? {
                        backgroundColor: '#0080ff', color: '#fff'
                      } : {
                        backgroundColor: '#1c1c1c80'
                      }
                    ) 
                ) 
            ) 
          }>
            { 
              this.props.data.category.toUpperCase() 
            }
          </span>

          <span style={{ margin: 'auto' }}>
            { this.props.data.discountPercent }% OFF
          </span>

          <div className="float-right">
            <IconButton size="small" onClick={()=>{
              this.setState({
                openOfferEditor: true
              })
            }}>
              <Edit/>
            </IconButton>
            
            <IconButton size="small" onClick={()=>{
              if(this.props.onDelete!==undefined)
                this.props.onDelete()
            }}>
              <Delete/>
            </IconButton>
          </div>
          
          {
            this.state.openOfferEditor ? (
              <OfferEditor open={this.state.openOfferEditor}
                data={this.props.data}
                populate={true}
                onFinalize={(offer:IOfferModel)=>{
                  this.offerService.update(this.props.data._id, offer).then(()=>{
                    if(this.props.onEdit!==undefined)
                      this.props.onEdit(offer)
                      
                    this.setState({
                      openOfferEditor: false
                    })
                  })
                }}
                onCancel={()=>{
                  this.setState({
                    openOfferEditor: false
                  })
                }}
              />
            ) : null
          }
        </div>
      </Paper>
    )
  }
}

export default Offer
