import React, { ReactChildren, CSSProperties, ReactChild, ReactNode } from 'react'
import { Modal, Paper, Button } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

export interface DeleteModalProps {
  isOpen: boolean,
  confirm: Function,
  close: Function,
  children?: ReactChild | ReactNode | HTMLElement,
  style?: CSSProperties,
  className?: string
}
export function ConfirmDelete(props:DeleteModalProps) {
  return (
    <Modal open={props.isOpen}
      style={{
        margin: 'auto',
        width: 400,
        position: 'absolute',
        textAlign: 'center'
      }}
    >
      <Paper style={{ padding: '2em', margin: '10em 0' }}>
        {
          props.children
        }

        <Button variant="outlined" color="default" style={{ margin: '0.5em' }} onClick={()=>props.close()}>
          Cancel
        </Button>

        <Button variant="contained" color="primary" style={{ margin: '0.5em', backgroundColor: red[600] }} onClick={()=>props.confirm()}>
          Delete
        </Button>
      </Paper>
    </Modal>
  )
}

export default ConfirmDelete
