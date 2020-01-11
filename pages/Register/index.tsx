import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'modules/libs/Form'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Avatar, TextField, Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useModuleStores } from 'modules/stores/use-module-stores'
import { observer } from 'mobx-react-lite'
import BusyButton from 'modules/components/atoms/BusyButton'
import LoginFooter from 'modules/components/molecules/LoginFooter'

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
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
}))

const Register: React.FC = () => {
  const classes = useStyles()
  const { appStore, userStore } = useModuleStores()

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
                name: 'firstName',
                label: 'Nome',
                placeholder: 'Digite seu nome',
                rules: 'required|string|between:2,25'
              },
              {
                name: 'lastName',
                label: 'Sobrenome',
                placeholder: 'Digite seu sobrenome',
                rules: 'required|string|between:2,25'
              },
              {
                name: 'email',
                label: 'Email',
                placeholder: 'Digite seu Email',
                rules: 'required|email|string|between:5,25'
              },
              {
                name: 'password',
                label: 'Senha',
                placeholder: 'Digite sua senha',
                rules: 'required|string|between:5,25'
              },
              {
                name: 'passwordConfirm',
                label: 'Confirmação',
                placeholder: 'Confirme sua senha',
                rules: 'required|string|same:password'
              }
            ]}
            render={form => (
              <>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...form.$('firstName').bind()}
                      error={!!form.$('firstName').error}
                      helperText={form.$('firstName').error}
                      autoComplete="fname"
                      variant="outlined"
                      required
                      fullWidth
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...form.$('lastName').bind()}
                      error={!!form.$('lastName').error}
                      helperText={form.$('lastName').error}
                      variant="outlined"
                      required
                      fullWidth
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...form.$('email').bind()}
                      error={!!form.$('email').error}
                      helperText={form.$('email').error}
                      variant="outlined"
                      required
                      fullWidth
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...form.$('password').bind()}
                      error={!!form.$('password').error}
                      helperText={form.$('password').error}
                      variant="outlined"
                      required
                      fullWidth
                      type="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...form.$('passwordConfirm').bind()}
                      error={!!form.$('passwordConfirm').error}
                      helperText={form.$('passwordConfirm').error}
                      variant="outlined"
                      required
                      fullWidth
                      type="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>

                <BusyButton
                  busy={userStore.firebase.busy}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={form.onSubmit}
                  className={classes.submit}
                >
                  Continuar
                </BusyButton>
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
                .createUser(
                  values.email,
                  values.password,
                  `${values.firstName} ${values.lastName}`
                )
                .catch(e => console.log(e))
            }
          />
        </div>
      </Container>
      <LoginFooter />
    </div>
  )
}

export default observer(Register)
