export default (value?: string | number) =>
  value !== null && value !== undefined
    ? value
        .toString()
        .padStart(11, '0')
        .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
    : ''
