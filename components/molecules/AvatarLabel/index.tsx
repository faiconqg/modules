import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AvatarProps, Avatar } from '@material-ui/core'
import Div from '../Div'

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(1)
  }
}))

interface IAvatarLabel extends AvatarProps {
  iconClass?: any
  icon?: any
  label?: string
  letters?: string
  color?: string
  size?: number
}

const AvatarLabel: React.FC<IAvatarLabel> = ({
  label,
  color,
  iconClass,
  icon,
  letters,
  size = 24,
  ...props
}) => {
  const classes = useStyles()

  const Icon = iconClass

  return (
    <Div flex alignItems="center">
      <Avatar
        {...props}
        className={classes.avatar}
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          fontSize: size / 2
        }}
      >
        {icon ? (
          icon
        ) : iconClass ? (
          <Icon
            style={{
              width: (size / 3) * 2,
              height: (size / 3) * 2
            }}
          />
        ) : (
          letters
        )}
      </Avatar>
      {label}
    </Div>
  )
}

export default AvatarLabel
