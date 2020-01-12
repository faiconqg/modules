import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AvatarProps, Avatar } from '@material-ui/core'
import Div from '../Div'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(1)
  },
  inherit: {
    backgroundColor: 'inherit'
  },
  primary: {
    backgroundColor: theme.palette.primary.main
  },
  primaryLight: {
    backgroundColor: theme.palette.primary.light
  },
  primaryDark: {
    backgroundColor: theme.palette.primary.dark
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main
  },
  secondaryLight: {
    backgroundColor: theme.palette.secondary.light
  },
  secondaryDark: {
    backgroundColor: theme.palette.secondary.dark
  }
}))

interface IAvatarLabel extends AvatarProps {
  iconClass?: any
  icon?: any
  label?: string
  letters?: string
  color?:
    | 'inherit'
    | 'primary'
    | 'primaryLight'
    | 'primaryDark'
    | 'secondary'
    | 'secondaryLight'
    | 'secondaryDark'
  colorRaw?: string
  size?: number
}

const AvatarLabel: React.FC<IAvatarLabel> = ({
  label,
  color,
  colorRaw,
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
        className={clsx(classes.avatar, classes[color || 'inherit'])}
        style={{
          width: size,
          height: size,
          backgroundColor: colorRaw,
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
