import React from 'react'
import { makeStyles, darken } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Div from '../Div'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(3)
  },
  header: {
    color: darken(theme.palette.primary.light, 0.6)
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  divider: {
    borderBottomColor: 'rgba(0,0,0,0.12)',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    marginBottom: theme.spacing(2)
  }
}))

interface ISection {
  title?: string
  right?: any
  divider?: boolean
}

const Section: React.FC<ISection> = ({ title, right, divider, children }) => {
  const classes = useStyles()

  return (
    <section className={clsx(classes.root, divider && classes.divider)}>
      {title || right ? (
        <Div flex alignItems="center" className={classes.header}>
          <Div flex alignItems="center" className={classes.title}>
            <Typography variant="h6">{title || '⠀'}</Typography>
          </Div>
          {right && (
            <Div flex full alignItems="center" justify="flexEnd">
              {right}
            </Div>
          )}
        </Div>
      ) : null}
      {children}
    </section>
  )
}

export default Section
