import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, CircularProgressProps } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(8)
  }
}))

interface IBusy extends Omit<CircularProgressProps, 'size'> {
  size?: 'big' | 'medium' | 'small'
  rawSize?: number
}

const Busy: React.FC<IBusy> = ({
  rawSize,
  thickness,
  size = 'medium',
  ...props
}) => {
  const classes = useStyles()

  if (size === 'big') {
    rawSize = 58
    thickness = 4
  } else if (size === 'medium') {
    rawSize = 32
    thickness = 5
  } else if (size === 'small') {
    rawSize = 16
    thickness = 6
  }

  return (
    <div className={classes.root}>
      <CircularProgress size={rawSize} thickness={thickness} {...props} />
    </div>
  )
}

export default Busy
