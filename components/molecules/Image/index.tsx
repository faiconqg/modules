import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: { flexShrink: 0 },
  round: {
    borderRadius: 8
  },
  cover: {
    objectFit: 'cover'
  }
}))

interface IImage extends React.HTMLProps<HTMLImageElement> {
  size?: any
  width?: any
  height?: any
  round?: boolean
  cover?: boolean
}

const Image: React.FC<IImage> = ({
  className,
  size,
  width,
  height,
  style,
  crossOrigin,
  round,
  cover,
  alt,
  ...props
}) => {
  const classes = useStyles()

  return (
    <img
      {...props}
      style={Object.assign(
        size || width || height
          ? { width: width || size, height: height || size }
          : {},
        style
      )}
      alt={alt || ''}
      className={clsx(
        classes.root,
        round && classes.round,
        cover && classes.cover,
        className
      )}
    />
  )
}

export default Image
