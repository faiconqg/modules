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
    textDecoration: 'none',
    outline: 0,
    WebkitTapHighlightColor: 'transparent'
    // '&:hover,&.selected,&.active': {
    //   outline: 0
    // }
  }
}))

interface IRoute {
  path: string
  component: React.FC<any>
}

interface INavigation {
  routes: IRoute[]
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

interface ILk extends LinkProps {
  params?: any
}

export const Lk: React.FC<ILk> = ({ to, params, ...props }) => {
  const match = useRouteMatch()
  const classes = useStyles()

  let queryString = ''
  if (params) {
    const query = new URLSearchParams()
    Object.keys(params).forEach((key: any) => query.append(key, params[key]))
    queryString = '?' + query.toString()
  }

  return (
    <Link
      to={match.path + to + queryString}
      {...props}
      className={classes.link}
    />
  )
}

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export const useQuery = () => {
  const query = new URLSearchParams(useLocation().search)
  return Array.from(query.entries()).reduce(
    (acc: any, entry: any) => Object.assign(acc, { [entry[0]]: entry[1] }),
    {}
  )
}
