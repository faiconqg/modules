import React from 'react'
import { ButtonProps, Paper, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row'
    },
    justifyItems: 'center',
    width: '100%',
    height: '100%'
  },
  icon: {
    width: 36,
    height: 36,
    [theme.breakpoints.down('xs')]: {
      width: 26,
      height: 26
    }
  },
  marginRight: {
    marginRight: theme.spacing(1)
  },
  marginLeft: {
    marginLeft: theme.spacing(1)
  }
}))

interface IProps extends Omit<ButtonProps, 'color'> {
  label: string
  icon?: any
  marginRight?: boolean
  marginLeft?: boolean
  color?:
    | 'initial'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error'
}

const PaperButton: React.FC<IProps> = ({
  label,
  icon: Icon,
  marginLeft,
  marginRight,
  className,
  color,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Paper
      className={clsx(
        classes.root,
        marginRight && classes.marginRight,
        marginLeft && classes.marginLeft
      )}
    >
      <Button
        {...props}
        className={classes.root}
        classes={{ label: classes.button }}
        fullWidth
      >
        <Icon className={classes.icon} color={color} />
        <Typography variant="subtitle2" color={color}>
          {label}
        </Typography>
      </Button>
    </Paper>
  )
}

export default PaperButton
