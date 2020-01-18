import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Navigator from './../../organisms/Navigator'
import Header, { IHeaderButtons } from './../../molecules/Header'
import Footer from './../../molecules/Footer'
import { observable } from 'mobx'

declare global {
  interface Window {
    drawerWidth?: number
  }
}

window.drawerWidth = 256

export let headerBackground = observable.box()

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: window.drawerWidth,
      flexShrink: 0
    }
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
}))

interface IMain {
  onExitClick: () => void
  config: any
  routes: any
  featureRoutes: any
  headerButtons?: IHeaderButtons[]
  user: any
  menuBusy: boolean
  children: React.ReactNode
}

const Main: React.FC<IMain> = ({
  config,
  routes,
  featureRoutes,
  headerButtons,
  children,
  user,
  onExitClick,
  menuBusy
}) => {
  const classes = useStyles({})
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <div className={classes.root}>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="js">
          <Navigator
            onItemClick={handleDrawerToggle}
            config={config}
            menuBusy={menuBusy}
            routes={routes}
            featureRoutes={featureRoutes}
            PaperProps={{ style: { width: window.drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onOpen={handleDrawerToggle}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Navigator
            config={config}
            menuBusy={menuBusy}
            routes={routes}
            featureRoutes={featureRoutes}
            PaperProps={{ style: { width: window.drawerWidth } }}
            open={true}
            onOpen={handleDrawerToggle}
            onClose={handleDrawerToggle}
          />
        </Hidden>
      </nav>
      <div className={classes.app}>
        <Header
          user={user}
          onExitClick={onExitClick}
          onDrawerToggle={handleDrawerToggle}
          headerButtons={headerButtons}
        />
        {children}
        <Footer config={config} />
      </div>
    </div>
  )
}

export default Main
