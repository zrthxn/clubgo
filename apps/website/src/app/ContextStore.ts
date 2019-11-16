import { createContext } from 'react'
import { action, observable, computed } from 'mobx'
import { ICategoryModel, ILocationModel } from '@clubgo/database'
import { DatabaseService } from '@clubgo/api'

const categoryService = new DatabaseService('/category')

// export class Store {
//   @observable city:string
//   @observable locality:string

//   @observable categories = []
  
//   @observable locations:ILocationModel[] = []

//   @computed 
//   get numOfCategories() {
//     return this.categories.length
//   }

//   @action 
//   async fetchCategories() {
//     categoryService.list().then(({ data })=>{
//       this.categories.push(data.results)
//     })
//   }
// }

export class Store {
  city:string
  locality:string

  categories:ICategoryModel[] = []
  
  locations:ILocationModel[] = []
}

const ContextStore = window['store'] = new Store()
export default ContextStore

export const StoreContext = createContext(ContextStore)