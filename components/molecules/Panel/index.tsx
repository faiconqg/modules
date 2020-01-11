import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid, GridProps } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  footer: {
    overflow: 'hidden',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2) * -1,
    marginRight: theme.spacing(2) * -1,
    marginBottom: theme.spacing(2) * -1,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  },
  footerInner: {
    position: 'relative'
  },
  invert: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
  },
  regular: {
    color: theme.palette.text.secondary
  },
  header: {
    // overflowX: 'auto',
    paddingBottom: theme.spacing(2),
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    paddingLeft: theme.spacing(1),
    wordBreak: 'break-word',
    lineHeight: 'unset'
  },
  rightTitle: {
    wordBreak: 'break-word'
  },
  left: {
    display: 'flex',
    alignItems: 'center'
  },
  right: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}))

interface IPanel extends GridProps {
  icon?: any
  title?: string
  rightTitle?: string
  invert?: boolean
  right?: any
  left?: any
  footer?: any
}

const Panel: React.FC<IPanel> = ({
  icon,
  title,
  invert,
  left,
  right,
  footer,
  rightTitle,
  children,
  container = true,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Paper
      className={clsx(classes.root, invert ? classes.invert : classes.regular)}
    >
      {left || rightTitle || icon || !!title || !!right ? (
        <div className={classes.header}>
          {left && <div className={classes.left}>{left}</div>}
          {icon}
          {title && (
            <Typography variant="subtitle2" className={classes.title}>
              {title}
            </Typography>
          )}
          {right || rightTitle ? (
            <div className={classes.right}>
              <Typography className={classes.rightTitle} variant="caption">
                {rightTitle}
              </Typography>
              {right}
            </div>
          ) : null}
        </div>
      ) : null}
      <Grid {...props} container={container}>
        {children}
      </Grid>
      {footer && (
        <div className={classes.footer}>
          <div className={classes.footerInner}>{footer}</div>
        </div>
      )}
    </Paper>
  )
}

export default Panel
