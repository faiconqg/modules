import React, { FC } from 'react'
import {
  CircularProgress,
  makeStyles,
  Container,
  Typography
} from '@material-ui/core'
import { useStores } from 'modules/stores/use-stores'

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
  const { appStore } = useStores()
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
