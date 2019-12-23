import React from 'react'
import { observer } from 'mobx-react-lite'
import MobxReactForm from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import Error from '@material-ui/icons/Error'
import cs from 'classnames'

validatorjs.useLang('pt_BR')

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%' // Fix IE 11 issue.
  },
  iconError: {
    color: theme.palette.error.main,
    marginRight: 2
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  }
}))

const Main = ({ fields, onSubmit, onError, render, error, className }) => {
  const classes = useStyles()

  return (
    <form className={cs(classes.form, className)} noValidate>
      {error && (
        <div className={classes.error}>
          <Error className={classes.iconError} />
          {error}
        </div>
      )}
      <Form
        onSubmit={onSubmit}
        onError={onError}
        fields={fields}
        render={render}
      ></Form>
    </form>
  )
}

Main.propTypes = {
  className: PropTypes.string,
  fields: PropTypes.array,
  onSubmit: PropTypes.func,
  onError: PropTypes.func,
  render: PropTypes.func,
  error: PropTypes.string
}

export default Main

const Form = React.memo(
  ({ fields, onSubmit, onError, render }) => {
    const hooks = {
      onSuccess(form) {
        if (onSubmit) {
          onSubmit(form.values())
        }
      },
      onError(form) {
        if (onError) {
          onError(form.errors())
        }
      }
    }
    const plugins = {
      dvr: dvr(validatorjs)
    }
    const form = new MobxReactForm({ fields }, { plugins, hooks })

    const Fields = render && observer(() => render(form))
    return <Fields />
  },
  // Não remonta o Form nunca, tornar função inteligente quando necessário
  (prevProps, nextProps) => true
)
