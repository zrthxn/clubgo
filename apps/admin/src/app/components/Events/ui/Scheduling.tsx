import React, { Component } from 'react'
import * as Rs from 'reactstrap'

import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox } from '@material-ui/core'

export interface SchedulingProps {
  syncParentData?: Function,
  syncData?: boolean,
  populate?: boolean,
  data?: any
}
export class Scheduling extends Component<SchedulingProps> {
  render() {
    return (
      <Paper className="create-block">
        <h3 className="title">Scheduling</h3>

      </Paper>
    )
  }
}

export default Scheduling