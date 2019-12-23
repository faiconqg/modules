import * as firebase from 'firebase/app'
import firebaseConfig from 'firebase.json'
import { observable, action } from 'mobx'
import * as mobx from 'mobx'
import Model from 'modules/libs/API/Model'

export type TConfig = {
  appName: string
  companyName: string
  companyUrl: string
  footerMessage?: string
  apiUrl: string | undefined
}

export default class AppStore {
  constructor() {
    mobx.configure({ enforceActions: 'observed' })
    firebase.initializeApp(firebaseConfig)
  }

  @observable
  initialized: boolean = false

  @observable
  token: string | undefined

  @observable
  config: TConfig | undefined

  @observable
  configResolved: boolean = false

  @action
  setToken(token?: string) {
    this.token = token
  }

  @action
  setConfig(config: TConfig) {
    this.config = config
    this.configResolved = true
  }

  @action
  setInitialized() {
    if (!this.initialized) {
      this.initialized = true
    }
  }

  @observable
  ping: Model = new Model('ping', 'GET')
}
