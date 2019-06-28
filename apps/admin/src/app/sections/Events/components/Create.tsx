import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap'
import { UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap'

import * as M from '@material-ui/core'

import '../styles/Create.scss'

export class Create extends Component {
  state = {
    selectedArtist: null,
    loadedArtists: [
      1,2,3,4,5
    ]
  }

  artistMenuBuilder() {
    return this.state.loadedArtists.map((ar, i)=>{
      return (
        <DropdownItem key={`artist-${i}`}>Action</DropdownItem>
      )
    })
  }

  render() {
    return (
      <div className="create-event-root">
        <Form>
          <div className="clearfix">
            <span className="form-title">Create New Event</span>
            <Button color="primary" size="lg" className="float-right">Publish</Button>
            <span className="float-right spacer"></span>
            <Button outline color="secondary" size="lg" className="float-right">Save</Button>
          </div>

          <section className="create-section">
            {
              // Event Details Section  ----------------------------------------------  Event Details Section
              // ============================================================================================
            }
            <h4 className="title">Event Details</h4>

            <FormGroup>
              <Label className="required">Event Name</Label>
              <Input type="text" required placeholder="Main Event Title"/>
              <FormFeedback>Sorry! Name Taken</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label>Event Tagline</Label>
              <Input type="text" placeholder="Tagline"/>
            </FormGroup>

            <FormGroup>
              <Label>Artist</Label>
              <UncontrolledDropdown>
                <DropdownToggle caret> Select </DropdownToggle>
                <DropdownMenu>
                  {
                    this.artistMenuBuilder()
                  }
                </DropdownMenu>
              </UncontrolledDropdown>

              <Label>{ this.state.selectedArtist }</Label>
            </FormGroup>

            <FormGroup>
              <Label>Category</Label>
              <Input type="text" placeholder="Event Category. Start tying..."/>
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <Input type="textarea" rows="8" placeholder="A description for the event"/>
            </FormGroup>
          </section>

          <section className="create-section">
            {
              // Venue Details Section  ----------------------------------------------  Venue Details Section
              // ============================================================================================
            }
            <h4 className="title">Venue Details</h4>

            <FormGroup>
              <Label className="required">City</Label>
              <Input type="text" required placeholder="Select City. Start Typing..."/>
            </FormGroup>

            <FormGroup>
              {/* <FormGroup> */}
                <Label className="required">Venue Name</Label>
                <Input type="text" required placeholder="Select Venue. Start Typing..."/>
              {/* </FormGroup> */}
            </FormGroup>
              
              <FormGroup>  
                <Label>Custom Venue</Label>
                <M.Switch
                  value="checkedB"
                  color="primary"
                />
              </FormGroup>

            <FormGroup>
              <Label className="required">Venue Category</Label>
              <UncontrolledDropdown>
                <DropdownToggle caret> Select </DropdownToggle>
                <DropdownMenu>
                  {
                    this.artistMenuBuilder()
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
            </FormGroup>
          </section>

          <section className="create-section">
            {
              // Venue Details Section  ---------------------------------------------------------------------
              // ============================================================================================
            }
            <h4 className="title">Venue Details</h4>

            <FormGroup>
              <Label className="required">Venue Name</Label>
              <Input type="text" required placeholder="Select Venue"/>
            </FormGroup>
          </section>
        </Form>
      </div>
    )
  }
}

export default Create