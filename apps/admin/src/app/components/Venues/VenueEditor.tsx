import React, { Component } from 'react'
import { Form, Button } from 'reactstrap'
import { Grid } from '@material-ui/core'
import { IVenueModel } from '@clubgo/database'

import Images from './ui/Images'
import Settings from './ui/Settings'
import VenueDetails from './ui/VenueDetails'
import Hours from './ui/Hours'
import Offers from './ui/Offers'

import { VenueContext } from './VenueContext'

export interface VenueEditorProps {
  intent: string,
  populateData?: object
}
export class VenueEditor extends Component<VenueEditorProps> {
  static contextType = VenueContext

  state = {
    loading: true,
    populateDataFromParent: false,
    data: {
      venueTitle: undefined,
      description: undefined,
      categories: [],
      locality: undefined,
      address: undefined,
      altAddress: undefined,
      nearestMetroStation: undefined,
      coordinates: {
        _lat: 0,
        _lon: 0
      },
      knownFor: [],
      cuisines: undefined,
      facilities: [],
      costForTwo: undefined,
      settings: {
        isPublished: false,
        venuePriority: undefined,
        isFeatured: false,
        featured: {
          featuredText: undefined,
          featuredPriority: undefined
        }
      },
      timings: [],
      offers: [],
      media: {
        images: [],
        videoURL: undefined
      }
    }
  }

  componentDidMount() {
    this.setState(()=>{
      if(this.props.intent==='update')
        return {
          data: this.props.populateData,
          populateDataFromParent: true,
          loading: false,
        }
      else
        return {
          loading: false
        }
    })      
  }

  syncDataChanges = (childData:object, key:string) => {
    let { data } = this.state
    if(key==='root') {
      data = { ...data, ...childData }
    }
    else {
      if(Array.isArray(childData)) {
        let iterable = data
        iterable[key] = childData
        data = { ...iterable }
      }
      else {
        data[key] = { ...childData }
      }
    }

    this.setState((prevState, props)=>{
      return {
        data
      }
    })
  }

  saveVenue = (data, publish?:boolean) => {
    if(this.props.intent==='create')
      this.context.actions.create(data, publish).then((result) => {
        if(result.status===201) {
          this.context.actions.openSuccessFeedback('Venue Created')
          this.context.actions.openVenueListing()
        }
        else throw result
      }).catch((err) => {
        this.context.actions.openErrorFeedback(err.data._message, err.data.message)
      })

    else if(this.props.intent==='update')
      this.context.actions.update(data._id, data, publish).then((result) => {
        if(result.status===200) {
          this.context.actions.openSuccessFeedback('Venue Updated')  
          this.context.actions.openVenueListing()
        }
        else throw result
      }).catch((err) => {
        this.context.actions.openErrorFeedback(err.data._message, err.data.message)
      })
      
  }

  render() {
    return (
      <div className="create-form">
        <div>
          <div className="clearfix" style={{ padding: '1em' }}>
            {
              this.props.intent==='create' ? (
                <span className="form-title">Create Venue</span>
              ) : (
                this.props.intent==='update' ? (
                  <span className="form-title">Update Venue</span>
                ) : (
                  console.log()
                )
              )
            }
            
            <Button color="primary" size="lg" className="float-right" onClick={()=>
              this.saveVenue(this.state.data, true)
            }>
              Publish
            </Button>
            
            <span className="float-right spacer"></span>
            
            <Button outline color="secondary" size="lg" className="float-right" onClick={()=>
              this.saveVenue(this.state.data, false)
            }>
              Save
            </Button>
          </div>

          {
            !this.state.loading ? (
              <Grid item container spacing={3}>
                <Grid item md={7} xs={12}>
                  <VenueDetails 
                    syncParentData={this.syncDataChanges}
                    populate={this.state.populateDataFromParent} data={this.state.data}
                  />
                </Grid>

                <Grid item md={5} xs={12}>
                  <Settings 
                    syncParentData={this.syncDataChanges}
                    populate={this.state.populateDataFromParent} data={this.state.data.settings}
                  />
                  <Offers/>
                </Grid>

                <Grid item xs={12}><hr/></Grid>

                <Grid item xs={12}>
                  <Images 
                    syncParentData={this.syncDataChanges}
                    populate={this.state.populateDataFromParent} data={this.state.data.media}  
                  />
                </Grid>

                <Grid item xs={12}>
                  <Hours 
                    syncParentData={this.syncDataChanges}
                    populate={this.state.populateDataFromParent}
                  />
                </Grid>
              </Grid>
            ) : (
              <div>
                <p>Please Wait</p>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default VenueEditor