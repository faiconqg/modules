import React, { useState, useRef } from 'react'
import DataGridToolbar from './DataGridToolbar'
import {
  CircularProgress,
  TablePagination,
  Paper,
  makeStyles
} from '@material-ui/core'
import { AgGridReact } from '@ag-grid-community/react'
import {
  GridReadyEvent,
  GridApi,
  ColumnApi
} from '@ag-grid-community/all-modules'
import agGridTranslation from './agGridTranslation.json'
import BooleanRenderer from './renderers/BooleanRenderer'
import ImageRenderer from './renderers/ImageRenderer'
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css'
import '@ag-grid-community/all-modules/dist/styles/ag-theme-material.css'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import _ from 'lodash'
import { IDataGridColumn } from './DataGridColumn'
import CpfFormatter from 'modules/utils/formatters/CpfFormatter'
import CnpjFormatter from 'modules/utils/formatters/CnpjFormatter'
import CurrencyFormatter from 'modules/utils/formatters/CurrencyFormatter'
import DateFormatter from 'modules/utils/formatters/DateFormatter'
import DateTimeFormatter from 'modules/utils/formatters/DateTimeFormatter'
import PercentageFormatter from 'modules/utils/formatters/PercentageFormatter'
import Model from '../API/Model'
import Collection from '../API/Collection'

const formatters = {
  cpf: CpfFormatter,
  cnpj: CnpjFormatter,
  currency: CurrencyFormatter,
  date: DateFormatter,
  dateTime: DateTimeFormatter,
  percentage: PercentageFormatter
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  caption: {
    fontSize: 12,
    flexShrink: 1
  },
  spacer: {
    flex: 'auto'
  },
  noRows: {
    color: theme.palette.primary.dark,
    fontWeight: 500
  },
  wrap: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 12,
    color: theme.palette.grey[700],
    paddingRight: 4
    // borderTopColor: theme.palette.grey[300],
    // borderTopStyle: 'solid',
    // borderTopWidth: 1
  },
  rowCount: {
    marginLeft: 3
  },
  statusBar: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 38,
    display: 'flex'
  },
  statusBarInner: { flex: 1, display: 'flex', alignItems: 'center' },
  right: { justifyContent: 'flex-end' },
  progress: {
    color: theme.palette.grey[500]
  },
  paginationInfo: {
    minWidth: 50,
    display: 'flex',
    alignItems: 'center'
  },
  tableWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  summary: {
    background: theme.palette.grey[200],
    fontWeight: 700
  }
}))

const rendererContainerStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center'
}

export interface IDataGrid {
  rows?: any
  titleBar?: any
  busy?: any
  children?: any
  collection?: Collection<{ [prop: string]: any }[]>
  controlBar?: any
  clientSide?: boolean
  statusRight?: any
  statusLeft?: any
  rowCount?: any
  title?: any
  busyCount?: any
  elevation?: number
  disableSummary?: any
  onSortChanged?: any
  height?: any
  order?: any
  orderBy?: any
  page?: any
  rowsPerPage?: any
  fieldsToSummary?: any
  onRequestSort?: (order: any, orderBy: any) => void
  onItemClick?: (data: Model<{ [prop: string]: any }>) => void
  onChangePage?: (page: any) => void
  onChangeRowsPerPage?: (value: any) => void
}

