import React from 'react'
import { ButtonProps, Paper, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
  }
}))

interface IProps extends ButtonProps {
  label: string
  icon?: any
}

const PaperButton: React.FC<IProps> = ({
  label,
  icon: Icon,
  className,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Button
        {...props}
        className={classes.root}
        classes={{ label: classes.button }}
        fullWidth
      >
        <Icon className={classes.icon} />
        <Typography variant="subtitle2">{label}</Typography>
      </Button>
    </Paper>
  )
}

export default PaperButton
