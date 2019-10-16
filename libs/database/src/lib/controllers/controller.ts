import express from 'express'
import { conf } from '@clubgo/util'
import * as mongoose from 'mongoose'

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

  /**
   * Returns the controlled instance of `express.Router()`
   * @returns `express.Router()`
   */
  router = () => this.addRoutes()

  /**
   * Adds the given routes to 
   * @returns `express.Router()`
   */
  addRoutes = (routes?:IRouteItem[]) => {
    if(routes!==undefined)
      for (const route of routes)
        this._router[route.method](route.path, route.handler)
    else {
      // Default Routes
      this._router.get('/_list', this.list)
      this._router.get('/_get/:objectid', this.get)
      this._router.post('/_search', this.search)
      this._router.post('/_group', this.group)
      this._router.post('/_create', this.create)
      this._router.put('/_update/:objectid', this.update)
      this._router.delete('/_delete/:objectid', this.delete)
    }
    return this._router
  }

  // CRUD Functions
  // --------------------------------------------------------
  
  // Read all Objects :: /_list
  list = async (req, res) => {
    const objectStream = await this.Model.find({})
    res.send({ results: objectStream })
  }

  // Read a Object by ID :: /_get/:Objectid
  get = async (req, res) => {
    const searchResult = await this.Model.findOne({ _id: req.params.objectid })
    res.send({ message: 'Found', results: searchResult })
  }

  // Search for venues :: /_search
  search = async (req, res) => {
    const { query } = req.body
    const searchResult = await this.Model.find({ ...query })

    res.send({ 
      message: `Found ${searchResult.length} matching records`,
      results: searchResult 
    })
  }

  // Read a group of Objects by ID :: /_group
  group = async (req, res) => {
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
  create = async (req, res) => {
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
  update = async (req, res) => {
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
  delete = async (req, res) => {
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

// STOP ============================================== STOP

export interface IRouteItem {
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'use'
  path: string
  handler: express.RequestHandler
}
