import { action, observable, computed } from 'mobx'

class Store {
  @observable city:string

  constructor() {
    let context = this.readLocalContext()
    this.city = context.city
  }

  readLocalContext() {
    let context:any = localStorage.getItem('cg:context')
    if(context) {
      try {
        context = JSON.parse(atob(context))
      } catch (error) {
        context = {}
      }
    }
    else 
      context = {}
    return context
  }

  writeLocalContext(context) {
    localStorage.setItem('cg:context', 
      btoa(
        JSON.stringify(context)
      )
    )
  }

  @action setCity(city:string) {
    this.city = city

    let context = this.readLocalContext()
    context.city = city
    this.writeLocalContext(context)
  }

  @computed get getCity() {
    return this.city
  }
}

const ContextStore = new Store()
export default ContextStore
