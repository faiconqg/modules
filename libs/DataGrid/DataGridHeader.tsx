import React from 'react'
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox
} from '@material-ui/core'

export interface IDataGridHeader {
  onSelectAllClick: any
  order: any
  orderBy: any
  numSelected: any
  rowCount: any
  columns: any
  fixedColumn: any
  checkbox: any
  onRequestSort: (event: any, property: any) => void
}

const DataGridHeader: React.FC<IDataGridHeader> = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  columns,
  fixedColumn,
  checkbox,
  onRequestSort
}) => {
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {checkbox && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {React.Children.map(columns.props.children, (column, index) => {
          column = column.props
          let style: any = {
            minWidth: column.width
          }
          if (index < fixedColumn) {
            style.position = 'absolute'
            style.left = index * 200
          }
          return (
            <TableCell
              key={index}
              // align={column.numeric ? 'right' : null}
              style={style}
              sortDirection={orderBy === column.field ? order : false}
            >
              <TableSortLabel
                active={orderBy === column.field}
                direction={order}
                style={{ fontSize: 15, fontWeight: 400 }}
                onClick={createSortHandler(column.field)}
              >
                {column.title}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default DataGridHeader
