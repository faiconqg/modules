import React, { FC } from 'react'
import { Button, CircularProgress, ButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { observer } from 'mobx-react-lite'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

interface IProps extends ButtonProps {
  busy?: boolean
}

const BusyButton: FC<IProps> = ({ busy, className, ...props }) => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.wrapper, className)}>
      <Button {...props} disabled={busy}></Button>
      {busy && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  )
}

export default observer(BusyButton)
