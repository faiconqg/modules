import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'
import Div from '../Div'

const useStyles = makeStyles(theme => ({
  root: {
    // paddingRight: theme.spacing(2),
    // [theme.breakpoints.down('xs')]: {
    //   paddingRight: theme.spacing(1)
    // }
  },
  padLeft: {
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1.5)
    }
  },
  inherit: {
    color: 'inherit'
  },
  textPrimary: {
    color: theme.palette.text.primary
  },
  textSecondary: {
    color: theme.palette.text.secondary
  },
  primary: {
    color: theme.palette.primary.main
  },
  primaryLight: {
    color: theme.palette.primary.light
  },
  primaryDark: {
    color: theme.palette.primary.dark
  },
  secondary: {
    color: theme.palette.secondary.main
  },
  secondaryLight: {
    color: theme.palette.secondary.light
  },
  secondaryDark: {
    color: theme.palette.secondary.dark
  },
  secondaryValue: {
    marginLeft: theme.spacing(1)
  },
  strongLabel: {
    fontSize: 13,
    fontWeight: 500
  }
}))

interface IInfoValue {
  noPadding?: boolean
  padLeft?: boolean
  label?: string
  strongLabel?: boolean
  value?: any
  secondaryValue?: any
  color?:
    | 'inherit'
    | 'primary'
    | 'primaryLight'
    | 'primaryDark'
    | 'secondary'
    | 'secondaryLight'
    | 'secondaryDark'
    | 'textPrimary'
    | 'textSecondary'
}

const InfoValue: React.FC<IInfoValue> = ({
  label,
  strongLabel,
  noPadding = false,
  color,
  value,
  secondaryValue
}) => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, !noPadding && classes.padLeft)}>
      <Typography
        variant="caption"
        className={strongLabel ? classes.strongLabel : undefined}
      >
        {label}
      </Typography>
      <Div flex alignItems="baseline">
        <Typography variant="h6" className={classes[color || 'inherit']}>
          {value}
        </Typography>
        {secondaryValue ? (
          <Typography variant="subtitle2" className={classes.secondaryValue}>
            {secondaryValue}
          </Typography>
        ) : null}
      </Div>
    </div>
  )
}

export default InfoValue
