const express = require('express')
const UserController = require('../controller/UserController')
const ProjectController = require('../controller/ProjectController')

const routes = express.Router()

routes
  // Users
  .get('/users', UserController.index)
  .post('/users', UserController.store)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.delete)
  // Projects
  .get('/projects', ProjectController.index)


module.exports = routes