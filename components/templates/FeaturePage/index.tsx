import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, emphasize } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { Portal, Hidden } from '@material-ui/core'
import clsx from 'clsx'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { useHistory } from 'react-router-dom'
import Div from 'modules/components/molecules/Div'
import { IButtons } from '../SimplePage'
import { headerBackground } from '../MainTemplate'
import { action as mobxAction } from 'mobx'

const lightColor = 'rgba(255, 255, 255, 0.7)'

const useStyles = makeStyles(theme => ({
  main: {
    flex: 1
  },
  background: {
    height: 356,
    [theme.breakpoints.down('md')]: {
      height: 304
    },
    width: '100%'
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(2)
  },
  secondaryBar: {
    zIndex: 0
  },
  button: {
    borderColor: lightColor
  },
  buttonWhite: {
    backgroundColor: theme.palette.common.white
  },
  center: {
    boxSizing: 'content-box',
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 2)
    },
    maxWidth: 936,
    margin: 'auto'
  },
  featureContainer: {
    color: theme.palette.common.white,
    padding: theme.spacing(3, 0),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0, 5)
    }
  },
  featureText: {
    maxWidth: 380,
    maxHeight: 280,
    overflow: 'auto'
  },
  imageContainer: {
    // imagem de 1000 x 1000 com 100px de sangria no topo
    [theme.breakpoints.up('xl')]: {
      marginTop: -165.2,
      marginRight: -165.2,
      width: 542.4
    },
    zIndex: 1101,
    marginTop: -120,
    width: 452
  },
  // 492, 96
  image: {
    [theme.breakpoints.up('xl')]: {
      width: 542.4,
      height: 542.4
    },
    width: 452,
    height: 452
  }
}))

export interface IFeaturePage {
  buttons?: IButtons[]
  header: string
  title: string
  description: string
  image?: string
  color: string
  action: () => void
  buttonLabel: string
  center?: boolean
}

const FeaturePage: React.FC<IFeaturePage> = ({
  header,
  title,
  children,
  buttons,
  description,
  image,
  buttonLabel,
  action,
  color
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

  const backgroundColor = `linear-gradient(to right, ${color}, ${emphasize(
    color,
    0.25
  )})`

  useEffect(
    mobxAction(() => {
      headerBackground.set(backgroundColor)
      return mobxAction(() => headerBackground.set(undefined))
    }),
    [backgroundColor, mainHeader]
  )

  return (
    <>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Portal container={mainHeader}>{header}</Portal>
        <Toolbar style={{ background: backgroundColor }}>
          <Grid container alignItems="center" spacing={1}>
            {showBack && (
              <IconButton color="inherit" onClick={() => history.goBack()}>
                <ArrowBack />
              </IconButton>
            )}
            <Grid item xs />
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
      <main className={classes.main}>
        <div
          className={classes.background}
          style={{ background: backgroundColor }}
        >
          <Div className={clsx(classes.center, classes.featureContainer)} flex>
            <Div className={classes.featureText}>
              <Typography
                color="inherit"
                variant="h4"
                className={classes.title}
              >
                {title}
              </Typography>
              <Typography color="inherit" variant="h6">
                {description}
              </Typography>
              <Div style={{ color }} paddingTop="spacing4">
                <Button
                  className={classes.buttonWhite}
                  onClick={action}
                  variant="contained"
                  color="inherit"
                >
                  {buttonLabel}
                </Button>
              </Div>
            </Div>
            <Div full />
            {image && (
              <Hidden mdDown>
                <div className={classes.imageContainer}>
                  <img src={image} alt={title} className={classes.image} />
                </div>
              </Hidden>
            )}
          </Div>
        </div>
        <div className={classes.center}>{children}</div>
      </main>
    </>
  )
}

export default FeaturePage
