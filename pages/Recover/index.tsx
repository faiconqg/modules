import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'modules/libs/Form'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Avatar, TextField, Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useStores } from 'modules/stores/use-stores'
import { observer } from 'mobx-react-lite'
import BusyButton from 'modules/components/molecules/BusyButton'
import Footer from 'modules/components/organisms/Footer'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  },
  form: {
    marginTop: theme.spacing(6)
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  successMessage: {
    marginBottom: theme.spacing(2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
}))

const Recover: React.FC = () => {
  const classes = useStyles()
  const { appStore, userStore } = useStores()
  const [emailFeedback, setEmailFeedback] = useState(false)

  return (
    <div className={classes.root}>
      <Container component="main" className={classes.main} maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {appStore.config?.appName}
          </Typography>
          <Form
            error={userStore.firebase.error?.message}
            className={classes.form}
            fields={[
              {
                name: 'email',
                label: 'Email',
                placeholder: 'Digite seu Email',
                rules: 'required|email|string|between:5,25'
              }
            ]}
            render={form => (
              <>
                {emailFeedback ? (
                  <>
                    <Typography variant="h5" component="h2" gutterBottom>
                      E-mail de recuperação enviado.
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.successMessage}
                    >
                      Siga as instruções do e-mail para criar uma nova senha e
                      tente fazer o login novamente.
                    </Typography>
                  </>
                ) : (
                  <>
                    <TextField
                      {...form.$('email').bind()}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      autoComplete="email"
                      autoFocus
                      error={!!form.$('email').error}
                      helperText={form.$('email').error}
                    />
                    <BusyButton
                      busy={userStore.firebase.busy}
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={form.onSubmit}
                      className={classes.submit}
                    >
                      Recuperar acesso
                    </BusyButton>
                  </>
                )}
                <Grid container>
                  <Grid item xs>
                    <Link to="login" className={classes.link}>
                      Voltar para o login
                    </Link>
                  </Grid>
                </Grid>
              </>
            )}
            onSubmit={values =>
              userStore
                .recover(values.email)
                .then(a => setEmailFeedback(true))
                .catch(e => console.log(e))
            }
          />
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default observer(Recover)
