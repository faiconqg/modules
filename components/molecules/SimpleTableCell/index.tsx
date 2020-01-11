import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TableCell, TableCellProps } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    borderTop: '1px solid rgba(0,0,0,.08)',
    borderBottom: 'none',
    padding: 12,
    color: theme.palette.text.secondary,
    fontSize: 13,
    cursor: 'pointer'
  },
  bold: {
    fontWeight: 500
  },
  dark: {
    color: theme.palette.text.primary
  },
  noPadRight: {
    paddingRight: 0
  },
  noPadLeft: {
    paddingLeft: 0
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  }
}))

interface ISimpleTableCell extends TableCellProps {
  bold?: boolean
  width?: number
  noPadRight?: boolean
  noPadLeft?: boolean
  flex?: boolean
  dark?: boolean
}

const SimpleTableCell: React.FC<ISimpleTableCell> = ({
  className,
  bold,
  noPadRight,
  noPadLeft,
  flex,
  dark,
  children,
  ...props
}) => {
  const classes = useStyles()

  return (
    <TableCell
      className={clsx(
        classes.root,
        bold && classes.bold,
        dark && classes.dark,
        noPadRight && classes.noPadRight,
        noPadLeft && classes.noPadLeft,
        className
      )}
      {...props}
    >
      {flex ? <div className={classes.flex}>{children}</div> : children}
    </TableCell>
  )
}

export default SimpleTableCell
