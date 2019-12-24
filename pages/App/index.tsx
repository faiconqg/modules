import React, { useEffect, useState } from 'react'
import * as serviceWorker from 'serviceWorker'
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
import { useModuleStores } from 'modules/stores/use-module-stores'
import {
  CssBaseline,
  ThemeProvider,
  Theme,
  Snackbar,
  Button
} from '@material-ui/core'
import Register from '../Register'
import InfoIcon from '@material-ui/icons/Info'

interface IProps {
  config: TConfig
  theme: Theme
  allowNewUsers: boolean
}

const App: React.FC<IProps> = ({ children, config, theme }) => {
  const { appStore, userStore } = useModuleStores()

  useEffect(() => {
    appStore.setConfig(config)
  }, [config, appStore])

  if (!appStore.configResolved) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UpdateController />
      {appStore.initialized ? (
        <Router>
          <Switch>
            <OnlyLoggedOutRoute
              path="/login"
              logged={!!userStore.firebase.data}
            >
              <Login />
            </OnlyLoggedOutRoute>
            {appStore.config?.allowNewUsers && (
              <OnlyLoggedOutRoute
                path="/register"
                logged={!!userStore.firebase.data}
              >
                <Register />
              </OnlyLoggedOutRoute>
            )}
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

const UpdateController: React.FC = () => {
  const [worker, setWorker] = useState()

  useEffect(() => {
    serviceWorker.register({
      onUpdate: registration => {
        navigator.serviceWorker.addEventListener('controllerchange', event => {
          window.location.reload()
        })
        setWorker(registration.waiting)
      }
    })
  }, [])

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={!!worker}
      message={
        <span
          id="message-id"
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <InfoIcon style={{ marginRight: 10 }} /> Atualização disponível
        </span>
      }
      action={
        <Button
          color="primary"
          size="small"
          onClick={() =>
            worker
              ? worker.postMessage({ type: 'SKIP_WAITING' })
              : window.location.reload()
          }
        >
          Atualizar Agora
        </Button>
      }
    />
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
