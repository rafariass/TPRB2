import { jwtVerify } from '../../utils/auth/jwt.js'

export const authToken = (req, res, next) => {
  const authorization = req.header('Authorization')

  if (authorization === undefined) {
    return res.status(401).json({ status: false, code: 401, message: 'Token no proporcionado' })
  }

  const [bearer, token] = authorization.split(' ')
  if (bearer !== 'Bearer') {
    return res.status(401).json({ status: false, code: 401, message: 'Formato de token inválido' })
  }

  try {
    jwtVerify(token) && next()
  } catch (error) {
    res.status(401).json({ status: false, code: 401, message: 'Token inválido' })
  }
}
