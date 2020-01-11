import React from 'react'
import { Menu, MenuProps, IconButton, makeStyles } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles(theme => ({
  iconButton: {
    margin: -theme.spacing(1)
  }
}))

interface ISimpleMenu extends Omit<MenuProps, 'open'> {
  equalize?: boolean
}

const SimpleMenu: React.FC<ISimpleMenu> = ({ equalize = true, ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const classes = useStyles()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        className={equalize ? classes.iconButton : undefined}
        aria-label="more"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        {...props}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      />
    </>
  )
}

export default SimpleMenu
