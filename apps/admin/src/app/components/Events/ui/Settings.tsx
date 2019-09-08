import React, { Component } from 'react'
import { Label } from 'reactstrap'
import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox } from '@material-ui/core'

import { handleChangeById as inputHandler } from '@clubgo/util'

export interface SettingsProps {
  syncParentData?: Function
  syncData?: boolean,
  populate?: boolean,
  data?: any
}
export class Settings extends Component<SettingsProps> {
  state = {
    loading: true,
    synchronized: false,
    data: {
      isFeatured: false,
      isPublished: true,
      eventPriority: undefined,
      featured: {
        featuredText: undefined,
        featuredPriority: undefined
      }
    }
  }

  componentDidMount() {
    this.setState(()=>{
      if(this.props.populate) {
        return {
          data: this.props.data,
          loading: false,
        }
      }
      else
        return {
          loading: false,
        }
    }) 
  }

  componentDidUpdate() { 
    // if(this.state.synchronized)
    //   this.setState({ synchronized: false })
         
    if(this.props.syncData!==this.state.synchronized) { 
      if(this.props.syncData) {
        this.props.syncParentData(this.state.data, 'settings')
        this.setState({
          synchronized: this.props.syncData
        })
      }        
    }
  }
  
  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  render() {
    if(!this.state.loading) return (
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Paper className="create-block">
            <h3 className="title">Settings</h3>

            <Grid item container xs={12} spacing={3}>
              <Grid item xs={6}>
                <Switch id="isPublished" color="primary" 
                  defaultChecked={this.state.data.isPublished} onChange={this.handleChangeById}/>  
                <Label>Published</Label>
              </Grid>

              <Grid item xs={6}>
                <Switch id="isFeatured" color="primary" 
                  defaultChecked={this.state.data.isFeatured} onChange={this.handleChangeById}/>
                <Label>Featured</Label>
              </Grid>

              <Grid item xs={12}>
                {
                  !this.state.data.isFeatured ? (
                    <div></div>
                  ) : (
                    <TextField id="featured/featuredText" fullWidth label="Featured Text" 
                      variant="outlined" margin="dense" onChange={this.handleChangeById}
                      value={this.state.data.featured.featuredText}/>
                  )
                }
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className="create-block">
            <h3 className="title">Priority</h3>

            <Grid item container xs={12} spacing={3}>
              <Grid item xs={12}>
                <TextField id="eventPriority" fullWidth label="Event Priority (num)" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}
                  value={this.state.data.eventPriority}/>

                {
                  !this.state.data.isFeatured ? (
                    <div></div>
                  ) : (
                    <TextField id="featured/featuredPriority" fullWidth label="Featured Priority (num)" 
                      variant="outlined" margin="dense" onChange={this.handleChangeById}
                      value={this.state.data.featured.featuredPriority}/>
                  )
                }
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
    else return (
      <h3>Loading...</h3>
    )
  }
}

export default Settings