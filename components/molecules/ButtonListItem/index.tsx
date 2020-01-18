import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import Avatar, { IAvatar } from '../Avatar'

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    '&:first-child': {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
    },
    '&:last-child': {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8
    }
  },
  divider: {
    '&:last-child': {
      borderBottom: 'unset',
      backgroundClip: 'unset'
    }
  },
  listItemAvatar: {
    marginRight: theme.spacing(1)
  }
}))

interface IButtonListItem extends IAvatar {
  primary: string
  secondary?: string
}

const ButtonListItem: React.FC<IButtonListItem> = ({
  primary,
  secondary,
  size = 48,
  children,
  ...props
}) => {
  const classes = useStyles({})

  return (
    <ListItem
      button
      divider
      className={classes.root}
      classes={{ divider: classes.divider }}
    >
      <ListItemAvatar className={classes.listItemAvatar}>
        <Avatar {...props} size={size} />
      </ListItemAvatar>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  )
}

export default ButtonListItem
