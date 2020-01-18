import React from 'react'
import {
  GridListTileProps,
  Typography,
  makeStyles,
  Button,
  Paper
} from '@material-ui/core'
import Div from '../Div'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    margin: 0,
    textAlign: 'left'
  },
  main: {
    height: theme.spacing(28)
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    objectFit: 'cover',
    height: theme.spacing(14),
    width: '100%'
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
  image?: string
  color?: string
  onClick?: () => void
}

const FeatureCard: React.FC<IFeatureCard> = ({
  primary,
  secondary,
  color,
  image,
  onClick,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Button className={classes.root} onClick={onClick}>
      <Paper className={classes.main} style={{ background: color }}>
        <img className={classes.image} src={image} alt={primary} />
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
