import * as sql from '../models/mascota.model.js'

export const findAll = (req, res) => {
  return sql
    .findAll(req.query)
    .then((result) => res.status(200).json({ status: true, code: 200, message: result }))
}
