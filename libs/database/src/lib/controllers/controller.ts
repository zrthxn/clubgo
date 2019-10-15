import express from 'express'
import * as mongoose from 'mongoose'
import { conf } from '@clubgo/util'

export interface IRouteItem {
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'use'
  path: string
  handler: express.RequestHandler
}

/**
 * @description CRUD Router.
 * This returns an instance of Express Router 
 * which handles all CRUD functions.
 */
export class ModelController {
  Model = null
  _router = express.Router()

  /**
   * @param Mongoose DatabaseObjectModel 
   */
  constructor(DatabaseDocumentModel:mongoose.Model<mongoose.Document>) {
    this.Model = DatabaseDocumentModel
  }

  currentRoutes:IRouteItem[]

  defaultRoutes:IRouteItem[] = [
    { method: 'get', path: '/_list', handler: this.list },
    { method: 'get', path: '/_get/:objectid', handler: this.get },
    { method: 'post', path: '/_search', handler: this.search },
    { method: 'post', path: '/_group', handler: this.group },
    { method: 'post', path: '/_create', handler: this.create },
    { method: 'put', path: '/_update/:objectid', handler: this.update },
    { method: 'delete', path: '/_delete/:objectid', handler: this.delete }
  ]

  /**
   * Returns the controlled instance of `express.Router()`
   * @returns `express.Router()`
   */
  router = () => this.addRoutes(this.defaultRoutes)

  /**
   * Adds the given routes to 
   * @returns `express.Router()`
   */
  addRoutes = (routes?:IRouteItem[]) => {
    for (const route of routes)
      this._router[route.method](route.path, route.handler)
    return this._router
  }

  // CRUD Functions
  // --------------------------------------------------------
  
  // Read all Objects :: /_list
  async list(req, res) {
    const objectStream = await this.Model.find({})
    res.send({ results: objectStream })
  }

  // Read a Object by ID :: /_get/:Objectid
  async get(req, res) {
    const searchResult = await this.Model.findOne({ _id: req.params.objectid })
    res.send({ message: 'Found', results: searchResult })
  }

  // Search for venues :: /_search
  async search(req, res) {
    const { query } = req.body
    const searchResult = await this.Model.find({ ...query })

    res.send({ 
      message: `Found ${searchResult.length} matching records`,
      results: searchResult 
    })
  }

  // Read a group of Objects by ID :: /_group
  async group(req, res) {
    const { searchIds } = req.body
    for (let id of searchIds) id = mongoose.Types.ObjectId(id)
    
    const searchResult = await this.Model.find({
      _id: { 
        $in: searchIds
      }
    })

    res.send({ 
      message: `Found ${searchResult.length} of ${searchIds.length}`,
      results: searchResult 
    })
  }

  // Create a Object :: /_create
  async create(req, res) {
    const { createBody } = req.body
    const createObject = new this.Model(createBody)

    try {
      const result = await createObject.save()
      res.status(201)
      .send({ 
        message: 'Created',
        results: result._id
      })
    } catch (err) {
      console.log(conf.Red(err))
      res.status(400).send({ error: err })
    }
  }

  // Update a Object by ID :: /_update/:objectid
  async update(req, res) {
    const { updateBody } = req.body
    const result = await this.Model.findOneAndUpdate(
      { 
        _id: req.params.objectid 
      },
      updateBody
    )

    res.status(200).send({
      message: 'Updated',
      previous: result,
      updated: updateBody
    })
  }

  // Delete a Object by ID :: /_delete/:objectid
  async delete(req, res) {
    const results = await this.Model.findOneAndDelete(
      { 
        _id: req.params.objectid 
      }
    )

    res.send({ 
      message: 'Deleted', 
      results
    })
  }
}

export default ModelController

// STOP ============================================== STOP