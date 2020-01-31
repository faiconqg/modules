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
  useSecondaryColorInMenu?: boolean
}

export default class AppStore {
  constructor() {
    mobx.configure({ enforceActions: 'observed' })
  }

  cachedUrls: any = {}

  @observable
  initialized: boolean = false

  @observable
  token: string | undefined

  @observable
  config: TConfig | undefined

  @observable
  debugJSON: any

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
  setDebug(json: any) {
    this.debugJSON = json
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

  getDownloadURL(path: string) {
    return new Promise(resolve => {
      if (this.cachedUrls[path]) {
        resolve(this.cachedUrls[path])
      } else {
        firebase
          .storage()
          .ref(path)
          .getDownloadURL()
          .then(result => {
            this.cachedUrls[path] = result
            resolve(result)
          })
      }
    })
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
