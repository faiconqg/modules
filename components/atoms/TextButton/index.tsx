import React, { FC } from 'react'
import { Button, ButtonProps, makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    boxShadow: 'none',
    color: theme.palette.grey[500],
    '&:hover': {
      color: theme.palette.primary.main,
      boxShadow: 'none',
      background: 'none',
      backgroundColor: 'none'
    },
    '&:focus': {
      color: theme.palette.primary.main,
      boxShadow: 'none',
      background: 'none',
      backgroundColor: 'none'
    }
  },
  invert: {
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: theme.palette.primary.light
    },
    '&:focus': {
      color: theme.palette.primary.light
    }
  }
}))

interface IProps extends ButtonProps {
  invert?: boolean
}

const TextButton: FC<IProps> = ({
  className,
  invert,
  disableRipple = true,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Button
      color="inherit"
      disableRipple={disableRipple}
      className={clsx(className, classes.root, invert && classes.invert)}
      {...props}
    />
  )
}

export default TextButton
