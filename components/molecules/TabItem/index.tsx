import React from 'react'

export interface ITabItemProps {
  title: string
}

const TabItem: React.FC<ITabItemProps> = ({ children }) => {
  return <>{children}</>
}

export default TabItem
