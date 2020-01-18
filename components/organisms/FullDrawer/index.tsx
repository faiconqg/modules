import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DrawerProps, Drawer, Typography, IconButton } from '@material-ui/core'
import Div from 'modules/components/molecules/Div'
import Close from '@material-ui/icons/Close'
// import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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

interface IFullDrawer extends Omit<DrawerProps, 'onClose'> {
  title: string
  onClose?: (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown' | 'closeButton'
  ) => void
}

const FullDrawer: React.FC<IFullDrawer> = ({
  children,
  title,
  onClose,
  anchor = 'right',
  ...props
}) => {
  const classes = useStyles({})

  return (
    <Drawer
      {...props}
      anchor={anchor}
      classes={{ paper: classes.root }}
      onClose={onClose}
    >
      <Div flex fullWidth fullHeight>
        <Div full className={classes.overflow}>
          <Div className={classes.titleContainer} flex alignItems="center">
            <IconButton
              onClick={event => onClose && onClose(event, 'closeButton')}
            >
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
