import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {}
}))

interface IImage extends React.HTMLProps<HTMLImageElement> {
  size?: any
  width?: any
  height?: any
}

const Image: React.FC<IImage> = ({
  className,
  size,
  width,
  height,
  style,
  crossOrigin,
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
      className={clsx(classes.root, className)}
    />
  )
}

export default Image
