import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Dialog } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import Image, { IImage } from '../Image'
import Div from '../Div'

const useStyles = makeStyles(theme => ({
  img: {
    cursor: 'pointer'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  paper: {
    boxShadow: 'none',
    maxWidth: 'calc(100% - 32px)',
    background: 'transparent',
    margin: theme.spacing(2)
  },
  bigImage: {
    width: '100%',
    minWidth: 260,
    objectFit: 'scale-down',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1]
  }
}))

export interface IOpenableImage extends IImage {
  toolbar?: React.ReactNode
  openProps?: IImage
  onOpen?: () => void
  onClose?: () => void
}

const OpenableImage: React.FC<IOpenableImage> = ({
  toolbar,
  onOpen,
  onClose,
  openProps,
  ...props
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Image
        {...props}
        onClick={() => {
          setOpen(true)
          !!onOpen && onOpen()
        }}
        className={classes.img}
      />
      <Dialog
        open={open}
        maxWidth={false}
        classes={{ paper: classes.paper }}
        scroll="body"
      >
        <div className={classes.toolbar}>
          {toolbar}
          <Div flex full />
          <IconButton
            color="inherit"
            onClick={() => {
              setOpen(false)
              !!onClose && onClose()
            }}
          >
            <Close />
          </IconButton>
        </div>
        <Image
          {...openProps}
          bucket={props.bucket}
          src={props.src}
          round
          className={classes.bigImage}
        />
      </Dialog>
    </>
  )
}

export default OpenableImage
