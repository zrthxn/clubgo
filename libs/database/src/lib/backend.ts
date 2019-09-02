import express from 'express'
import * as mongoose from 'mongoose'
import { conf } from '@clubgo/util'

/**
 * @description
 * * CRUD Router
 * This Express Router handles all CRUD functions.
 */

export class CRUDRouter {
  Object = null
  _CRUD = express.Router()

  constructor(DatabaseObjectModel:mongoose.Model<mongoose.Document>) {
    this.Object = DatabaseObjectModel
  }

  // CRUD Functions
  // --------------------------------------------------------
  addDefaultRoutes() {
    // Read all Objects :: /_list
    this._CRUD.get('/_list', async (req, res)=>{
      const objectStream = await this.Object.find({})
      res.send({ results: objectStream })
    })

    // Read a Object by ID :: /_get/:Objectid
    this._CRUD.get('/_get/:objectid', async (req, res)=>{
      const searchResult = await this.Object.findOne({ _id: req.params.objectid })
      res.send({ message: 'Found', results: searchResult })
    })

    // Read a group of venues by ID :: /_find
    this._CRUD.post('/_find', async (req, res)=>{
      const { searchQuery } = req.body
      const searchResult = await this.Object.find({ ...searchQuery })

      res.send({ 
        message: `Found ${searchResult.length} matching records`,
        results: searchResult 
      })
    })

    // Read a group of Objects by ID :: /_group
    this._CRUD.post('/_group', async (req, res)=>{
      const { searchIds } = req.body
      for (let id of searchIds) id = mongoose.Types.ObjectId(id)
      
      const searchResult = await this.Object.find({
        _id: { 
          $in: searchIds
        }
      })

      res.send({ 
        message: `Found ${searchResult.length} of ${searchIds.length}`,
        results: searchResult 
      })
    })

    // Create a Object :: /_create
    this._CRUD.post('/_create', async (req, res)=>{
      const { createBody } = req.body
      const createObject = new this.Object(createBody)

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
    })

    // Update a Object by ID :: /_update/:objectid
    this._CRUD.put('/_update/:objectid', async (req, res)=>{
      const { updateBody } = req.body
      const result = await this.Object.findOneAndUpdate(
        { 
          _id: req.params.objectid 
        },
        updateBody
      )
      res.send({
        message: 'Updated',
        previous: result
      })
    })

    // Delete a Object by ID :: /_delete/:objectid
    this._CRUD.delete('/_delete/:objectid', async (req, res)=>{
      const results = await this.Object.findOneAndDelete(
        { 
          _id: req.params.objectid 
        }
      )
      res.send({ 
        message:'Deleted', 
        results
      })
    })
  }

  createRouter(options?:RouterOptions) {
    if(options.addDefaults!==undefined && options.addDefaults)
      this.addDefaultRoutes()
    return this._CRUD
  }
}

export interface RouterOptions {
  addDefaults: boolean
}

// STOP ============================================== STOP
