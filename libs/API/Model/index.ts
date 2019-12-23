import { observable } from 'mobx'
import Base from 'modules/libs/API/Base'

export type TModel = {
  data?: any
  busy: boolean
  error?: any
}

export default class Model extends Base implements TModel {
  @observable
  data?: any
}
