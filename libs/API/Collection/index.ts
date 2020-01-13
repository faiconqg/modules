import { observable, action } from 'mobx'
import Base from 'modules/libs/API/Base'
import Model from 'modules/libs/API/Model'

export const hasMany = (enpoint: string, relations?: any) => {
  return [
    enpoint,
    (prefix: string, data: any) =>
      new Collection(`${prefix}/${data.id}/${enpoint}`, 'GET', relations)
  ]
}

export default class Collection<T> extends Base<T> {
  @observable
  data?: T[]

  @action
  resolveResult(json: any) {
    if (json && !Array.isArray(json)) {
      throw new Error(
        'The API returned an object, an Array is expected to Collection'
      )
    }
    this.data = json.map((item: any) => {
      this.relation.forEach((r: any) => {
        item[r[0]] = r[1](this.endpoint, item)
      })

      return new Model<T>(this.endpoint, this.method, this.relation, item)
    })
  }
}
