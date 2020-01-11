import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: `calc(100vw - ${theme.spacing(2)}px)`,
    [theme.breakpoints.up('sm')]: {
      maxWidth: `calc(100vw - ${theme.spacing(8) +
        (window.drawerWidth || 0)}px)`
    },
    overflowX: 'auto'
  },
  table: {
    borderTop: 1,
    backgroundColor: theme.palette.grey[50]
  }
}))

const SimpleTable: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Table className={classes.table}>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  )
}

export default SimpleTable
