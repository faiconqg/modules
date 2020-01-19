import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { makeStyles } from '@material-ui/core/styles'
import SimplePage, { ISimplePageProps } from '../SimplePage'
import clsx from 'clsx'
import SwipeableViews from 'react-swipeable-views'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100vw - ${window.drawerWidth || 0}px)`
    },
    flex: 1
  },
  tab: {
    overflowY: 'scroll',
    padding: theme.spacing(6, 4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 2)
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
  const [moving, setMoving] = useState()

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
          <SwipeableViews
            ignoreNativeScroll
            resistance
            index={value}
            onSwitching={m => setMoving(Math.floor(m))}
            onTransitionEnd={() => setMoving(null)}
            onChangeIndex={(index: number) => setValue(index)}
          >
            {React.Children.map(children, (tabItem, index) => (
              <main
                className={clsx(classes.tab, center && classes.center)}
                key={index}
              >
                {value === index || moving === index || moving + 1 === index
                  ? tabItem
                  : undefined}
              </main>
            ))}
          </SwipeableViews>
        </div>
      }
    ></SimplePage>
  )
}

export default TabNavigation
