import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import 'firebase/storage'
import { useModuleStores } from 'modules/stores/use-module-stores'

const useStyles = makeStyles(theme => ({
  root: { flexShrink: 0 },
  round: {
    borderRadius: 8
  },
  cover: {
    objectFit: 'cover'
  }
}))

export interface IImage extends React.HTMLProps<HTMLImageElement> {
  size?: any
  width?: any
  height?: any
  round?: boolean
  cover?: boolean
  bucket?: string
}

const Image: React.FC<IImage> = ({
  className,
  src,
  bucket,
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

  const [downloadUrl, setDownloadUrl] = useState()
  const { appStore } = useModuleStores()

  useEffect(() => {
    if (bucket) {
      appStore.getDownloadURL(bucket).then(result => setDownloadUrl(result))
    }
  }, [appStore, bucket])

  return (
    <img
      {...props}
      src={downloadUrl || src}
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
