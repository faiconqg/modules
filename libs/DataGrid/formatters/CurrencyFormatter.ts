export default (value?: string | number) =>
  value !== null && value !== undefined
    ? `${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    : ''
