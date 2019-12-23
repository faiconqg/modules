import * as firebase from 'firebase/app'
import 'firebase/auth'
import { observable, action } from 'mobx'
import { TModel } from 'modules/libs/API/Model'
import { appStore } from '.'

const errorMessages = {
  'auth/wrong-password': 'A senha digitada está incorreta.',
  'auth/user-not-found': 'Nenhum usuário cadastrado com este e-mail.',
  'auth/too-many-requests':
    'Muitas tentativas de login. Por favor, tente mais tarde.',
  'auth/email-already-in-use':
    'Já existe um cadastro com esse e-mail, tente recuperar sua senha.'
}

export default class UserStore {
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      appStore.setInitialized()
      if (user) {
        this.setUser(user)
      } else {
        this.clearUser()
      }
    })
  }

  @observable
  firebase: TModel = {
    busy: false,
    data: undefined,
    error: undefined
  }

  @action
  login(email: string, password: string) {
    this.firebase.busy = true
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(this.resolveFirebaseError.bind(this))
      .finally(
        action(() => {
          this.firebase.busy = false
        })
      )
  }

  @action
  recover(email: string) {
    this.firebase.busy = true
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(
        action(() => {
          this.firebase.error = undefined
        })
      )
      .catch(this.resolveFirebaseError.bind(this))
      .finally(
        action(() => {
          this.firebase.busy = false
        })
      )
  }

  @action
  logout() {
    this.firebase.busy = true
    firebase.auth().signOut()
  }

  @action
  resolveFirebaseError(error: any) {
    this.firebase.error = Object.assign(error, {
      message:
        Object.keys(errorMessages).indexOf(error.code) > -1
          ? errorMessages[
              error.code as
                | 'auth/wrong-password'
                | 'auth/user-not-found'
                | 'auth/too-many-requests'
                | 'auth/email-already-in-use'
            ]
          : error.message
    })
    throw error
  }

  @action
  createUser(email: string, password: string, name: string) {
    this.firebase.busy = true
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response: any) => {
        if (response.user) {
          return response.user
            .updateProfile({
              displayName: name
            })
            .then(() => response.user.sendEmailVerification())
        }
      })
      .catch(this.resolveFirebaseError.bind(this))
      .finally(
        action(() => {
          this.firebase.busy = false
        })
      )
  }

  @action
  setUser(user: any) {
    // user.getIdToken(true).then(
    //   action((token: string) => {
    //     appStore.setToken(token)
    //     this.firebase.data = user
    //     this.firebase.busy = false
    //     this.firebase.error = undefined
    //   })
    // )
    // console.log(user)
    appStore.setToken(user.ma)
    this.firebase.data = user
    this.firebase.busy = false
    this.firebase.error = undefined
  }

  @action
  clearUser() {
    appStore.setToken(undefined)
    this.firebase.data = undefined
    this.firebase.busy = false
    this.firebase.error = undefined
  }
}
