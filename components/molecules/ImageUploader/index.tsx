import React, { useRef, useState } from 'react'
import { makeStyles, lighten } from '@material-ui/core/styles'
import Dropzone, { DropzoneRef } from 'react-dropzone'
import clsx from 'clsx'
import {
  Button,
  Typography,
  IconButton,
  CircularProgress
} from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import Warning from '@material-ui/icons/Warning'
import BaseUploader from '../BaseUploader'
import OpenableImage from '../OpenableImage'
import SimpleDialog from '../SimpleDialog'
import Image from '../Image'

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: theme.palette.grey[300],
    position: 'relative',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    height: '100%',
    flexShrink: 0,
    '&:focus': {
      outline: 0
    }
  },
  dragActive: {
    backgroundColor: lighten(theme.palette.primary.main, 0.7)
  },
  progress: {
    width: '100%'
  },
  cursorPointer: {},
  img: {
    cursor: 'pointer'
  },
  busyContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 8,
    alignItems: 'center',
    padding: theme.spacing(1, 2)
  },
  imagePreview: {
    width: '100%'
  },
  removeButton: {
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  imageButtons: {
    textAlign: 'right',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  overlay: {
    padding: theme.spacing(1),
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    boxShadow: 'none',
    maxWidth: 'calc(100% - 32px)',
    background: 'transparent',
    margin: theme.spacing(2)
  }
}))

export interface IImageUploader {
  className?: string
  value?: string
  folder?: string
  label?: string
  icon?: any
  size?: any
  width?: any
  height?: any
  noLabel?: boolean
  removeOverlay?: boolean
  onRemoveClick?: () => void
  onCloseImage?: () => void
  onRemoveImage?: () => void
  onChange?: (path?: string) => void
}

const ImageUploader: React.FC<IImageUploader> = ({
  onChange,
  value,
  folder = 'temp',
  label,
  icon,
  noLabel,
  size,
  width,
  onCloseImage,
  onRemoveImage,
  height,
  removeOverlay, // apenas um helper para ajudar em listas
  onRemoveClick,
  className,
  ...props
}) => {
  const classes = useStyles()
  const startUploadRef = useRef()
  const dropzone = useRef<DropzoneRef>(null)
  const [error, setError] = useState()
  const [preview, setPreview] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [progress, setProgress] = useState()
  const [confirm, setConfirm] = useState(false)
  const [capture, setCapture] = useState(true)

  const handleInit = (startUpload: any) => {
    startUploadRef.current = startUpload
  }

  const handleSelectFile = (acceptedFiles: any) => {
    if (acceptedFiles.length > 0) {
      setPreview(URL.createObjectURL(acceptedFiles[0]))
      const startUpload: any = startUploadRef.current
      startUpload && startUpload(acceptedFiles)
    }
  }

  const handleStart = (file: any) => {
    setLoading(true)
  }

  const handleUploadClick = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setConfirm(true)
    } else {
      startSelecPicture(false)
    }
  }

  const startSelecPicture = (capture: boolean) => {
    setCapture(capture)
    setConfirm(false)
    dropzone.current?.open()
  }

  const handleError = () => {
    setError('Falha no upload, tente novamente')
  }

  const handleProgress = (value: number) => {
    setProgress(value)
  }

  const handleImageError = () => {
    console.log('errr')
    setError('Falha ao carregar imagem')
  }

  const handleImageLoad = () => {
    setLoadingComplete(true)
  }

  const handleFinish = (result: string) => {
    setProgress(undefined)
    setLoading(false)
    handleChange(result)
  }

  const handleChange = (value?: string) => {
    onChange && onChange(value)
  }

  const handleRemove = () => {
    if (preview) {
      setPreview(null)
    }
    handleChange()
    !!onRemoveImage && onRemoveImage()
  }

  const valueReady: boolean = !!preview || !value || loadingComplete

  return (
    <Dropzone
      ref={dropzone}
      onDrop={handleSelectFile}
      noClick
      multiple={false}
      accept="image/*"
    >
      {({ getRootProps, getInputProps, isDragActive }) => {
        const { onProgress, ...inputProps } = getInputProps()
        return (
          <div
            style={{ width: width || size, height: height || size }}
            {...getRootProps()}
            className={clsx(
              className,
              classes.main,
              isDragActive && classes.dragActive
            )}
          >
            <SimpleDialog
              open={confirm}
              message="Deseja abrir a câmera ou selecionar uma foto existente?"
              actions={[
                { label: 'Existente', action: () => startSelecPicture(false) },
                { label: 'Nova foto', action: () => startSelecPicture(true) }
              ]}
            />
            <BaseUploader
              {...inputProps}
              capture={capture}
              folder={folder}
              accept="image/*"
              autostart={false}
              onInit={handleInit}
              onSelectFiles={handleSelectFile}
              onUploadStart={handleStart}
              onProgress={handleProgress}
              onUploadError={handleError}
              onUploadSuccess={handleFinish}
            />
            {error ? (
              <div className={classes.overlay} onClick={() => setError(null)}>
                <Warning color="error" />
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
              </div>
            ) : (
              <>
                {value || preview ? (
                  <>
                    <Image
                      bucket={value}
                      style={{ display: 'none' }}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      alt="Imagem"
                    />
                    {valueReady && (
                      <OpenableImage
                        round
                        cover
                        onClose={onCloseImage}
                        size={size}
                        width={width}
                        height={height}
                        bucket={value}
                        src={preview}
                        alt="Imagem"
                        className={classes.img}
                        toolbar={
                          <div>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              onClick={handleRemove}
                            >
                              Excluir imagem
                            </Button>
                          </div>
                        }
                      />
                    )}
                  </>
                ) : (
                  <>
                    <IconButton onClick={handleUploadClick}>
                      {icon || <Add />}
                    </IconButton>
                    {!noLabel && (
                      <Typography variant="caption">
                        {label || 'Solte uma imagem aqui'}
                      </Typography>
                    )}
                  </>
                )}
                {loading || !valueReady ? (
                  <div className={classes.busyContainer}>
                    <div>
                      <CircularProgress
                        color="primary"
                        variant={
                          progress === undefined ? 'indeterminate' : 'static'
                        }
                        value={progress}
                        className={classes.progress}
                      />
                    </div>
                    {progress !== undefined && (
                      <Typography variant="caption">{progress}%</Typography>
                    )}
                  </div>
                ) : null}

                {removeOverlay && (
                  <div className={classes.busyContainer}>
                    <IconButton onClick={onRemoveClick}>
                      <Close color="error" />
                    </IconButton>
                  </div>
                )}
              </>
            )}
          </div>
        )
      }}
    </Dropzone>
  )
}

export default ImageUploader
