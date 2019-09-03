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
  onFinalize: Function,
  populateData?: IVenueModel
}
export class VenueEditor extends Component<VenueEditorProps> {
  static contextType = VenueContext
  context!: React.ContextType<typeof VenueContext>

  ongoingStateTransition = false

  state = {
    loading: true,
    populateDataFromParent: false,
    collectChildData: false,
    data: {
      ref: Date.now().toString(36),
      owner: 'admin',
      venueTitle: undefined,
      description: undefined,
      categories: [],
      city: undefined,
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
    let transition = setInterval(()=>{
      if(this.ongoingStateTransition)
        return

      this.ongoingStateTransition = true
      
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

      clearInterval(transition)
      this.ongoingStateTransition = false
      this.setState({
        data,
        syncData: false
      })  
    }, 100)    
  }

  collectChildData = () => {
    return new Promise((resolve, reject)=>{
      if(this.state.collectChildData) resolve()
      this.setState({
        collectChildData: true
      })

      setTimeout(()=>{
        let waiting = setInterval(()=>{
          if(this.state.collectChildData && !this.ongoingStateTransition) {
            clearInterval(waiting)
            resolve()
          }
        }, 100)
      }, 100)
    })
  }

  saveVenue = async (publish?:boolean) => {
    await this.collectChildData()

    let createBody = this.state.data
    this.setState({
      collectChildData: false
    })

    // if(publish) createBody.settings.isPublished = true
    this.props.onFinalize(createBody)
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
              this.saveVenue(true)
            }>
              Publish
            </Button>
            
            <span className="float-right spacer"></span>
            
            <Button outline color="secondary" size="lg" className="float-right" onClick={()=>
              this.saveVenue(false)
            }>
              Save
            </Button>

            <span className="float-right spacer"></span>

            <Button outline color="error" size="lg" className="float-right" onClick={()=>{
              this.context.actions.openVenueListing()
            }}>
              Cancel
            </Button>
          </div>

          {
            !this.state.loading ? (
              <Grid item container spacing={3}>
                <Grid item md={7} xs={12}>
                  <VenueDetails populate={this.state.populateDataFromParent} data={this.state.data}
                    syncData={this.state.collectChildData} syncParentData={this.syncDataChanges}
                  />
                </Grid>

                <Grid item md={5} xs={12}>
                  <Settings populate={this.state.populateDataFromParent} data={this.state.data.settings}
                    syncData={this.state.collectChildData} syncParentData={this.syncDataChanges}
                  />
                  <Offers/>
                </Grid>

                <Grid item xs={12}><hr/></Grid>

                <Grid item xs={12}>
                  <Images populate={this.state.populateDataFromParent} data={this.state.data.media}  
                    syncParentData={this.syncDataChanges}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Hours populate={this.state.populateDataFromParent} data={this.state.data.timings}  
                    syncData={this.state.collectChildData} syncParentData={this.syncDataChanges}
                  />
                </Grid>
              </Grid>
            ) : (
              <div>
                <p>Please Wait</p>
              </div>
            )
          }
          
          <div className="clearfix" style={{ padding: '1em' }}>            
            <Button color="primary" size="lg" className="float-right" onClick={()=>
              this.saveVenue(true)
            }>
              Publish
            </Button>
            
            <span className="float-right spacer"></span>
            
            <Button outline color="secondary" size="lg" className="float-right" onClick={()=>
              this.saveVenue(false)
            }>
              Save
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default VenueEditor