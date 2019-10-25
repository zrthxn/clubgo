import React, { Component } from 'react'
import { Grid, Paper, IconButton, Tooltip } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import '../scss/Artists.scss'

import { IArtistModel } from '@clubgo/database'
import { ArtistEditor } from './ArtistEditor'
import { DatabaseService } from '@clubgo/api'

interface ArtistProps {
  data: IArtistModel
  onEdit: Function
  onDelete: Function
}

export class Artist extends Component<ArtistProps> {
  state = {
    openArtistEditor: false
  }
  
  artistService = new DatabaseService('/artist')
  
  render() {
    return (
      <Paper className="artist-block">
        <div>
          <h3 className="artist-name">{ this.props.data.artistTitle }</h3>
        </div>
        
        <div className="clearfix" style={{ padding: '1em 0 0 0' }}>
          <div className="float-right">
            <IconButton onClick={()=>{
              this.setState({
                openArtistEditor: true
              })
            }}>
              <Edit/>
            </IconButton>
            
            <IconButton onClick={()=>{
              if(this.props.onDelete!==undefined)
                this.props.onDelete()
            }}>
              <Delete/>
            </IconButton>
          </div>
          
          {
            this.state.openArtistEditor ? (
              <ArtistEditor open={this.state.openArtistEditor}
                data={this.props.data}
                populate={true}
                onFinalize={(artist:IArtistModel)=>{
                  this.artistService.update(this.props.data._id, artist).then(()=>{
                    if(this.props.onEdit!==undefined)
                      this.props.onEdit(artist)
                      
                    this.setState({
                      openArtistEditor: false
                    })
                  })
                }}
                onCancel={()=>{
                  this.setState({
                    openArtistEditor: false
                  })
                }}
              />
            ) : null
          }
        </div>
      </Paper>
    )
  }
}

export default Artist
