import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import SwipeableDrawer, {
  SwipeableDrawerProps
} from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { NavLink } from 'react-router-dom'
import { CircularProgress, Icon, Typography } from '@material-ui/core'
import { TConfig } from 'modules/stores/AppStore'

const useStyles = makeStyles(theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  link: {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none'
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white
  },
  itemActiveItem: {
    color: theme.palette.primary.light
  },
  itemActiveItemSecondary: {
    color: theme.palette.secondary.light
  },
  itemPrimary: {
    fontSize: 'inherit'
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  logo: {
    objectFit: 'contain',
    maxWidth: (window.drawerWidth || 0) - theme.spacing(4),
    height: 36
  },
  logoContainer: {
    minWidth: 'unset'
  },
  titleContainer: {
    marginLeft: theme.spacing(2)
  },
  busyContainer: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center'
  },
  fontIcon: {
    fontSize: '1.25rem'
  },
  version: {
    fontSize: 10,
    color: theme.palette.grey[300],
    bottom: 2,
    right: 4,
    position: 'absolute',
    zIndex: 1
  }
}))

interface IProps extends SwipeableDrawerProps {
  onItemClick?: () => void
  routes: any[]
  featureRoutes?: any[]
  config: TConfig
  menuBusy: boolean
}

const Navigator: React.FC<IProps> = ({
  routes,
  featureRoutes,
  config,
  menuBusy,
  onItemClick,
  ...props
}) => {
  const classes = useStyles({})
  return (
    <SwipeableDrawer
      variant="permanent"
      {...props}
      disableDiscovery
      disableSwipeToOpen
    >
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          {config.appIcon && (
            <ListItemIcon className={classes.logoContainer}>
              <img src={config.appIcon} alt="logo" className={classes.logo} />
            </ListItemIcon>
          )}
          {config.displayAppNameInMenuHeader && (
            <ListItemText
              className={classes.titleContainer}
              primary={config.appName}
            />
          )}
          <Typography variant="caption" className={classes.version}>
            v{process.env.REACT_APP_VERSION}
          </Typography>
        </ListItem>
        {featureRoutes
          ?.filter(f => !f.bottom)
          .map(({ label, path, icon }) => (
            <NavLink
              key={label}
              to={'/' + path}
              exact={path.length === 0}
              className={classes.link}
              activeClassName={
                config.useSecondaryColorInMenu
                  ? classes.itemActiveItemSecondary
                  : classes.itemActiveItem
              }
            >
              <ListItem
                className={clsx(classes.item, classes.itemCategory)}
                button
                onClick={onItemClick}
              >
                <ListItemIcon className={classes.itemIcon}>
                  <Icon className={classes.fontIcon}>{icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary
                  }}
                >
                  {label}
                </ListItemText>
              </ListItem>
            </NavLink>
          ))}
        {menuBusy ? (
          <div className={classes.busyContainer}>
            <CircularProgress />
          </div>
        ) : (
          routes.map(({ routes: childRoutes, label }) => (
            <React.Fragment key={label}>
              <ListItem className={classes.categoryHeader}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary
                  }}
                >
                  {label}
                </ListItemText>
              </ListItem>
              {(childRoutes as any[]).map(
                ({ label: childLabel, icon, path }) => (
                  <NavLink
                    key={childLabel}
                    to={'/' + path}
                    className={classes.link}
                    activeClassName={
                      config.useSecondaryColorInMenu
                        ? classes.itemActiveItemSecondary
                        : classes.itemActiveItem
                    }
                  >
                    <ListItem
                      button
                      className={clsx(classes.item)}
                      onClick={onItemClick}
                    >
                      <ListItemIcon className={classes.itemIcon}>
                        <Icon className={classes.fontIcon}>{icon}</Icon>
                      </ListItemIcon>
                      <ListItemText
                        classes={{
                          primary: classes.itemPrimary
                        }}
                      >
                        {childLabel}
                      </ListItemText>
                    </ListItem>
                  </NavLink>
                )
              )}
              <Divider className={classes.divider} />
            </React.Fragment>
          ))
        )}
        {featureRoutes
          ?.filter(f => f.bottom)
          .map(({ label, path, icon }) => (
            <NavLink
              key={label}
              to={'/' + path}
              exact={path.length === 0}
              className={classes.link}
              activeClassName={classes.itemActiveItem}
            >
              <ListItem
                className={clsx(classes.item, classes.itemCategory)}
                button
                onClick={onItemClick}
              >
                <ListItemIcon className={classes.itemIcon}>
                  <Icon className={classes.fontIcon}>{icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary
                  }}
                >
                  {label}
                </ListItemText>
              </ListItem>
            </NavLink>
          ))}
      </List>
    </SwipeableDrawer>
  )
}

export default Navigator
