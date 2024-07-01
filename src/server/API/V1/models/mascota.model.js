import format from 'pg-format'
import db from '../../../database/db_connect.js'

export const findAll = async ({ limits = 10, order_by: orderBy = 'id_asc', page = 1 }) => {
  const [column, sort] = orderBy.split('_')
  const offset = Math.abs(+page !== 0 ? page - 1 : 0) * limits
  const formateedQuery = format('SELECT * FROM mascota order by %s %s LIMIT %s OFFSET %s;', column, sort, limits, offset)
  return await db(formateedQuery)
}

export const findById = async (id) => db('SELECT * FROM mascota WHERE id = $1;', [id])

export const findByUserEmail = async (email) =>
  await db('SELECT m.* FROM mascota AS m INNER JOIN usuario AS u ON m.usuario_id = u.id WHERE u.email = $1;', [email])

export const create = async ({ id, usuarioId, nombre, raza, edad, peso, genero }) => {
  const sqlQuery = `
    INSERT INTO mascota (id, usuario_id, nombre, raza, edad, peso, genero, created_at, updated_at)
    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, DEFAULT, DEFAULT) RETURNING *;`
  return await db(sqlQuery, [id, usuarioId, nombre, raza, edad, peso, genero])
}

export const updateById = async (id, { nombre, raza, edad, peso, genero }) => {
  const sqlQuery = `
    UPDATE mascota SET nombre = $2, raza = $3, edad = $4, peso = $5, genero = $6
    WHERE id = $1 RETURNING *;`
  return await db(sqlQuery, [id, nombre, raza, edad, peso, genero])
}

export const deleteById = async (id) => await db('DELETE FROM mascota WHERE id = $1 RETURNING *;', [id])
