import * as firebase from 'firebase/app'
import { observable, action } from 'mobx'
import * as mobx from 'mobx'
import Model from 'modules/libs/API/Model'
import { userStore } from '.'

export type TConfig = {
  appName: string
  companyName: string
  companyUrl: string
  footerMessage?: string
  apiUrl?: string
  appIcon?: any
  allowNewUsers?: boolean
  displayAppNameInMenuHeader?: boolean
  loginBottomText?: string
}

export default class AppStore {
  constructor() {
    mobx.configure({ enforceActions: 'observed' })
  }

  @observable
  initialized: boolean = false

  @observable
  token: string | undefined

  @observable
  config: TConfig | undefined

  firebaseConfig?: object

  @observable
  configResolved: boolean = false

  @action
  setToken(token?: string) {
    this.token = token
  }

  @action
  setConfig(config: TConfig) {
    this.config = Object.assign(
      { allowNewUsers: true, displayAppNameInMenuHeader: true },
      config
    )
    this.configResolved = true
  }

  @action
  setFirebaseConfig(firebaseConfig: any) {
    if (firebaseConfig) {
      this.firebaseConfig = firebaseConfig
      firebase.initializeApp(firebaseConfig)

      firebase.auth().onAuthStateChanged(user => {
        this.setInitialized()
        if (user) {
          userStore.setUser(user)
        } else {
          userStore.clearUser()
        }
      })
    } else {
      this.setInitialized()
    }
  }

  @action
  setInitialized() {
    if (!this.initialized) {
      this.initialized = true
    }
  }

  @observable
  ping: Model<{}> = new Model('ping')
}
