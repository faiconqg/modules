import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: 'calc(100% + 20px)',
    minHeight: theme.spacing(4),
    width: 1,
    flexShrink: 0,
    marginLeft: 20,
    marginRight: 20,
    background: theme.palette.grey[300]
  }
}))

const Divider: FC = () => {
  const classes = useStyles()

  return <div className={classes.root} />
}

export default Divider
