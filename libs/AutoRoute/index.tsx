import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainTemplate from 'modules/components/templates/MainTemplate'
import { useModuleStores } from 'modules/stores/use-module-stores'
import { IHeaderButtons } from 'modules/components/molecules/Header'

type TAutoRouteItem = {
  path: string
  label: string
  icon: string
  page: any
  exact?: boolean
}

type TAutoRouteGroup = {
  label: string
  routes: TAutoRouteItem[]
}

interface IAutoRoute {
  routes?: TAutoRouteGroup[]
  featureRoutes?: TAutoRouteItem[]
  headerButtons?: IHeaderButtons[]
  onExitClick?: () => void
}

const AutoRoute: React.FC<IAutoRoute> = ({
  routes,
  featureRoutes,
  headerButtons,
  onExitClick
}) => {
  const { appStore, userStore } = useModuleStores()
  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainTemplate
            menuBusy={false}
            onExitClick={onExitClick ? onExitClick : () => userStore.logout()}
            config={appStore.config}
            featureRoutes={featureRoutes}
            routes={routes}
            user={userStore.firebase.data}
            headerButtons={headerButtons}
          >
            <Switch>
              {routes?.map(group =>
                group.routes.map(({ path, page: Page, exact }) => (
                  <Route key={path} path={'/' + path} exact={exact}>
                    <Page />
                  </Route>
                ))
              )}

              {featureRoutes?.map(({ path, page: Page, exact }) => (
                <Route key={path} path={'/' + path} exact={exact}>
                  <Page />
                </Route>
              ))}

              <Route path="/">
                <div>Página não existe</div>
              </Route>
            </Switch>
          </MainTemplate>
        </Route>
      </Switch>
    </Router>
  )
}
export default AutoRoute
