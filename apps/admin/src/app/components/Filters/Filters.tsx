import React, { Component } from 'react'
import { Grid, Paper, InputAdornment, MenuItem, Fab, IconButton } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox, Chip } from '@material-ui/core'
import Select from 'react-select'

interface FilterProps {
  onChange: Function
  filters?: Array<{
    key: string
    placeholder: string
    suggestions: Array<{
      label: string
      value: any
    }>
  }>
}

export class Filters extends Component<FilterProps> {
  state = {
    appliedFilters: {
      $text: undefined
    }
  }

  componentDidMount() {
    this.setState({
      suggestions: this.props.filters
    })
  }  

  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <TextField label="Search Text" fullWidth variant="outlined" 
              margin="dense"
              onChange={({ target })=>{
                let { appliedFilters } = this.state
                this.setState(()=>{
                  if(target.value!=="")
                    appliedFilters.$text = {
                      $search: target.value
                    }
                  else
                    appliedFilters.$text = undefined
                  return {
                    appliedFilters
                  }
                })
              }}
            />
          </Grid>

          {
            this.props.filters!==undefined ? (
              this.props.filters.map((filter, index)=>{
                return (
                  <Grid item md={2} xs={4} key={filter.key}>
                    <Select 
                      inputId={filter.key}
                      options={filter.suggestions}
                      placeholder={filter.placeholder}
                      isClearable
                      onChange={(selected)=>{
                        this.setState(()=>{
                          let { appliedFilters } = this.state
                          if(selected!==null)
                            appliedFilters[filter.key] = selected.value
                          else
                            appliedFilters[filter.key] = undefined
                          return {
                            appliedFilters
                          }
                        })
                      }}
                    />
                  </Grid>
                )
              })
            ) : (
              null
            )
          }

          <Grid item xs={3}>
            <Button variant="outlined" style={{ margin: '0.55em 0' }} onClick={()=>{
              this.props.onChange(this.state.appliedFilters)
            }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Filters
