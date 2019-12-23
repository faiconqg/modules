import React from 'react'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useModuleStores } from 'modules/stores/use-module-stores'

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

const Footer: React.FC = () => {
  const classes = useStyles()
  const { appStore } = useModuleStores()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="xs">
        <Typography variant="body1">
          {appStore.config
            ? appStore.config.footerMessage
            : 'Todos os direitos reservados'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {'Copyright © '}
          <Link
            color="inherit"
            href={appStore.config ? appStore.config.companyUrl : ''}
            target="_blank"
          >
            {appStore.config ? appStore.config.companyName : ''}
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
