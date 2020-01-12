import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { Portal } from '@material-ui/core'
import clsx from 'clsx'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { useHistory } from 'react-router-dom'

const lightColor = 'rgba(255, 255, 255, 0.7)'

const useStyles = makeStyles(theme => ({
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 1)
    }
  },
  feature: {
    marginTop: -360
  },
  background: {
    height: 360,
    width: '100%',
    backgroundColor: theme.palette.primary.main
  },
  secondaryBar: {
    zIndex: 0,
    paddingBottom: theme.spacing(2)
  },
  button: {
    borderColor: lightColor
  },
  center: {
    maxWidth: 936,
    margin: 'auto'
  }
}))

export interface IButtons {
  label: string
  action: () => void
  icon?: any
}

export interface ISimplePageProps {
  overrideMain?: React.ReactNode
  buttons?: IButtons[]
  feature?: boolean
  header: string
  center?: boolean
}

const SimplePage: React.FC<ISimplePageProps> = ({
  header,
  children,
  buttons,
  feature,
  overrideMain,
  center
}) => {
  const classes = useStyles({})
  const [mainHeader, setMainHeader] = useState()
  const history = useHistory()

  const splitedLocation = history.location.pathname.split('/')
  const showBack =
    history.length > 2 &&
    splitedLocation.length > 2 &&
    splitedLocation[2].length > 0

  useEffect(() => {
    setMainHeader(document.getElementById('main-header'))
  }, [mainHeader])

  return (
    <React.Fragment>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Portal container={mainHeader}>{header}</Portal>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            {showBack && (
              <IconButton color="inherit" onClick={() => history.goBack()}>
                <ArrowBack />
              </IconButton>
            )}
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {header}
              </Typography>
            </Grid>
            {buttons
              ? buttons.map(button => {
                  if (button.icon) {
                    return (
                      <Grid item key={button.label}>
                        <Tooltip title={button.label} onClick={button.action}>
                          <IconButton color="inherit">{button.icon}</IconButton>
                        </Tooltip>
                      </Grid>
                    )
                  } else {
                    return (
                      <Grid item key={button.label}>
                        <Button
                          className={classes.button}
                          variant="outlined"
                          color="inherit"
                          size="small"
                          onClick={button.action}
                        >
                          {button.label}
                        </Button>
                      </Grid>
                    )
                  }
                })
              : null}
          </Grid>
        </Toolbar>
      </AppBar>
      {feature && <div className={classes.background} />}
      {overrideMain ? (
        overrideMain
      ) : (
        <main className={clsx(classes.main, feature && classes.feature)}>
          {center ? <div className={classes.center}>{children}</div> : children}
        </main>
      )}
    </React.Fragment>
  )
}

export default SimplePage
