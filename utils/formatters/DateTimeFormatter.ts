import moment from 'moment'
export default (value?: string | Date) =>
  value ? moment.utc(value).format('DD/MM/YYYY HH:mm') : ''
