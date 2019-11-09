import { action, observable, computed } from 'mobx'
import { createContext } from 'react'

class DataStore {
  @observable city:string

  @action setCity(city) {
    this.city = city
  }

  @computed get getCity() {
    return this.city
  }
}

const AppDataStore = new DataStore()
export default createContext(AppDataStore)
