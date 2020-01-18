import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { List } from '@material-ui/core'
import {
  IGenericContainer,
  useGenericContainerClasses
} from 'modules/components/molecules/Div'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: theme.shadows[1]
  },
  table: {
    borderTop: 1,
    backgroundColor: theme.palette.grey[50]
  }
}))

const ButtonList: React.FC<IGenericContainer> = ({ children, ...props }) => {
  const [classNames, rest] = useGenericContainerClasses(props)
  const classes = useStyles({})

  return (
    <List {...rest} className={classes.root + classNames} disablePadding>
      {children}
    </List>
  )
}

export default ButtonList
