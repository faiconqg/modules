import { observable, action } from 'mobx'
import { appStore } from 'modules/stores'
import _ from 'lodash'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export default class Base<T> {
  constructor(
    endpoint: string,
    method: Method,
    relation: any[] = [],
    data?: T
  ) {
    this.endpoint = endpoint
    this.method = method
    this.relation = relation
    this.data = data
  }

  @observable
  endpoint: string = ''

  @observable
  method: Method = 'GET'

  @observable
  busy: boolean = false

  @observable
  data?: T | T[]

  @observable
  error?: any

  relation?: any

  @action
  tryFetch(body?: object) {
    if (!this.data) {
      return this.fetch(body)
    }
  }

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
      .catch(e => {
        if (e.then) {
          return e.then(this.resolveError.bind(this))
        } else {
          return this.resolveError(e)
        }
      })
      .finally(
        action(() => {
          this.busy = false
        })
      )
  }

  @action
  resolveError(json: any) {
    console.log(json)
    this.error = json.error ? json.error : json
  }

  @action
  resolveResult(json: T) {
    this.data = json
  }

  get(path?: string) {
    // return path ? (this.data ? this.data[path] : null) : this.data
    return path ? _.get(this.data, path) : this.data
  }
}
