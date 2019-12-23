import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps
} from 'react-router-dom'
import Loading from 'modules/pages/Loading'
import Login from 'modules/pages/Login'
import Recover from 'modules/pages/Recover'
import { observer } from 'mobx-react-lite'
import { TConfig } from 'modules/stores/AppStore'
import { useStores } from 'modules/stores/use-stores'
import { CssBaseline, ThemeProvider, Theme } from '@material-ui/core'
import Register from '../Register'

interface IProps {
  config: TConfig
  theme: Theme
}

const App: React.FC<IProps> = ({ children, config, theme }) => {
  const { appStore, userStore } = useStores()

  useEffect(() => {
    appStore.setConfig(config)
  }, [config, appStore])

  if (!appStore.configResolved) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {appStore.initialized ? (
        <Router>
          <Switch>
            <OnlyLoggedOutRoute
              path="/login"
              logged={!!userStore.firebase.data}
            >
              <Login />
            </OnlyLoggedOutRoute>
            <OnlyLoggedOutRoute
              path="/register"
              logged={!!userStore.firebase.data}
            >
              <Register />
            </OnlyLoggedOutRoute>
            <OnlyLoggedOutRoute
              path="/recover"
              logged={!!userStore.firebase.data}
            >
              <Recover />
            </OnlyLoggedOutRoute>
            <PrivateRoute hasPermission={!!userStore.firebase.data}>
              {children}
            </PrivateRoute>
          </Switch>
        </Router>
      ) : (
        <Loading />
      )}
    </ThemeProvider>
  )
}

interface IOnlyLoggedOutRoute extends RouteProps {
  logged: boolean
}

const OnlyLoggedOutRoute: React.FC<IOnlyLoggedOutRoute> = ({
  logged,
  children,
  ...props
}) => (
  <Route
    {...props}
    render={() =>
      logged ? (
        <Redirect to={props.location?.state?.from?.pathname || '/'} />
      ) : (
        children
      )
    }
  />
)

interface IPrivateRouteProps {
  hasPermission: boolean
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  hasPermission,
  children
}) => (
  <Route
    render={({ location }) =>
      hasPermission ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location }
          }}
        />
      )
    }
  />
)

export default observer(App)
