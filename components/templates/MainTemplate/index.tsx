import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Navigator from './../../organisms/Navigator'
import Header, { IHeaderButtons } from './../../molecules/Header'
import Footer from './../../molecules/Footer'
import { observable, toJS } from 'mobx'
import JSONTree from 'react-json-tree'
import { useModuleStores } from 'modules/stores/use-module-stores'
import { observer } from 'mobx-react-lite'

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
  const { appStore } = useModuleStores()

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
      {appStore.debugJSON && (
        <Hidden lgDown implementation="js">
          <div
            style={{
              overflowY: 'auto',
              position: 'fixed',
              top: 98,
              width: 400,
              bottom: 0,
              right: 0,
              backgroundColor: 'rgb(0, 43, 54)'
            }}
          >
            <JSONTree
              hideRoot
              data={toJS(appStore.debugJSON)}
              shouldExpandNode={(keyName, data, level) =>
                level < 5 && Object.keys(data).length < 10
              }
            />
          </div>
        </Hidden>
      )}
    </div>
  )
}

export default observer(Main)
