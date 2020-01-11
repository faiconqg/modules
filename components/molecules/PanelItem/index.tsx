import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid, GridProps } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.5, 1)
  },
  invert: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: theme.palette.primary.contrastText
  },
  regular: {
    backgroundColor: 'rgba(0,0,0,0.04)',
    color: theme.palette.text.secondary
  },
  header: {
    // overflowX: 'auto',
    paddingBottom: theme.spacing(1),
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontSize: 13,
    paddingLeft: theme.spacing(0.5),
    lineHeight: 'unset',
    wordBreak: 'break-word'
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

interface IPanelItem extends GridProps {
  icon?: any
  title?: string
  rightTitle?: string
  invert?: boolean
  right?: any
  left?: any
}

const PanelItem: FC<IPanelItem> = ({
  icon,
  title,
  invert,
  left,
  right,
  rightTitle,
  children,
  xs = 12,
  item = true,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Grid {...props} item={item} xs={xs}>
      <Paper
        elevation={0}
        className={clsx(
          classes.root,
          invert ? classes.invert : classes.regular
        )}
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
        {children}
      </Paper>
    </Grid>
  )
}

export default PanelItem
