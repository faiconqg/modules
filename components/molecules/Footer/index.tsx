import React from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1'
  }
}))

export interface IProps {
  config: any
}

const Footer: React.FC<IProps> = ({ config = {} }) => {
  const classes = useStyles({})

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href={config.companyUrl} target="_blank">
          {config.companyName}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  )
}

export default Footer
