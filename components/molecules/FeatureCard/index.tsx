import React from 'react'
import {
  GridListTileProps,
  Typography,
  makeStyles,
  Button,
  Paper,
  darken
} from '@material-ui/core'
import Div from '../Div'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    margin: 0,
    textAlign: 'left'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: theme.palette.primary.main
  },
  medium: {
    height: theme.spacing(28)
  },
  small: {
    height: theme.spacing(18)
  },
  noImage: {
    background: theme.palette.primary.dark
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    objectFit: 'cover',
    width: '100%',
    borderBottomColor: 'rgba(255,255,255,0.16)',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  smallImage: {
    height: theme.spacing(6)
  },
  mediumImage: {
    height: theme.spacing(14)
  },
  textContainer: {
    color: theme.palette.common.white,
    padding: theme.spacing(1, 3)
  },
  secondary: {
    fontSize: 13
  }
}))

interface IFeatureCard extends GridListTileProps {
  primary: string
  secondary?: string
  size?: 'small' | 'medium'
  image?: string
  color?: string
  onClick?: () => void
}

const FeatureCard: React.FC<IFeatureCard> = ({
  primary,
  secondary,
  color,
  image,
  size = 'medium',
  onClick,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Button className={classes.root} onClick={onClick} fullWidth>
      <Paper
        className={clsx(classes.main, classes[size])}
        style={{ background: color }}
      >
        {image ? (
          <img
            className={clsx(
              classes.image,
              classes[(size + 'Image') as 'smallImage' | 'mediumImage']
            )}
            src={image}
            alt={primary}
          />
        ) : (
          <div
            style={{ background: color ? darken(color, 0.5) : undefined }}
            className={clsx(
              classes.image,
              classes[(size + 'Image') as 'smallImage' | 'mediumImage'],
              classes.noImage
            )}
          />
        )}
        <Div className={classes.textContainer}>
          <Typography variant="h6">{primary}</Typography>
          <Typography variant="body2" className={classes.secondary}>
            {secondary}
          </Typography>
        </Div>
      </Paper>
    </Button>
  )
}

export default FeatureCard
