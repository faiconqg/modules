import { observable, action } from 'mobx'
import { appStore } from 'modules/stores'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export default class Base {
  constructor(endpoint: string, method: Method, data?: object) {
    this.endpoint = endpoint
    this.method = method
    this.data = data
  }

  @observable
  endpoint: string = ''

  @observable
  method: Method = 'GET'

  @observable
  busy: boolean = false

  @observable
  data?: any

  @observable
  error?: any

  @action
  fetch(body?: object) {
    this.busy = true
    return fetch(`${appStore.config?.apiUrl || ''}/${this.endpoint}`, {
      method: this.method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (appStore.token || '')
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response.json()
        }
      })
      .then(this.resolveResult.bind(this))
      .catch(e => e.then(this.resolveError.bind(this)))
      .finally(
        action(() => {
          this.busy = false
        })
      )
  }

  @action
  resolveError(json: any) {
    this.error = json.error ? json.error : json
  }

  @action
  resolveResult(json: object) {
    this.data = json
  }

  get(path?: string) {
    return path ? (this.data ? this.data[path] : null) : this.data
  }
}
