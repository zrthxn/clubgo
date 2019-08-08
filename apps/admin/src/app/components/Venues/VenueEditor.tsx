import React, { Component } from 'react'
import { Form, Button } from 'reactstrap'
import { Grid } from '@material-ui/core'
import { IVenueModel } from '@clubgo/database'

import MediaCard from '../Images/MediaCard'
import Settings from './ui/Settings'
import VenueDetails from './ui/VenueDetails'
import Hours from './ui/Hours'
import Offers from './ui/Offers'

import { VenueService } from '@clubgo/features/api'

export interface VenueEditorProps {
  intent: string,
  onFinalize: Function,
  onError: Function,
  focusEventId?: string,
  populateData?: IVenueModel
}
export class VenueEditor extends Component<VenueEditorProps> {
  state = {
    data: {
      venueTitle: null,
      description: null,
      categories: [],
      locality: null,
      address: null,
      altAddress: null,
      nearestMetroStation: null,
      coordinates: {
        _lat: 0,
        _lon: 0
      },
      knownFor: [],
      cuisines: null,
      facilities: [],
      costForTwo: null,
      settings: {
        isPublished: false,
        venuePriority: null,
        isFeatured: false,
        featured: {
          featuredText: null,
          featuredPriority: null
        }
      },
      timings: [],
      offers: [],
      media: {
        images: [],
        videoURL: null
      }
    }
  }

  venueService = new VenueService('admin')

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(this.props.intent==='update') {
      console.log('Updating event with props', this.props.focusEventId, this.props.populateData)
      // this.state.data = this.props.populateData
      this.populate(this.props.populateData)
    }
  }
  
  syncChanges = (childData, key) => {
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

    this.setState({
      data
    })
  }

  populate = (data) => {
    console.log(data)
  }

  create = async (publish?) => {
    let { data } = this.state
    if(publish)
      data.settings.isPublished = true

    let result
    try {
      result = await this.venueService.createVenue(data)
    } catch(e) {
      result = e
    }

    if(result.status===201)
      this.props.onFinalize('Venue Created')
    else
      this.props.onError(result)
  }

  save = () => {
    
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
            
            <Button color="primary" size="lg" className="float-right"
              onClick={()=>{
                this.create(true)
              }}
            >
              Publish
            </Button>
            
            <span className="float-right spacer"></span>
            
            <Button outline color="secondary" size="lg" className="float-right" onClick={this.save}>
              Save
            </Button>
          </div>

          <Grid item container spacing={3}>
            <Grid item md={7} xs={12}>
              <VenueDetails syncParentData={this.syncChanges}/>
            </Grid>

            <Grid item md={5} xs={12}>
              <Settings syncParentData={this.syncChanges}/>
              <Offers/>
            </Grid>

            <Grid item xs={12}><hr/></Grid>

            <Grid item md={6} xs={12}>
              <MediaCard tag="cover" name="cover" syncParentData={this.syncChanges}/>
              <MediaCard tag="ambiance" name="ambiance" syncParentData={this.syncChanges}/>
            </Grid>

            <Grid item md={6} xs={12}>
              <MediaCard tag="food" name="food" syncParentData={this.syncChanges}/>
              <MediaCard tag="bar" name="bar" syncParentData={this.syncChanges}/>
            </Grid>

            <Grid item xs={12}>
              <Hours syncParentData={this.syncChanges}/>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default VenueEditor