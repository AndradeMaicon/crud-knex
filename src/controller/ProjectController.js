const knex = require('../database')

module.exports = {
  async index (req , res, next) {
    try {
      const { user_id , page = 1 } = req.query;
      
      const query = knex('projects')
        .limit(5)
        .offset((page - 1) * 5)

      const countObj = knex('projects').count()

      if (user_id) {
        query
          .where({ user_id })
          .join('users', 'users.id', '=', 'projects.user_id')
          .select('projects.*', 'users.username')

        countObj
          .where({ user_id })
      }

      const [ count ] = await countObj
      res.header('X-Total-Cont', count["count"])

      const results = await query

      return res.json(results)
    } catch (error) {
      next(error)
    }
  },

  async store (req, res, next) {
    try {
      const { user_id, title } = req.body

      await knex('projects').insert({
        user_id,
        title
      })

      res.status(201).send()
    } catch (error) {
      next(error)
    }

    return res.send()
  },

}