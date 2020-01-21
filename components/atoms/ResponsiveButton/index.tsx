import React from 'react'
import { Button, IconButton, Hidden, IconButtonProps } from '@material-ui/core'
import { observer } from 'mobx-react-lite'

interface IProps extends IconButtonProps {
  label: string
  icon: any
}

const ResponsiveButton: React.FC<IProps> = ({ label, icon, ...props }) => {
  const Icon = icon

  return (
    <>
      <Hidden smUp>
        <IconButton {...props}>
          <Icon color="inherit" />
        </IconButton>
      </Hidden>
      <Hidden xsDown>
        <Button variant="contained" {...props}>
          {label}
        </Button>
      </Hidden>
    </>
  )
}

export default observer(ResponsiveButton)
