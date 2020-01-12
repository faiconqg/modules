import React from 'react'
import { GridListTileProps, GridListTile } from '@material-ui/core'
import Div from '../Div'

interface ISimpleGridList extends GridListTileProps {}

const SimpleGridItem: React.FC<ISimpleGridList> = ({ children, ...props }) => {
  return (
    <GridListTile {...props}>
      <Div margin="spacing1">{children}</Div>
    </GridListTile>
  )
}

export default SimpleGridItem
