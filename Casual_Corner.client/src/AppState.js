import { action, makeAutoObservable } from 'mobx'
import { isValidProp } from './utils/isValidProp.js'

class ObservableAppState {
  constructor() {
    makeAutoObservable(this)
  }
  user = null
  /** @type {import('./models/Account.js').Account} */
  account = null
  games = []
}

// eslint-disable-next-line no-undef
export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    action(() => {
      target[prop] = value
    })()
    return true
  }
})
