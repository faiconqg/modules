import React from 'react'
import Lens from '@material-ui/icons/Lens'

export interface IImageRenderer {
  value: any
}

const ImageRenderer: React.FC<IImageRenderer> = ({ value }) => {
  return (
    <img
      style={{
        objectFit: 'contain',
        width: 30,
        height: 30,
        padding: '0 0 0 0'
      }}
      alt="imagem"
      src={value ? value : <Lens />}
    />
  )
}

export default ImageRenderer
