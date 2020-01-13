import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AvatarProps, Avatar as AvatarBase } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
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

export interface IAvatar extends AvatarProps {
  iconClass?: any
  icon?: any
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

const Avatar: React.FC<IAvatar> = ({
  color,
  colorRaw,
  iconClass: Icon,
  icon,
  letters,
  size = 24,
  ...props
}) => {
  const classes = useStyles()

  return (
    <AvatarBase
      {...props}
      className={classes[color || 'inherit']}
      style={{
        width: size,
        height: size,
        backgroundColor: colorRaw,
        fontSize: size / 2
      }}
    >
      {icon ? (
        icon
      ) : Icon ? (
        <Icon
          style={{
            width: (size / 3) * 2,
            height: (size / 3) * 2
          }}
        />
      ) : (
        letters
      )}
    </AvatarBase>
  )
}

export default Avatar
