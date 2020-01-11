import React, { FC } from 'react'
import { makeStyles, darken } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Div from '../Div'

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(2)
  },
  header: {
    color: darken(theme.palette.primary.light, 0.6)
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}))

interface ISection {
  title?: string
  right?: any
}

const Section: FC<ISection> = ({ title, right, children }) => {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      {title || right ? (
        <Div flex alignItems="center" className={classes.header}>
          {title && (
            <Div flex alignItems="center" className={classes.title}>
              <Typography variant="h6">{title}</Typography>
            </Div>
          )}
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