const DataGrid: React.FC<IDataGrid> = ({
  rows,
  titleBar,
  busy,
  children,
  controlBar,
  collection,
  clientSide,
  statusRight,
  statusLeft,
  rowCount,
  title,
  busyCount,
  disableSummary,
  onSortChanged,
  elevation = 1,
  height,
  order,
  orderBy,
  page,
  rowsPerPage,
  fieldsToSummary,
  onRequestSort,
  onItemClick,
  onChangePage,
  onChangeRowsPerPage
}) => {
  // const [currentOrder, setOrder] = useState(order)
  // const [currentOrderBy, setOrderBy] = useState(orderBy)
  const [currentPage, setPage] = useState(page || 0)
  const [currentRowsPerPage, setRowsPerPage] = useState(rowsPerPage || 10)
  const [filteredRows, setFilteredRows] = useState()
  // const [selected, setSelected] = useState([])
  const classes = useStyles({})
  const apiRef = useRef<GridApi>()
  const columnApiRef = useRef<ColumnApi>()

  // const handleRequestSort = (event: any, property: any) => {
  //   const orderBy = property
  //   let order = 'asc'

  //   if (currentOrderBy === property && currentOrder === 'asc') {
  //     order = 'desc'
  //   }
  //   setOrder(order)
  //   setOrderBy(orderBy)
  //   onRequestSort && onRequestSort(order, orderBy)
  // }

  // const handleSelectAllClick = (event: any, checked: any) => {
  //   if (checked) {
  //     setSelected(rows.map((n: any) => n.id))
  //     return
  //   }
  //   setSelected([])
  // }

  const handleClick = (params: any) => {
    if (onItemClick) {
      if (params.data instanceof Model) {
        onItemClick(params.data)
      } else {
        onItemClick(new Model('', 'GET', params.data))
      }
    }
  }

  // const handleSelect = (event: any, id: number) => {
  //   const selectedIndex = (selected as any[]).indexOf(id)
  //   let newSelected: any = []

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id)
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1))
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1))
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     )
  //   }

  //   setSelected(newSelected)
  // }

  const handleChangePage = (event: any, page: any) => {
    setPage(page)
    onChangePage && onChangePage(page)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value)
    onChangeRowsPerPage && onChangeRowsPerPage(event.target.value)
  }

  const resolveLabel = (formatter: any, numeric: any, replaceBlank: any) => (
    params: any
  ) => {
    let returnValue = itemToLabel(params)
    if (returnValue === null || returnValue === undefined) {
      returnValue = replaceBlank
    }
    if (numeric) {
      returnValue = parseFloat(returnValue || 0)
    }
    if (formatter) {
      if (typeof formatter === 'string') {
        formatter = (formatters as any)[formatter]
      }
      returnValue = formatter(returnValue)
    }
    return returnValue
  }

  const itemToLabel = (params: any) => {
    if (params.column.colDef.label) {
      return params.column.colDef.label
    } else if (params.data) {
      return params.data.get
        ? params.data.get(params.column.colDef.field)
        : _.get(params.data, params.column.colDef.field)
    } else {
      return ''
    }
  }

  const resolveRender = (render: any, renderer: any) => {
    if (render) {
      return (params: any) => {
        // TODO: Verificar se serve para todos os casos
        if (
          params.node.rowPinned === 'bottom' &&
          String(params.value).length === 0
        ) {
          return <div>''</div>
        }
        return (
          <div style={rendererContainerStyle}>
            {render(
              // params.column.colDef.field
              //   ? params.data.g(params.column.colDef.field)
              //   : null,
              params.value,
              params.column.colDef.field,
              params.data
            )}
          </div>
        )
      }
    } else if (renderer) {
      return (params: any) => {
        if (
          params.node.rowPinned === 'bottom' &&
          String(params.value).length === 0
        ) {
          return ''
        }
        switch (renderer) {
          case 'boolean':
            return (
              <div style={rendererContainerStyle}>
                <BooleanRenderer {...params} />
              </div>
            )
          case 'image':
            return (
              <div style={rendererContainerStyle}>
                <ImageRenderer {...params} />
              </div>
            )
          default:
            return null
        }
      }
    }
  }

  const getRowClass = (params: any) => {
    // if (params.node.rowIndex % 2 === 0) {
    if (params.node.rowPinned === 'bottom') {
      return classes.summary
    } else {
      return ''
    }
  }

  const getSearchableColumns = (columns: any) => {
    return columns
      .filter((column: any) => {
        const { searchable } = column.props
        return searchable
      })
      .map((column: any) => column.props)
  }

  const getColumns = (columns: any) => {
    return columns
      .filter((column: any) => {
        const { visible = true } = column.props
        return visible
      })
      .map((column: any) => {
        const {
          title,
          field,
          visible,
          formatter,
          numeric,
          render,
          children,
          renderer,
          replaceBlank,
          formula,
          format,
          searchable,
          ...props
        } = column.props

        return {
          headerName: title || field,
          field: field || '',
          tooltipField: field || '',
          children: children && getColumns(children),
          cellRendererFramework: resolveRender(render, renderer),
          valueGetter: resolveLabel(formatter, numeric, replaceBlank),
          ...props
        }
      })
  }

  const autosizeColumnsIfNeeded = () => {
    let availableWidth =
      apiRef.current && apiRef.current['gridPanel'].getBodyClientRect().width
    let columns =
      apiRef.current &&
      apiRef.current['gridPanel']['columnController'].getAllDisplayedColumns()
    let usedWidth =
      apiRef.current &&
      apiRef.current['gridPanel']['columnController'].getWidthOfColsInList(
        columns
      )

    if (usedWidth < availableWidth) {
      apiRef.current?.sizeColumnsToFit()
    }
  }

  const deepColumns = (children: any, prefix: any = '') =>
    children.reduce((ac: any, item: any) => {
      if (item.props.children) {
        return ac.concat(deepColumns(item.props.children, item.headerName))
      } else {
        item = Object.assign({}, item)
        item.headerName = prefix + ' ' + item.headerName
        return ac.concat([item])
      }
    }, [])

  const resolveSummary = () => {
    if (clientSide && fieldsToSummary) {
      let summary: any = {}
      const fields = deepColumns(children).concat(
        fieldsToSummary.map((props: any) => ({ props }))
      )
      fields.forEach((column: any) => {
        const { field, numeric } = column.props
        if (numeric) {
          summary[field] = 0
        }
      })
      rows.forEach((row: any) => {
        fields.forEach((column: any) => {
          const { field, numeric } = column.props
          if (numeric) {
            summary.set({ [field]: summary.get(field) + row.g(field) + 0 })
          }
        })
      })
      fields.forEach((column: any) => {
        const { field, first, average } = column.props
        if (average) {
          summary.set({ [field]: summary.get(field) / rows.length })
        }
        if (first) {
          summary.set({
            [field]: rows.length ? rows[0].g(field) : ''
          })
        }
      })
      return [summary]
    }
  }

  const onGridReady = (params: GridReadyEvent) => {
    apiRef.current = params.api
    columnApiRef.current = params.columnApi
    autosizeColumnsIfNeeded()
  }

  if (!children || !Array.isArray(children)) {
    return <div>Defina pelo menos duas colunas</div>
  }

  const searchableColumns: IDataGridColumn[] = getSearchableColumns(children)

  const resolveSearch = (searchTerm: string) => {
    if (searchTerm.length > 0) {
      setFilteredRows(
        rows.filter((row: any) => {
          for (const searchableColumn of searchableColumns) {
            if (
              resolveLabel(
                searchableColumn.formatter,
                searchableColumn.numeric,
                searchableColumn.replaceBlank
              )({ data: row, column: { colDef: searchableColumn } }).match(
                new RegExp(searchTerm, 'gi')
              )
            ) {
              return true
            }
          }
          return false
        })
      )
    } else {
      setFilteredRows(undefined)
    }
  }
  if (collection) {
    busy = collection.busy
    rows = collection.data
  }

  const currentRows = filteredRows || rows || []

  return (
    <Paper className={classes.root} elevation={elevation}>
      <DataGridToolbar
        onSearch={resolveSearch}
        searchableColumns={searchableColumns}
        elevation={elevation}
        busy={busy}
        title={title}
        titleBar={titleBar}
        controlBar={controlBar}
      />
      <div
        className={clsx(classes.tableWrapper, 'ag-theme-material')}
        style={{ height }}
      >
        <AgGridReact
          modules={[ClientSideRowModelModule]}
          domLayout={height ? undefined : 'autoHeight'}
          onSortChanged={onSortChanged}
          onRowClicked={params => handleClick(params)}
          onGridReady={onGridReady}
          rowData={currentRows}
          pinnedBottomRowData={disableSummary ? undefined : resolveSummary()}
          rowSelection="multiple"
          enableRangeSelection
          columnDefs={getColumns(children)}
          localeText={agGridTranslation}
          getRowClass={getRowClass}
          overlayNoRowsTemplate={`<div class='${classes.noRows}'><br/>
          <br/><br/>Sem resultados</div>`}
          defaultColDef={{
            // filter: clientSide,
            sortable: true,
            resizable: true
          }}
        />
      </div>
      {clientSide ? (
        <div className={clsx(classes.wrap, classes.statusBar)}>
          <div className={classes.statusBarInner}>{statusLeft}</div>
          <div className={clsx(classes.statusBarInner, classes.right)}>
            {statusRight}
            {`${currentRows.length} ${
              currentRows.length === 1 ? 'linha' : 'linhas'
            }`}
          </div>
        </div>
      ) : (
        <TablePagination
          classes={{
            toolbar: classes.wrap,
            caption: classes.caption,
            spacer: classes.spacer
          }}
          component="div"
          count={rowCount || rows ? rows.length : 0}
          rowsPerPage={currentRowsPerPage}
          page={currentPage}
          onChangePage={handleChangePage}
          labelRowsPerPage="Linhas por página:"
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => {
            return (
              <span className={classes.paginationInfo}>
                <span>
                  {`${from}-${to} de `}
                  {busyCount || (busy && rowCount === 0) ? (
                    <CircularProgress size={14} className={classes.progress} />
                  ) : (
                    count
                  )}
                </span>
              </span>
            )
          }}
        />
      )}
    </Paper>
  )
}

interface IDiv extends React.HTMLProps<HTMLDivElement> {}

export default observer(DataGrid)
