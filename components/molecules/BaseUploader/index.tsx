import React, { useRef, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as firebase from 'firebase/app'
import 'firebase/storage'
import generateRandomID from 'uuid/v4'

const useStyles = makeStyles(theme => ({
  root: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  }
}))

const extractExtension = (filename: string) => {
  let ext = /(?:\.([^.]+))?$/.exec(filename)
  if (ext != null && ext[0] != null) {
    return ext[0]
  } else {
    return ''
  }
}

export interface IBaseUploader
  extends Omit<React.HTMLProps<HTMLInputElement>, 'onProgress' | 'ref'> {
  folder?: string
  autostart?: boolean
  onProgress?: (progress: number, task: any) => void
  onUploadStart?: (file: File, task: any) => void
  onUploadError?: (error: any, task: any) => void
  onUploadSuccess?: (filename: string) => void
  onSelectFiles?: (files: File[]) => void
  onInit?: (startFunction: () => void) => void
}

const BaseUploader: React.FC<IBaseUploader> = React.forwardRef<
  HTMLInputElement,
  IBaseUploader
>(
  (
    {
      folder,
      onInit,
      onProgress,
      onUploadStart,
      onUploadError,
      onUploadSuccess,
      onSelectFiles,
      autostart = true,
      ...props
    },
    ref
  ) => {
    const classes = useStyles()
    const selectedFiles = useRef<File[]>()

    const startUpload = useCallback(
      (file: File) => {
        let filenameToUse = generateRandomID()

        if (!extractExtension(filenameToUse)) {
          filenameToUse += extractExtension(file.name)
        }

        const task = firebase
          .storage()
          .ref(folder || '')
          .child(filenameToUse)
          .put(file)

        if (onUploadStart) {
          onUploadStart(file, task)
        }

        task.on(
          'state_changed',
          (snapshot: any) =>
            onProgress &&
            onProgress(
              Math.round(
                (100 * snapshot.bytesTransferred) / snapshot.totalBytes
              ),
              task
            ),
          (error: any) => onUploadError && onUploadError(error, task),
          async () =>
            onUploadSuccess &&
            onUploadSuccess(
              (folder ? folder + '/' : '') + task.snapshot.metadata.name
            )
        )
      },
      [folder, onProgress, onUploadError, onUploadStart, onUploadSuccess]
    )

    const startUploads = useCallback(
      (files?: File[]) => {
        files = files || selectedFiles.current
        files?.forEach(file => startUpload(file))
      },
      [startUpload]
    )

    useEffect(() => {
      onInit && onInit(startUploads)
    }, [onInit, startUploads])

    const handleFileSelection = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const {
        target: { files }
      } = event

      const arrayFiles = Array.from(files || [])

      selectedFiles.current = arrayFiles

      if (autostart) {
        startUploads()
      }
      if (onSelectFiles) {
        onSelectFiles(arrayFiles)
      }
    }

    return (
      <input
        {...props}
        ref={ref}
        type="file"
        onChange={handleFileSelection}
        className={classes.root}
      />
    )
  }
)

export default BaseUploader
