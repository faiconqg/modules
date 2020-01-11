import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import Person from '@material-ui/icons/Person'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  ListItemText,
  Typography
} from '@material-ui/core'

const lightColor = 'rgba(255, 255, 255, 0.7)'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: -theme.spacing(1)
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  list: {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  menuItem: {
    height: 'unset'
  },
  hidden: {
    opacity: 0
  },
  header: {
    fontWeight: 400,
    transition: theme.transitions.create('opacity')
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main
  }
}))

export interface IHeaderButtons {
  label: string
  action: () => void
  icon?: any
}

interface IProps {
  onExitClick: () => void
  onDrawerToggle: () => void
  headerButtons?: IHeaderButtons[]
  user: any
}

const Header: React.FC<IProps> = ({
  onDrawerToggle,
  headerButtons,
  onExitClick,
  user
}) => {
  const classes = useStyles({})
  const [anchorEl, setAnchorEl] = useState()
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const result = window.scrollY > 30
      if (result !== showHeader) {
        setShowHeader(result)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={showHeader ? 2 : 0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs>
              <Typography
                id="main-header"
                className={clsx(classes.header, !showHeader && classes.hidden)}
                color="inherit"
                variant="subtitle1"
              ></Typography>
            </Grid>
            {headerButtons
              ? headerButtons.map(headerButton => {
                  if (headerButton.icon) {
                    return (
                      <Grid item key={headerButton.label}>
                        <Tooltip
                          title={headerButton.label}
                          onClick={headerButton.action}
                        >
                          <IconButton color="inherit">
                            {headerButton.icon}
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    )
                  } else {
                    return (
                      <Grid item key={headerButton.label}>
                        <Link
                          className={classes.link}
                          onClick={headerButton.action}
                          variant="body2"
                        >
                          {headerButton.label}
                        </Link>
                      </Grid>
                    )
                  }
                })
              : null}
            <Grid item>
              <IconButton
                color="primary"
                className={classes.iconButtonAvatar}
                onClick={e => setAnchorEl(e.currentTarget)}
              >
                <Avatar
                  className={classes.avatar}
                  src={user.photoURL}
                  alt={user.displayName}
                >
                  {user.displayName && String(user.displayName).charAt(0)}
                </Avatar>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Menu
        classes={{ list: classes.list }}
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem className={classes.menuItem}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText secondary={user.email}>{user.displayName}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem className={classes.menuItem} onClick={() => onExitClick()}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText>Sair</ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default Header
