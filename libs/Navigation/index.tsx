import React, { useEffect } from 'react'
import {
  Route,
  useRouteMatch,
  Switch,
  useParams,
  LinkProps,
  Link,
  useLocation
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none'
  }
}))

interface iRoute {
  path: string
  component: React.FC<any>
}

interface INavigation {
  routes: iRoute[]
}

const Navigation: React.FC<INavigation> = ({ routes }) => {
  const match = useRouteMatch()
  const { id } = useParams()

  return (
    <Switch>
      {routes.map(({ path, component: Comp }) => (
        <Route key={path} path={match.path + path}>
          <Comp id={id} />
        </Route>
      ))}
    </Switch>
  )
}

export default Navigation

interface ISimpleNavigation {
  form: React.FC<{ id: number }>
  list: React.FC
}

export const SimpleNavigation: React.FC<ISimpleNavigation> = ({
  form,
  list
}) => {
  return (
    <Navigation
      routes={[
        { path: '/add', component: form },
        { path: '/:id', component: form },
        { path: '/', component: list }
      ]}
    />
  )
}

export const Lk: React.FC<LinkProps> = ({ to, ...props }) => {
  const match = useRouteMatch()
  const classes = useStyles()

  return <Link to={match.path + to} {...props} className={classes.link} />
}

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
