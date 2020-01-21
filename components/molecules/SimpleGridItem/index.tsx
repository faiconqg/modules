import React from 'react'
import { GridListTileProps, GridListTile, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  tile: {
    overflow: 'unset'
  }
}))

interface ISimpleGridList extends GridListTileProps {}

const SimpleGridItem: React.FC<ISimpleGridList> = ({ children, ...props }) => {
  const classes = useStyles()
  return (
    <GridListTile {...props} classes={{ tile: classes.tile }}>
      {children}
    </GridListTile>
  )
}

export default SimpleGridItem
