import React, { Component, ReactChildren, ReactElement } from 'react'
import { Modal, Paper, IconButton } from '@material-ui/core'

import './Modal.scss'
import { Close } from '@material-ui/icons'

interface LightboxProps {
  open: boolean
  children: ReactElement<HTMLElement> | ReactElement<HTMLElement>[]
  onClose?: Function
}

export function Lightbox(props:LightboxProps) {
  return (
    <Modal open={props.open} 
      style={{ display: 'flex', flexDirection: 'column', padding: '2em' }}
    >
      <Paper style={{ margin: 'auto', padding: '1em' }}>
        {
          props.children
        }
      </Paper>
    </Modal>
  )
}

export function FullscreenModal(props:LightboxProps) {
  return (
    <Modal open={props.open}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Paper className="Fullscreen-modal">
        <div className="clearfix">
          <IconButton className="float-right"
            onClick={()=>{
              if(props.onClose)
                props.onClose()
            }}
          >
            <Close/>
          </IconButton>
        </div>
        {
          props.children
        }
      </Paper>
    </Modal>
  )
}

export default Lightbox