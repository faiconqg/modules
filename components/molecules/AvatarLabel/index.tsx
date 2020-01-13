import React from 'react'
import Div from '../Div'
import Avatar, { IAvatar } from '../Avatar'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  label: {
    marginLeft: theme.spacing(1)
  }
}))

interface IAvatarLabel extends IAvatar {
  label: string
}

const AvatarLabel: React.FC<IAvatarLabel> = ({ label, ...props }) => {
  const classes = useStyles()

  return (
    <Div flex alignItems="center">
      <Avatar {...props} />
      <span className={classes.label}>{label}</span>
    </Div>
  )
}

export default AvatarLabel
