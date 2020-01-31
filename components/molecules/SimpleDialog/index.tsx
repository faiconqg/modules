import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core'

// const useStyles = makeStyles(theme => ({}))

type DialogAction = {
  label: string
  action: () => void
}

interface ISimpleDialog extends DialogProps {
  message?: string
  title?: string
  actions: DialogAction[]
}

const SimpleDialog: React.FC<ISimpleDialog> = ({
  title,
  message,
  actions,
  ...props
}) => {
  // const classes = useStyles()

  return (
    <Dialog {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions.map((action, index) => (
          <Button key={index} onClick={action.action} color="primary">
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  )
}

export default SimpleDialog
