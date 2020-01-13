import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, DividerProps } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  spacing1: {
    margin: theme.spacing(1, 0)
  },
  spacing2: {
    margin: theme.spacing(2, 0)
  },
  spacing3: {
    margin: theme.spacing(3, 0)
  },
  spacing4: {
    margin: theme.spacing(4, 0)
  },
  negative1: {
    marginRight: theme.spacing(-1),
    marginLeft: theme.spacing(-1)
  },
  negative2: {
    marginRight: theme.spacing(-2),
    marginLeft: theme.spacing(-2)
  },
  negative3: {
    marginRight: theme.spacing(-3),
    marginLeft: theme.spacing(-3)
  },
  negative4: {
    marginRight: theme.spacing(-4),
    marginLeft: theme.spacing(-4)
  }
}))

interface ISimpleDivider extends DividerProps {
  margin?: 'spacing1' | 'spacing2' | 'spacing3' | 'spacing4'
  negativeMargin?: 'negative1' | 'negative2' | 'negative3' | 'negative4'
}

const SimpleDivider: React.FC<ISimpleDivider> = ({
  margin,
  negativeMargin,
  className,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Divider
      {...props}
      className={clsx(
        className,
        margin ? classes[margin] : null,
        negativeMargin ? classes[negativeMargin] : null
      )}
    />
  )
}

export default SimpleDivider
