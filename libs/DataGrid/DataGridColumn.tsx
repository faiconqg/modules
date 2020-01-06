import React from 'react'

export interface IDataGridColumn {
  title?: string
  field: string
  visible?: boolean
  formatter?: any
  numeric?: boolean
  render?: any
  searchable?: boolean
  children?: any
  renderer?: any
  replaceBlank?: boolean
  formula?: string
  format?: any
}

const DataGridColumn: React.FC<IDataGridColumn> = () => {
  return null
}

export default DataGridColumn
