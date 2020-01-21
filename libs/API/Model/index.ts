import { observable, action } from 'mobx'
import Base from 'modules/libs/API/Base'

export type TModel = {
  data?: any
  busy: boolean
  error?: any
}

export default class Model<T, PathParams = null> extends Base<T, PathParams>
  implements TModel {
  @observable
  data?: T

  @action
  resolveResult(json: any) {
    if (Array.isArray(json)) {
      throw new Error(
        'The API returned an array, an object is expected to Model'
      )
    }
    this.data = observable(json)
    Object.assign(this, this.data)
  }
}
