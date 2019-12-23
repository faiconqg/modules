import React, { FC } from 'react'
import {
  CircularProgress,
  makeStyles,
  Container,
  Typography
} from '@material-ui/core'
import { useModuleStores } from 'modules/stores/use-module-stores'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const Loading: FC = () => {
  const { appStore } = useModuleStores()
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <CircularProgress />
      <br />
      <Typography variant="subtitle1">{appStore.config?.appName}</Typography>
    </Container>
  )
}

export default Loading
