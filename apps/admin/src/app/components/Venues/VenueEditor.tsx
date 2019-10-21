import React, { Component } from 'react'
import { Form, Button } from 'reactstrap'
import { Grid, Paper } from '@material-ui/core'
import { IVenueModel, ITicketModel } from '@clubgo/database'
import Select from 'react-select'

// import Images from './ui/Images'
import Settings from './ui/Settings'
import VenueDetails from './ui/VenueDetails'
import Hours from './ui/Hours'

import { VenueContext } from './VenueContext'
import { TicketEditor } from '../Tickets/TicketEditor'
import { Ticket } from '../Tickets/Ticket'
import { DatabaseService } from '@clubgo/api'
import { MediaCard } from '../Images/MediaCard'

interface VenueEditorProps {
  intent: string
  onFinalize: Function
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
      defaultEntryType: null,
      timings: [],
      offers: [],
      media: {
        cover: {
          images: [],
          videoURL: undefined
        },
        food: {
          images: []
        },
        ambiance: {
          images: []
        },
        bar: {
          images: []
        }
      }
    },
    openTicketEditor: false,
    suggestions: {
      tickets: [].map((item:ITicketModel)=>({
        label: item.ticketTitle, value: item
      }))
    }
  }

  auxTicketService = new DatabaseService('/ticket')

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

    this.auxTicketService.searchBy({}).then((response)=>{
      let apiResponse = response.data
      if (apiResponse.results.length!==0) {
        let { suggestions } = this.state
        suggestions.tickets = apiResponse.results.map((item:ITicketModel)=>({
          label: item.ticketTitle, value: item
        }))
  
        this.setState({
          suggestions
        })
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

      this.setState({ data })
      clearInterval(transition)
      this.ongoingStateTransition = false
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

    if(publish) 
      createBody.settings.isPublished = true
    this.props.onFinalize(createBody)
  }

  render() {
    return (
      <div className="create-form">
        <div>
          <div className="clearfix">
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
                    syncData={this.state.collectChildData} syncParentData={this.syncDataChanges} />
                </Grid>

                <Grid item md={5} xs={12}>
                  <Settings populate={this.state.populateDataFromParent} data={this.state.data.settings}
                    syncData={this.state.collectChildData} syncParentData={this.syncDataChanges} />

                  <Paper className="create-block">
                    <h3 className="title">Default Ticket</h3>

                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid><Grid item xs={12}></Grid>
                      <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Button style={{ margin: 'auto 0' }} onClick={()=>{
                          this.setState({
                            openTicketEditor: true
                          })
                        }}>
                          Create Ticket
                        </Button>

                        <TicketEditor open={this.state.openTicketEditor}
                          onCancel={()=>{
                            this.setState({
                              openTicketEditor: false
                            })
                          }}
                          onFinalize={async (ticket)=>{
                            try {
                              let apiResponse = await this.auxTicketService.create(ticket)
                              let { data } = this.state
                              data.defaultEntryType = ticket
                              this.setState(()=>({
                                data,
                                openTicketEditor: false
                              }))
                            } catch (HTTPError) {
                              alert(HTTPError)
                            }
                          }}
                        />
                      </Grid>

                      <Grid item xs={8}>
                        <Select
                          inputId="searchTicketName"
                          placeholder="Search Ticket"
                          backspaceRemovesValue
                          value={null}
                          options={this.state.suggestions.tickets}
                          onChange={({ value }:{ value:ITicketModel })=>{
                            let { data } = this.state
                            data.defaultEntryType = value
                            this.setState({
                              data
                            })
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        {
                          this.state.data.defaultEntryType!==null ? (
                            <div>
                              <Ticket data={this.state.data.defaultEntryType}
                                onDelete={()=>{
                                  let { data } = this.state
                                  data.defaultEntryType = null
                                  this.setState(()=>({
                                    data
                                  }))
                                }}
                                onEdit={(updateBody)=>{
                                  let { data } = this.state
                                  data.defaultEntryType = updateBody
                                  this.setState({
                                    data
                                  })
                                }}
                              />
                            </div>
                          ) : null
                        }
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12}><hr/></Grid>

                <Grid item md={6} xs={12}>
                  <MediaCard populate={this.state.populateDataFromParent} data={this.state.data.media.cover}
                    tag="cover" includeVideoURL={true} syncData={this.state.collectChildData} syncParentData={(_data)=>{
                      let transition = setInterval(()=>{
                        if(this.ongoingStateTransition)
                          return
                        this.ongoingStateTransition = true

                        let { data } = this.state
                        data.media.cover = _data
                        this.setState({ data })
                        clearInterval(transition)
                        this.ongoingStateTransition = false
                      }, 100)
                    }} />
                </Grid>
                <Grid item md={6} xs={12}>
                  <MediaCard populate={this.state.populateDataFromParent} data={this.state.data.media.food}
                    tag="food" includeVideoURL={false} syncData={this.state.collectChildData} syncParentData={(_data)=>{
                      let transition = setInterval(()=>{
                        if(this.ongoingStateTransition)
                          return
                        this.ongoingStateTransition = true

                        let { data } = this.state
                        data.media.food = _data
                        this.setState({ data })
                        clearInterval(transition)
                        this.ongoingStateTransition = false
                      }, 100)
                    }} />
                </Grid>
                <Grid item md={6} xs={12}>
                  <MediaCard populate={this.state.populateDataFromParent} data={this.state.data.media.ambiance}
                    tag="ambiance" includeVideoURL={false} syncData={this.state.collectChildData} syncParentData={(_data)=>{
                      let transition = setInterval(()=>{
                        if(this.ongoingStateTransition)
                          return
                        this.ongoingStateTransition = true

                        let { data } = this.state
                        data.media.ambiance = _data
                        this.setState({ data })
                        clearInterval(transition)
                        this.ongoingStateTransition = false
                      }, 100)
                    }} />
                </Grid>
                <Grid item md={6} xs={12}>
                  <MediaCard populate={this.state.populateDataFromParent} data={this.state.data.media.bar}
                    tag="bar" includeVideoURL={false} syncData={this.state.collectChildData} syncParentData={(_data)=>{
                      let transition = setInterval(()=>{
                        if(this.ongoingStateTransition)
                          return
                        this.ongoingStateTransition = true

                        let { data } = this.state
                        data.media.bar = _data
                        this.setState({ data })
                        clearInterval(transition)
                        this.ongoingStateTransition = false
                      }, 100)
                    }} />
                </Grid>

                <Grid item xs={12}>
                  <Hours populate={this.state.populateDataFromParent} data={this.state.data.timings}  
                    syncData={this.state.collectChildData} syncParentData={this.syncDataChanges} />
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