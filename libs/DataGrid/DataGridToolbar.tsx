import React from 'react'
import {
  Typography,
  Paper,
  LinearProgress,
  makeStyles,
  TextField
} from '@material-ui/core'
import Divider from 'modules/components/atoms/Divider'
import SearchIcon from '@material-ui/icons/Search'
import { IDataGridColumn } from './DataGridColumn'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f8f8f8',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1)
    }
  },
  decorator: {
    backgroundColor: theme.palette.primary.main,
    height: 2
  },
  progress: {
    height: 2
  },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    marginLeft: 10,
    display: 'block',
    color: theme.palette.text.secondary,
    flexShrink: 0
  },
  title: {
    flex: '0 0 auto'
  },
  titleBar: {
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  searchIcon: {
    marginRight: theme.spacing(2)
  }
}))

export interface IDataGridToolbar {
  numSelected?: any
  titleBar: any
  controlBar: any
  title: any
  busy: any
  searchableColumns?: IDataGridColumn[]
  onSearch?: (searchTerm: string) => void
}

const DataGridToolbar: React.FC<IDataGridToolbar> = ({
  numSelected,
  titleBar,
  controlBar,
  title,
  busy,
  onSearch,
  searchableColumns
}) => {
  const classes = useStyles({})

  return (
    <Paper className={classes.root} square>
      <div className={classes.flex}>
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {`${numSelected} ${
                numSelected > 1 ? 'selecionados' : 'selecionado'
              }`}
            </Typography>
          ) : (
            <div className={classes.titleBar}>
              {title && title}
              {title && titleBar && <Divider />}
              {titleBar}
            </div>
          )}
        </div>
        {searchableColumns && searchableColumns.length > 0 ? (
          <>
            {(title || titleBar) && <Divider />}
            <SearchIcon className={classes.searchIcon} color="inherit" />
            <TextField
              fullWidth
              onChange={event => onSearch && onSearch(event.target.value)}
              placeholder={`Pesquise por ${searchableColumns
                .map(c => c.title || c.field)
                .join(', ')
                .replace(/,([^,]*)$/, ' ou$1')}`}
              InputProps={{
                disableUnderline: true,
                className: classes.searchInput
              }}
            />
          </>
        ) : (
          <div className={classes.spacer} />
        )}

        <div className={classes.actions}>{controlBar}</div>
      </div>
      {busy ? (
        <LinearProgress className={classes.progress} variant="query" />
      ) : (
        <div className={classes.decorator} />
      )}
    </Paper>
  )
}

export default DataGridToolbar
