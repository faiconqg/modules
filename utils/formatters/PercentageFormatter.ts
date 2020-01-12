export default (value?: string | number) =>
  value !== null && value !== undefined
    ? `${(parseFloat(String(value)) * 100).toFixed(0)} %`
    : ''
