import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DrawerProps, Drawer, Typography, IconButton } from '@material-ui/core'
import Div from 'modules/components/molecules/Div'
import Close from '@material-ui/icons/Close'
// import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 1600,
    backgroundColor: theme.palette.background.default
  },
  titleContainer: {
    padding: theme.spacing(8, 16),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4, 3)
    }
  },
  title: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(1)
    }
  },
  childrenContainer: {
    overflowX: 'hidden',
    width: '100%',
    maxWidth: 960,
    paddingLeft: theme.spacing(20),
    paddingBottom: theme.spacing(20),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(4),
      paddingRight: theme.spacing(1)
    }
  },
  sideBar: {
    backgroundColor: theme.palette.primary.dark,
    width: 320,
    [theme.breakpoints.down('md')]: {
      width: 120
    },
    [theme.breakpoints.down('sm')]: {
      width: 0
    }
  },
  overflow: {
    overflowY: 'auto'
  }
}))

let withHash = false

interface IFullDrawer extends Omit<DrawerProps, 'onClose'> {
  title: string
  onClose?: (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown' | 'closeButton' | 'backClick'
  ) => void
}

const close = (event: any, reason: any, callback: any) => {
  withHash = false
  if (reason !== 'backClick') {
    window.history.back()
  }
  callback && callback(event, reason)
}

const FullDrawer: React.FC<IFullDrawer> = ({
  children,
  title,
  open,
  onClose,
  anchor = 'right',
  ...props
}) => {
  const classes = useStyles({})

  useEffect(() => {
    window.onpopstate = (e: any) => {
      close(e, 'backClick', onClose)
    }
    return () => {
      window.onpopstate = null
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (open && !withHash) {
      window.history.pushState({ fullDrawer: true }, '')
      withHash = true
    }
    return () => {
      withHash = false
    }
  }, [open])

  return (
    <Drawer
      {...props}
      open={open}
      anchor={anchor}
      classes={{ paper: classes.root }}
      onClose={(event, reason) => close(event, reason, onClose)}
    >
      <Div flex fullWidth fullHeight>
        <Div full className={classes.overflow}>
          <Div className={classes.titleContainer} flex alignItems="center">
            <IconButton onClick={event => close(event, 'closeButton', onClose)}>
              <Close />
            </IconButton>
            <Typography className={classes.title} variant="h5">
              {title}
            </Typography>
          </Div>
          <Div className={classes.childrenContainer}>{children}</Div>
        </Div>
        <Div className={classes.sideBar} />
      </Div>
    </Drawer>
  )
}

export default FullDrawer
