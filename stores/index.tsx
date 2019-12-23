import React from 'react'
import AppStore from './AppStore'
import UserStore from './UserStore'

export const appStore = new AppStore()
export const userStore = new UserStore()

export const storesContext = React.createContext({ appStore, userStore })
