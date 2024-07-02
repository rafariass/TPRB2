import format from 'pg-format'
import db from '../../../database/db_connect.js'

export const findAll = async ({ limits = 10, order_by: orderBy = 'id_asc', page = 1 }) => {
  const [column, sort] = orderBy.split('_')
  const offset = Math.abs(+page !== 0 ? page - 1 : 0) * limits
  const sqlQuery = `
    SELECT u.nombre, u.email, u.pass, u.telefono, u.direccion, u.rol, p.id, p.experiencia, p.preferencias
    FROM usuario AS u INNER JOIN paseador AS p
    ON u.id = p.usuario_id
    ORDER BY %s %s LIMIT %s OFFSET %s;`
  const formateedQuery = format(sqlQuery, column, sort, limits, offset)
  return await db(formateedQuery)
}

export const findById = async (id) => {
  const sqlQuery = `
    SELECT u.nombre, u.email, u.pass, u.telefono, u.direccion, u.rol, p.id, p.experiencia, p.preferencias
    FROM usuario AS u INNER JOIN paseador AS p
    ON u.id = p.usuario_id
    WHERE p.id = $1;`
  return await db(sqlQuery, [id])
}

export const findByUserEmail = async (eamil) => {
  const sqlQuery = `
    SELECT u.nombre, u.email, u.pass, u.telefono, u.direccion, u.rol, p.id, p.experiencia, p.preferencias
    FROM usuario AS u INNER JOIN paseador AS p
    ON u.id = p.usuario_id
    WHERE u.email = $1;`
  return await db(sqlQuery, [eamil])
}

export const create = async ({ usuarioId, experiencia, preferencias }) => {
  const sqlQuery = `
    INSERT INTO paseador (id, usuario_id, experiencia, preferencias, created_at, updated_at)
    VALUES (DEFAULT, $1, $2, $3, DEFAULT, DEFAULT) RETURNING *;`
  return await db(sqlQuery, [usuarioId, experiencia, preferencias])
}

export const updateById = async (id, { experiencia, preferencias }) => {
  const sqlQuery = `
    UPDATE paseador SET experiencia = $2, preferencias = $3
    WHERE id = $1 RETURNING *;`
  return await db(sqlQuery, [id, experiencia, preferencias])
}

export const deleteById = async (id) => await db('DELETE FROM paseador WHERE id = $1 RETURNING *;', [id])
