export default (value?: string | number) =>
  value !== null && value !== undefined
    ? value
        .toString()
        .padStart(14, '0')
        .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
    : ''
