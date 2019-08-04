import React, { Component } from 'react'
import { Form, Button } from 'reactstrap'
import { Grid } from '@material-ui/core'
import { IVenueModel } from '@clubgo/database'

import MediaCard from '../Images/MediaCard'
import Settings from './ui/Settings'
import VenueDetails from './ui/VenueDetails'
import Hours from './ui/Hours'
import Offers from './ui/Offers';

export interface VenueEditorProps {
  intent: string,
  focusEventId?: string,
  populateData?: IVenueModel
}
export class VenueEditor extends Component<VenueEditorProps> {
  state = {
    data: {}
  }

  componentDidMount() {
    if(this.props.intent==='update')
      console.log('Updating event with props', this.props.focusEventId, this.props.populateData)
  }
  
  syncChanges = (childData, key) => {
    let { data } = this.state
    if(key==='root')
      data = { ...childData }
    else
      data[key] = { ...childData }

    this.setState({
      data
    })
  }

  onFinalize = () => {
    // TODO
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
            
            <Button color="primary" size="lg" className="float-right">Publish</Button>
            <span className="float-right spacer"></span>
            <Button outline color="secondary" size="lg" className="float-right">Save</Button>
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