import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import Div, { IGenericContainer } from 'modules/components/molecules/Div'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 348,
    [theme.breakpoints.down('xs')]: {
      height: 318
    },
    '@media (max-width:479.95px)': {
      height: 250
    },
    '@media (max-width:379.95px)': {
      height: 196
    }
  },
  preserveRatio: {
    maxWidth: 635
  },
  iframe: {
    borderRadius: 8,
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: '100%'
  }
}))

interface IYoutube extends IGenericContainer {
  code: string
  preserveRatio?: boolean
}

const Youtube: React.FC<IYoutube> = ({ code, preserveRatio, ...props }) => {
  const classes = useStyles()

  return (
    <Div
      className={clsx(classes.root, preserveRatio && classes.preserveRatio)}
      {...props}
    >
      <iframe
        className={classes.iframe}
        title="video"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        width="100%"
        allowFullScreen
        src={`https://www.youtube.com/embed/${code}`}
      ></iframe>
    </Div>
  )
}

export default Youtube
