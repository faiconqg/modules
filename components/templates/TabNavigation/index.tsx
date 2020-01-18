import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { makeStyles } from '@material-ui/core/styles'
import SimplePage, { ISimplePageProps } from '../SimplePage'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 1)
    }
  },
  secondaryBar: {
    zIndex: 0
  },
  feature: {
    marginTop: -360
  },
  center: {
    boxSizing: 'content-box',
    maxWidth: 936,
    margin: 'auto'
  }
}))

interface IProps extends ISimplePageProps {}

const TabNavigation: React.FC<IProps> = ({
  children,
  center,
  feature,
  ...props
}) => {
  const classes = useStyles({})
  const [value, setValue] = useState(0)

  return (
    <SimplePage
      {...props}
      feature={feature}
      overrideMain={
        <div className={clsx(classes.root, feature && classes.feature)}>
          <AppBar
            component="div"
            className={classes.secondaryBar}
            color="primary"
            position="static"
            elevation={0}
          >
            <Tabs
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
              variant="scrollable"
              scrollButtons="off"
              textColor="inherit"
            >
              {React.Children.map(children, (tabItem: any) => (
                <Tab
                  key={tabItem?.props.title}
                  textColor="inherit"
                  label={tabItem?.props.title}
                />
              ))}
            </Tabs>
          </AppBar>
          <main className={classes.main}>
            {center ? (
              <div className={classes.center}>
                {React.Children.map(children, (tabItem, index) =>
                  value === index ? tabItem : null
                )}
              </div>
            ) : (
              React.Children.map(children, (tabItem, index) =>
                value === index ? tabItem : null
              )
            )}
          </main>
        </div>
      }
    ></SimplePage>
  )
}

export default TabNavigation
