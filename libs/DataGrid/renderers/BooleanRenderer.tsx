import React from 'react'
import Check from '@material-ui/icons/Check'
import Remove from '@material-ui/icons/Remove'

export interface IBooleanRenderer {
  value: any
}

const BooleanRenderer: React.FC<IBooleanRenderer> = ({ value }) => {
  if (value) {
    return <Check />
  } else {
    return <Remove />
  }
}

export default BooleanRenderer
