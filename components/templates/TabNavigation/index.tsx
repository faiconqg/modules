import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import SimplePage, { ISimplePageProps } from '../SimplePage'
import clsx from 'clsx'
import SwipeableViews from 'react-swipeable-views'
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100vw - ${window.drawerWidth || 0}px)`
    }
  },
  tab: {
    flex: 1,
    overflowY: 'scroll',
    padding: theme.spacing(6, 4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 2)
    }
  },
  secondaryBar: {
    zIndex: 0
  }
}))

interface IProps extends ISimplePageProps {}

const TabNavigation: React.FC<IProps> = ({ children, ...props }) => {
  const classes = useStyles({})
  const [value, setValue] = useState(0)
  const [moving, setMoving] = useState()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <SimplePage
      {...props}
      className={classes.root}
      disablePadding
      subHeader={
        !props.busy ? (
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
              {React.Children.map(children, (tabItem: any, index: number) => (
                <Tab
                  key={tabItem?.props.title}
                  textColor="inherit"
                  label={tabItem?.props.title}
                />
              ))}
            </Tabs>
          </AppBar>
        ) : (
          undefined
        )
      }
    >
      {children && (
        <SwipeableViews
          ignoreNativeScroll
          // animateHeight
          animateTransitions={matches}
          resistance
          index={value}
          style={{ height: '100%' }}
          onSwitching={m => {
            if (!moving) {
              setMoving(true)
            }
          }}
          onTransitionEnd={() => setMoving(null)}
          onChangeIndex={(index: number) => setValue(index)}
        >
          {React.Children.map(children, (tabItem, index) => (
            <div className={clsx(classes.tab)} key={index}>
              {value === index || moving ? tabItem : undefined}
            </div>
          ))}
        </SwipeableViews>
      )}
    </SimplePage>
  )
}

export default TabNavigation
