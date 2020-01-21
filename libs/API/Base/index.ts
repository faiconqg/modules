import { observable, action } from 'mobx'
import { appStore } from 'modules/stores'
import _ from 'lodash'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export default class Base<T, PathParams = null> {
  constructor(endpoint: string, relation: any[] = [], data?: T) {
    this.endpoint = endpoint
    this.relation = relation
    // Object.assign(this, data)
    if (data) {
      this.data = observable(data)
      Object.assign(this, this.data)
    }
  }

  @observable
  endpoint: string = ''

  @observable
  busy: boolean = false

  @observable
  data?: T | T[];

  [prop: string]: any

  @observable
  error?: any

  relation?: any

  getIfNull(params?: PathParams, body?: object) {
    if (!this.data) {
      this.get(params, body)
    }
  }

  get(params?: PathParams, body?: object) {
    this.fetch('GET', body, params)
  }

  post(body?: object, params?: PathParams) {
    this.fetch('POST', body, params)
  }

  @action
  fetch(method: Method, body?: object, params?: PathParams) {
    this.busy = true
    let url = `${appStore.config?.apiUrl || ''}/${this.endpoint}`

    if (params) {
      Object.keys(params).forEach(key => {
        url = url.replace(':' + key, (params as any)[key])
      })
    }

    return fetch(url, {
      method,
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

  @action
  set(path: string, value: any) {
    return _.set(this, path, observable(value))
  }

  // get(path?: string) {
  //   // return path ? (this.data ? this.data[path] : null) : this.data
  //   return path ? _.get(this.data, path) : this.data
  // }

  // get id() {
  //   return this.get('id')
  // }
}
