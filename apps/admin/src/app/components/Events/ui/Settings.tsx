import React, { Component } from 'react'
import { Label } from 'reactstrap'
import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox } from '@material-ui/core'

import { handleChangeById as inputHandler } from '@clubgo/util'

export class Settings extends Component {
  state = {
    data: {
      isFeatured: false,
      isPublished: true,
      eventPriority: null,
      featured: {
        featuredText: null,
        featuredPriority: null
      }
    },
    requiredFulfilled: false,
    required: [
      'isPublished', 'isFeatured', 'eventPriority'
    ],
    itratableMembers: [
      
    ]
  }
  
  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  render() {
    return (
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Paper className="create-block">
            <h3 className="title">Settings</h3>

            <Grid item container xs={12} spacing={3}>
              <Grid item xs={6}>
                <Switch id="isPublished" defaultChecked color="primary" onChange={this.handleChangeById}/>  
                <Label>Published</Label>
              </Grid>

              <Grid item xs={6}>
                <Switch id="isFeatured" color="primary" onChange={this.handleChangeById}/>
                <Label>Featured</Label>
              </Grid>

              <Grid item xs={12}>
                {
                  !this.state.data.isFeatured ? (
                    <div></div>
                  ) : (
                    <TextField id="featured/featuredText" fullWidth label="Featured Text" 
                      variant="outlined" margin="dense" onChange={this.handleChangeById}
                    />
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
                />

                {
                  !this.state.data.isFeatured ? (
                    <div></div>
                  ) : (
                    <TextField id="featured/featuredPriority" fullWidth label="Featured Priority (num)" 
                      variant="outlined" margin="dense" onChange={this.handleChangeById}
                    />
                  )
                }
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default Settings