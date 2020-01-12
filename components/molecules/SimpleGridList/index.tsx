import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { GridList, GridListProps, useMediaQuery } from '@material-ui/core'

interface ISimpleGridList extends GridListProps {
  colsXs?: number
  colsSm?: number
  colsMd?: number
  colsLg?: number
  colsXl?: number
}

const SimpleGridList: React.FC<ISimpleGridList> = ({
  cols,
  colsXs,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  cellHeight = 'auto',
  ...props
}) => {
  const theme = useTheme()
  const matchesXs = useMediaQuery(theme.breakpoints.only('xs'))
  const matchesSm = useMediaQuery(theme.breakpoints.only('sm'))
  const matchesMd = useMediaQuery(theme.breakpoints.only('md'))
  const matchesLg = useMediaQuery(theme.breakpoints.only('lg'))

  if (matchesXs) {
    cols = colsXs || cols || 1
  } else if (matchesSm) {
    cols = colsSm || cols || 1
  } else if (matchesMd) {
    cols = colsMd || cols || 2
  } else if (matchesLg) {
    cols = colsLg || cols || 3
  } else {
    cols = colsXl || cols || 3
  }

  return (
    <GridList
      spacing={0}
      style={{ margin: -4 }}
      cellHeight={cellHeight}
      cols={cols}
      {...props}
    ></GridList>
  )
}

export default SimpleGridList
