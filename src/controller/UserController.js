const knex = require('../database')
module.exports = {
  async index (req , res) {
      const results = await knex('users')

      return res.json(results)
  },
  async store (req, res, next) {
      

      try {
        const { username } = req.body

        await knex('users').insert({
          username
        })

        res.status(201).send()
      } catch (error) {
        next(error)
      }

      return res.send()
  }

}