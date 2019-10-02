import React, { Component, ReactChildren, ReactElement } from 'react'
import { Modal, Paper } from '@material-ui/core'

import './Modal.scss'

interface LightboxProps {
  open: boolean
  children: ReactElement<HTMLElement> | Array<ReactElement<HTMLElement>>
}

export function Lightbox(props:LightboxProps) {
  return (
    <Modal open={props.open} style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '2em'
    }}>
      <Paper style={{
        margin: 'auto',
        padding: '1em',
        maxWidth: '600px'
      }}>
        {
          props.children
        }
      </Paper>
    </Modal>
  )
}
