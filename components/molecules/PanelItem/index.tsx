import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid, GridProps, Button } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.5, 1),
    position: 'relative'
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
    paddingBottom: theme.spacing(1),
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontSize: 13,
    paddingLeft: theme.spacing(0.5),
    lineHeight: 'unset',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
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
  },
  button: {
    position: 'absolute',
    width: '100%',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
}))

interface IPanelItem extends Omit<GridProps, 'onClick'> {
  icon?: any
  title?: string
  rightTitle?: string
  invert?: boolean
  right?: any
  left?: any
  onClick?: () => void
}

const PanelItem: React.FC<IPanelItem> = ({
  icon,
  title,
  invert,
  left,
  right,
  rightTitle,
  children,
  onClick,
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
        {!!onClick && (
          <Button className={classes.button} onClick={onClick}>
            {' '}
          </Button>
        )}
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
                <Typography variant="caption">{rightTitle}</Typography>
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
