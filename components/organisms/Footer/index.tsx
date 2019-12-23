import React, { FC } from 'react'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { observer } from 'mobx-react-lite'
import { useStores } from 'modules/stores/use-stores'

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  }
}))

const Footer: FC = () => {
  const classes = useStyles()
  const { appStore } = useStores()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="xs">
        <Typography variant="body1">
          {appStore.config?.footerMessage || 'Todos os direitos reservados'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {'Copyright © '}
          <Link
            color="inherit"
            href={appStore.config?.companyUrl}
            target="_blank"
          >
            {appStore.config?.companyName}
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </footer>
  )
}

export default observer(Footer)
