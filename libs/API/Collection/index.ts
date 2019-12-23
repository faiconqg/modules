import { observable, action } from 'mobx'
import Base from 'modules/libs/API/Base'
import Model from 'modules/libs/API/Model'

export default class Collection extends Base {
  @observable
  data?: object[]

  @action
  resolveResult(json: object[]) {
    this.data = json.map(item => new Model(this.endpoint, this.method, item))
  }
}
