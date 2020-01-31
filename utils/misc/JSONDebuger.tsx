import React, { useEffect } from 'react'
import { useModuleStores } from 'modules/stores/use-module-stores'

const JSONDebuger: React.FC<{ json: any }> = ({ json }) => {
  const { appStore } = useModuleStores()

  useEffect(() => {
    appStore.setDebug(json)
  })
  return null
}

export default JSONDebuger
